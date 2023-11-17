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
    h5: {
      openTag: "[h5]",
      closeTag: "[/h5]",
      type: "h5",
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
    // Add more mark-level elements following the same pattern
  };

  serializeNode = (node: SlateNode): string => {
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
      if (blockTag) {
        if (element.type === "mention") {
          console.log(element);
          const mentionNode = element as MentionElement;
          const mentionText = mentionNode.children[0].text
            .replace("@[", "")
            .replace("]", "");
          const entityClass = mentionNode.entityClass.toLowerCase();
          return `@[${mentionText}](${entityClass}:${mentionNode.id})`;
        } else {
          return `${blockTag.openTag}${this.serializeChildren(
            element.children
          )}${blockTag.closeTag}`;
        }
      }
      return this.serializeChildren(element.children);
    }
  };

  serializeChildren = (children: SlateNode[]): string => {
    return children.map((child) => this.serializeNode(child)).join("");
  };

  serializeVal = (value: any[]): string => {
    return value.map((node) => this.serializeNode(node)).join("\n\n");
  };

  deserialize = (savedBBcode: string) => {
    if (savedBBcode) {
      const paragraphs = savedBBcode.split("\n\n");
      const elements = paragraphs.map((paragraph) => {
        if (paragraph.trim() === "") {
          return { type: "paragraph", children: [{ text: "" }] };
        }

        const htmlString = WorldAnvilParser.parsePureBBCode(paragraph);
        const document = new DOMParser().parseFromString(
          htmlString,
          "text/html"
        );
        const body = document.body;
        const children = Array.from(body.childNodes).map((childNode) =>
          this.deserializeNode(childNode)
        );
        const flattenedChildren = children.flatMap((child) =>
          Array.isArray(child) ? child : [child]
        );

        return {
          type: "paragraph",
          children:
            flattenedChildren.length > 0 ? flattenedChildren : [{ text: "" }],
        };
      });

      return elements;
    }

    return this.defaultInitialValue;
  };

  deserializeNode: any = (el: Node, markAttributes: NodeAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE && el.textContent) {
      const mentionRegex = /@\[(.*?)\]\((.*?):(.*?)\)/g;
      let match;
      const nodes = [];
      let lastIndex = 0;

      while ((match = mentionRegex.exec(el.textContent)) !== null) {
        const [matchText, text, entityClass, id] = match;

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
      case "BODY":
        return jsx("fragment", {}, children);
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
      case "H5":
        return jsx("element", { type: "h5" }, children);
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
