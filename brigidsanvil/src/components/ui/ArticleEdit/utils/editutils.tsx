import { jsx } from "slate-hyperscript";
import {
  BlockBBCodeTag,
  CustomElement,
  CustomText,
  MarkBBCodeTag,
  MentionElement,
  NodeAttributes,
} from "./editortypes";
import { Descendant, Node as SlateNode, Text } from "slate";

import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";

class EditUtils {
  constructor() {}

  blockBBCodeTags: Record<string, BlockBBCodeTag> = {
    blockquote: {
      openTag: "[quote]",
      closeTag: "[/quote]",
      type: "blockquote",
    },
    h1: {
      openTag: "[h1]",
      closeTag: "[/h1]",
      type: "h1",
    },
    h2: {
      openTag: "[h2]",
      closeTag: "[/h2]",
      type: "h2",
    },
    h3: {
      openTag: "[h3]",
      closeTag: "[/h3]",
      type: "h3",
    },
    h4: {
      openTag: "[h4]",
      closeTag: "[/h4]",
      type: "h4",
    },
    aloud: {
      openTag: "[aloud]",
      closeTag: "[/aloud]",
      type: "aloud",
    },
    mention: {
      openTag: "@[",
      closeTag: "]",
      type: "mention",
    },
  };

  markBBCodeTags: Record<string, MarkBBCodeTag> = {
    bold: {
      openTag: "[b]",
      closeTag: "[/b]",
      format: "bold",
    },
    italic: {
      openTag: "[i]",
      closeTag: "[/i]",
      format: "italics",
    },
    underline: {
      openTag: "[u]",
      closeTag: "[/u]",
      format: "underline",
    },
    code: {
      openTag: "[code]",
      closeTag: "[/code]",
      format: "code",
    },
  };

  serializeNode = (node: SlateNode): string => {
    console.log("problem child: ", node);
    if (Text.isText(node)) {
      let text = node.text;
      for (const [tag, bbcode] of Object.entries(this.markBBCodeTags)) {
        if ((node as CustomText)[bbcode.format]) {
          text = `${bbcode.openTag}${text}${bbcode.closeTag}`;
        }
      }
      return text;
    } else {
      const element = node as CustomElement;
      const blockTag = this.blockBBCodeTags[element.type];

      let serializedChildren = this.serializeChildren(element.children);

      if (element.type === "mention") {
        const mentionNode = element as MentionElement;
        const mentionText = mentionNode.children[0].text
          .replace("@[", "")
          .replace("]", "");
        const entityClass = mentionNode.entityClass.toLowerCase();
        return `@[${mentionText}](${entityClass}:${mentionNode.id})`;
      } else if (blockTag) {
        return `${blockTag.openTag}${serializedChildren}${blockTag.closeTag}`;
      }

      return serializedChildren;
    }
  };

  serializeChildren = (children: SlateNode[]): string => {
    return children.map((child) => this.serializeNode(child)).join("");
  };

  serializeVal = (value: any[]): string => {
    return value
      .map((node, index) => {
        const serializedNode = this.serializeNode(node);
        const separator = node.type !== "paragraph" ? "\n" : "\n\n";
        return serializedNode + (index < value.length - 1 ? separator : "");
      })
      .join("");
  };

  deserialize = (savedBBcode: string) => {
    console.log("deserialising: ", savedBBcode);
    if (savedBBcode) {
      const htmlString = WorldAnvilParser.parsePureBBCode(savedBBcode);
      const document = new DOMParser().parseFromString(htmlString, "text/html");
      const body = document.body;
      const children = Array.from(body.childNodes).map((childNode) =>
        this.deserializeNode(childNode)
      );
      const flattenedChildren = children.flatMap((child) =>
        Array.isArray(child) ? child : [child]
      );

      const elements = [];
      let currentParagraph = { type: "paragraph", children: [] };

      for (const child of flattenedChildren) {
        if (
          typeof child === "object" &&
          child.hasOwnProperty("type") &&
          (child.type === "paragraph" ||
            child.type === "blockquote" ||
            child.type.startsWith("h"))
        ) {
          if (currentParagraph.children.length > 0) {
            elements.push(currentParagraph);
            currentParagraph = { type: "paragraph", children: [] };
          }
          elements.push(child);
        } else {
          currentParagraph.children.push(child);
        }
      }

      if (currentParagraph.children.length > 0) {
        elements.push(currentParagraph);
      }
      console.log("fully deserialised: ", elements);

      return elements;
    }

    return this.defaultInitialValue;
  };

  deserializeNode: any = (el: Node, markAttributes: NodeAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE && el.textContent) {
      console.log("textContent:", el.textContent); // Log 1

      const mentionRegex = /@\[(.*?)\]\((.*?):(.*?)\)/g;
      let match;
      const nodes = [];
      let lastIndex = 0;

      while ((match = mentionRegex.exec(el.textContent)) !== null) {
        const [matchText, text, entityClass, id] = match;
        console.log("match:", match); // Log 2

        // Add the text before the mention
        if (match.index > lastIndex) {
          nodes.push(
            jsx(
              "text",
              markAttributes,
              el.textContent.slice(lastIndex, match.index)
            )
          );
        }

        // Add the mention
        nodes.push({
          type: "mention",
          entityClass: entityClass,
          id: id,
          children: [{ text: `@[${text}]` }],
        });

        lastIndex = match.index + matchText.length;
      }

      // Add the text after the last mention
      if (lastIndex < el.textContent.length) {
        nodes.push(
          jsx("text", markAttributes, el.textContent.slice(lastIndex))
        );
      }

      console.log("nodes:", nodes); // Log 3

      return nodes;
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const nodeAttributes: NodeAttributes = { ...markAttributes };

    switch (el.nodeName) {
      case "STRONG":
        nodeAttributes.bold = true;
        break;
      case "EM": // For <em> tag
      case "I": // For <i> tag
        nodeAttributes.italics = true;
        break;
      case "CODE":
        nodeAttributes.code = true;

      default:
        break;
    }

    const children = Array.from(el.childNodes)
      .map((node) => this.deserializeNode(node, nodeAttributes))
      .flat();

    if (children.length === 0) {
      children.push(jsx("text", nodeAttributes, ""));
    }

    switch (el.nodeName) {
      case "BODY": {
        const elements = [];
        let currentParagraph = { type: "paragraph", children: [] };

        for (const child of children) {
          if (
            child.type === "paragraph" ||
            child.type === "blockquote" ||
            child.type.startsWith("h")
          ) {
            if (currentParagraph.children.length > 0) {
              elements.push(currentParagraph);
              currentParagraph = { type: "paragraph", children: [] };
            }
            elements.push(child);
          } else {
            // Check for \n\n and split into paragraphs
            if (child.text && child.text.includes("\n\n")) {
              const parts = child.text.split("\n\n");
              parts.forEach((part, i) => {
                currentParagraph.children.push({ text: part.trim() });
                if (i < parts.length - 1) {
                  elements.push(currentParagraph);
                  currentParagraph = { type: "paragraph", children: [] };
                }
              });
            } else {
              currentParagraph.children.push(child);
            }
          }
        }

        if (currentParagraph.children.length > 0) {
          elements.push(currentParagraph);
        }

        return jsx("fragment", {}, elements);
      }
      case "BR":
        return "\n";
      case "BLOCKQUOTE":
        return jsx("element", { type: "blockquote" }, children);
      case "P":
        return jsx("element", { type: "paragraph" }, children);
      case "A":
        return jsx(
          "element",
          { type: "link", url: (el as HTMLElement).getAttribute("href") },
          children
        );
      case "H1":
        return jsx("element", { type: "h1" }, children);
      case "H2":
        return jsx("element", { type: "h2" }, children);
      case "H3":
        return jsx("element", { type: "h3" }, children);
      case "H4":
        return jsx("element", { type: "h4" }, children);
      default:
        return children;
    }
  };

  defaultInitialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: " " }],
    },
  ];
}

export default EditUtils;
