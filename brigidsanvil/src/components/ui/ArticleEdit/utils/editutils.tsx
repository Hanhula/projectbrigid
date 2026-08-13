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

  isCustomElement = (node: any): node is CustomElement => {
    return (
      node && typeof node === "object" && "type" in node && "children" in node
    );
  };

  isCustomText = (node: any): node is CustomText => {
    return node && typeof node === "object" && "text" in node;
  };

  serializeNode = (node: SlateNode): string => {
    if (Text.isText(node)) {
      let text = node.text;

      // Process marks in a specific order to avoid nesting issues
      const markOrder = ["bold", "italics", "underline", "code"];
      for (const format of markOrder) {
        const bbcode = this.markBBCodeTags[format];
        if (bbcode && (node as CustomText)[bbcode.format]) {
          text = `${bbcode.openTag}${text}${bbcode.closeTag}`;
        }
      }
      return text;
    }

    const element = node as CustomElement;
    const blockTag = this.blockBBCodeTags[element.type];
    const children = element.children
      .map((n) => this.serializeNode(n))
      .join("");

    if (element.type === "mention") {
      const mentionNode = element as MentionElement;
      return `@[${mentionNode.children[0].text.replace(
        /^@\[(.*?)\]$/,
        "$1",
      )}](${mentionNode.entityClass.toLowerCase()}:${mentionNode.id})`;
    }

    if (blockTag) {
      if (
        element.type === "blockquote" &&
        "author" in element &&
        element.author
      ) {
        return `${blockTag.openTag}${children}| ${element.author}${blockTag.closeTag}`;
      }
      return `${blockTag.openTag}${children}${blockTag.closeTag}`;
    }

    return children;
  };

  serializeVal = (value: any[]): string => {
    const serializedNodes = value
      .map((node) => this.serializeNode(node))
      .map((nodeText) => nodeText.replace(/\r\n/g, "\n").replace(/\n/g, "[br]"))
      .filter((nodeText) => nodeText.length > 0);

    return serializedNodes
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  deserialize = (bbcode: string): Descendant[] => {
    if (!bbcode) {
      return this.defaultInitialValue;
    }

    const result: CustomElement[] = [];
    let currentText = bbcode
      .replace(/\r\n/g, "\n")
      .replace(/\[br\]/g, "\n")
      .replace(/\n{3,}/g, "\n\n");

    // Helper function to create a text node with formats
    const createFormattedText = (text: string): CustomText[] => {
      let processedText = text;
      const formats: { [key: string]: boolean } = {};

      // Process each mark type
      for (const [format, tag] of Object.entries(this.markBBCodeTags)) {
        const openTag = tag.openTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const closeTag = tag.closeTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`${openTag}(.*?)${closeTag}`, "g");

        // Store all matches and their positions
        const matches: { start: number; end: number; content: string }[] = [];
        let match;
        while ((match = regex.exec(processedText)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            content: match[1],
          });
        }

        // If we found any matches, mark this format as active
        if (matches.length > 0) {
          formats[tag.format] = true;
          // Replace each match with its content
          for (const m of matches.reverse()) {
            processedText =
              processedText.slice(0, m.start) +
              m.content +
              processedText.slice(m.end);
          }
        }
      }

      return [{ text: processedText, ...formats }];
    };

    // Helper function to create a paragraph node
    const createParagraph = (text: string): CustomElement => {
      return {
        type: "paragraph",
        children: createFormattedText(text),
      } as CustomElement;
    };

    // First handle block-level tags
    for (const [type, tag] of Object.entries(this.blockBBCodeTags)) {
      if (type === "mention") continue; // Handle mentions separately

      const openTag = tag.openTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const closeTag = tag.closeTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`${openTag}(.*?)${closeTag}`, "gs");

      currentText = currentText.replace(regex, (match, content) => {
        // For quotes, handle the special case of author attribution
        if (type === "blockquote") {
          const parts = content.split("|");
          const quoteContent = parts[0];
          const author = parts[1] || "";

          result.push({
            type: "blockquote",
            children: createFormattedText(quoteContent),
            author: author.trim(),
          } as CustomElement);
        } else {
          result.push({
            type: type as CustomElement["type"],
            children: createFormattedText(content),
          } as CustomElement);
        }
        return "\u0000"; // Use null character as placeholder
      });
    }

    // Handle mentions
    const mentionRegex = /@\[(.*?)\]\((.*?):(.*?)\)/g;
    currentText = currentText.replace(
      mentionRegex,
      (match, name, entityClass, id) => {
        result.push({
          type: "mention",
          children: [{ text: `@[${name}]` }],
          entityClass: entityClass,
          id: id,
        } as CustomElement);
        return "\u0000";
      },
    );

    // Process remaining text
    const textParts = currentText.split("\u0000").filter(Boolean);
    for (const part of textParts) {
      if (part.trim()) {
        // Split by double newlines to create separate paragraphs
        const paragraphs = part.split(/\n\n+/);
        for (const paragraph of paragraphs) {
          if (paragraph.trim()) {
            result.push(createParagraph(paragraph));
          }
        }
      }
    }

    // Ensure we have at least one node
    if (result.length === 0) {
      return this.defaultInitialValue;
    }

    return result;
  };

  defaultInitialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
}

export default EditUtils;
