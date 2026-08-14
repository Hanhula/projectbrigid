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

  inlineMarkFormats = {
    b: "bold",
    i: "italics",
    u: "underline",
    code: "code",
  } as const;

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
      const markOrder = ["bold", "italic", "underline", "code"];
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
        return `${blockTag.openTag}${children}|${element.author}${blockTag.closeTag}`;
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

    const createFormattedText = (
      text: string,
    ): Array<CustomText | MentionElement> => {
      const mentionRegex = /^@\[(.*?)\]\((.*?):(.*?)\)/s;
      const activeFormats: Array<
        keyof Pick<CustomText, "bold" | "italics" | "underline" | "code">
      > = [];
      const nodes: Array<CustomText | MentionElement> = [];
      let buffer = "";

      const flushBuffer = () => {
        if (!buffer) {
          return;
        }

        const node: CustomText = { text: buffer };
        for (const format of activeFormats) {
          node[format] = true;
        }
        nodes.push(node);
        buffer = "";
      };

      const removeFormat = (
        format: keyof Pick<
          CustomText,
          "bold" | "italics" | "underline" | "code"
        >,
      ) => {
        for (let index = activeFormats.length - 1; index >= 0; index -= 1) {
          if (activeFormats[index] === format) {
            activeFormats.splice(index, 1);
            return;
          }
        }
      };

      for (let index = 0; index < text.length; ) {
        const mentionMatch = text.slice(index).match(mentionRegex);
        if (mentionMatch) {
          const [fullMatch, name, entityClass, id] = mentionMatch;
          flushBuffer();
          nodes.push({
            type: "mention",
            children: [{ text: `@[${name}]` }],
            entityClass,
            id,
          } as MentionElement);
          index += fullMatch.length;
          continue;
        }

        const token = text[index];
        const lowerToken = token.toLowerCase();
        if (token === "\n") {
          buffer += "\n";
          index += 1;
          continue;
        }

        const markMatch = text
          .slice(index)
          .match(/^\[\/?(?:b|i|u|code)\]/i)?.[0];
        const isTag = typeof markMatch === "string";
        if (!isTag) {
          buffer += token;
          index += 1;
          continue;
        }

        const markToken = markMatch as string;
        const lowerMarkToken = markToken.toLowerCase();

        const isClosing = lowerMarkToken.startsWith("[/");
        const tagName = lowerMarkToken.replace(/^\[\/?|\]$/g, "");
        const format =
          this.inlineMarkFormats[
            tagName as keyof typeof this.inlineMarkFormats
          ];

        if (!format) {
          buffer += markToken;
          index += markToken.length;
          continue;
        }

        flushBuffer();

        if (isClosing) {
          removeFormat(format);
        } else {
          activeFormats.push(format);
        }

        index += markToken.length;
      }

      flushBuffer();

      return nodes.length > 0 ? nodes : [{ text: "" }];
    };

    // Helper function to create a paragraph node
    const createParagraph = (text: string): CustomElement => {
      return {
        type: "paragraph",
        children: createFormattedText(text) as CustomText[],
      } as CustomElement;
    };

    const blockPatterns = Object.entries(this.blockBBCodeTags)
      .filter(([type]) => type !== "mention")
      .map(([type, tag]) => {
        const openTag = tag.openTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const closeTag = tag.closeTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return {
          type,
          regex: new RegExp(`${openTag}(.*?)${closeTag}`, "gs"),
        };
      });

    const flushText = (text: string) => {
      if (!text.trim()) {
        return;
      }

      const paragraphs = text.split(/\n\n+/);
      for (const paragraph of paragraphs) {
        if (paragraph.trim()) {
          result.push(createParagraph(paragraph));
        }
      }
    };

    let cursor = 0;
    while (cursor < currentText.length) {
      let nextMatch:
        | {
            index: number;
            length: number;
            type: string;
            match: RegExpExecArray;
          }
        | undefined;

      for (const pattern of blockPatterns) {
        pattern.regex.lastIndex = cursor;
        const match = pattern.regex.exec(currentText);
        if (!match) {
          continue;
        }

        if (!nextMatch || match.index < nextMatch.index) {
          nextMatch = {
            index: match.index,
            length: match[0].length,
            type: pattern.type,
            match,
          };
        }
      }

      if (!nextMatch) {
        flushText(currentText.slice(cursor));
        break;
      }

      flushText(currentText.slice(cursor, nextMatch.index));

      if (nextMatch.type === "blockquote") {
        const content = nextMatch.match[1] || "";
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
          type: nextMatch.type as CustomElement["type"],
          children: createFormattedText(nextMatch.match[1] || ""),
        } as CustomElement);
      }

      cursor = nextMatch.index + nextMatch.length;
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
