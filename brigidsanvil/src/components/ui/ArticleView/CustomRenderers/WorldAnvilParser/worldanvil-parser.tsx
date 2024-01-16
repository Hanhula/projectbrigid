import yabbcode from "ya-bbcode";
import parse from "html-react-parser";
import { customTransform } from "../custom-transforms";

class WorldAnvilParser extends yabbcode {
  constructor() {
    super();
    this.registerTags();
  }

  registerTags() {
    this.registerTag("br", {
      type: "replace",
      open: () => "<ber>",
      close: null,
    });

    this.registerTag("hr", {
      type: "replace",
      open: () => `<hr>`,
      close: null,
    });

    this.registerTag("ol", {
      type: "replace",
      open: () => "<ol>",
      close: "</ol>",
    });

    this.registerTag("ul", {
      type: "replace",
      open: () => "<ul>",
      close: "</ul>",
    });

    this.registerTag("li", {
      type: "replace",
      open: () => "<li>",
      close: "</li>",
    });

    this.registerTag("sup", {
      type: "replace",
      open: () => "<sup>",
      close: "</sup>",
    });

    this.registerTag("sub", {
      type: "replace",
      open: () => "<sub>",
      close: "</sub>",
    });

    this.registerTag("small", {
      type: "replace",
      open: () => "<small>",
      close: "</small>",
    });

    this.registerTag("row", {
      type: "replace",
      open: () => `<div class='row'>`,
      close: "</div>",
    });

    this.registerTag("col", {
      type: "replace",
      open: () => `<div class='col-md-6'>`,
      close: "</div>",
    });

    this.registerTag("col3", {
      type: "replace",
      open: () => `<div class='col-md-4'>`,
      close: "</div>",
    });

    this.registerTag("customUrl", {
      type: "replace",
      open: (attr) => {
        const id = attr || "";

        return `<customUrl href="${id}">`;
      },
      close: "</customUrl>",
    });

    this.registerTag("url", {
      type: "replace",
      open: (attr) => {
        const id = attr || "";

        return `<a href="${id}">`;
      },
      close: "</a>",
    });

    this.registerTag("spoiler", {
      type: "content",
      replace: (attr, content) => {
        const parts: any = content.split("|");
        if (parts.length === 2) {
          const spoilerText = parts[0].trim();
          const spoilerTitle = parts[1].trim();

          return `
              <customspoiler>
                <button class="btn btn-primary">
                  ${spoilerTitle || "Spoiler"}
                </button>
                <collapse>
                  <div id="spoiler-content">${spoilerText}</div>
                </collapse>
              </customspoiler>
            `;
        } else {
          return `        <customspoiler>
              <button class="btn btn-primary">
                "Spoiler"
              </button>
              <collapse>
                <div id="spoiler-content">${parts[0]}</div>
              </collapse>
            </customspoiler>`;
        }
      },
    });

    this.registerTag("table", {
      type: "replace",
      open: () => "<table>",
      close: "</table>",
    });

    this.registerTag("th", {
      type: "replace",
      open: () => "<th>",
      close: "</th>",
    });

    this.registerTag("td", {
      type: "replace",
      open: () => "<td>",
      close: "</td>",
    });

    this.registerTag("tr", {
      type: "replace",
      open: () => "<tr>",
      close: "</tr>",
    });

    this.registerTag("center", {
      type: "replace",
      open: () => `<div class="text-center">`,
      close: "</div>",
    });

    this.registerTag("left", {
      type: "replace",
      open: () => `<div class="text-left">`,
      close: "</div>",
    });

    this.registerTag("in", {
      type: "replace",
      open: () => `<div class="paragraph-indent">`,
      close: "</div>",
    });

    this.registerTag("p", {
      type: "replace",
      open: () => "<p>",
      close: "</p>",
    });

    this.registerTag("strike", {
      type: "replace",
      open: () => "<del>",
      close: "</del>",
    });

    this.registerTag("s", {
      type: "replace",
      open: () => "<del>",
      close: "</del>",
    });

    this.registerTag("redacted", {
      type: "replace",
      open: (attr) => {
        const num = attr || "";
        const number = parseInt(num);
        if (!isNaN(number)) {
          return "█".repeat(number);
        } else {
          return "";
        }
      },
      close: null,
    });

    this.registerTag("dc", {
      type: "replace",
      open: () => `<span class="dropcap">`,
      close: "</span>",
    });

    this.registerTag("dt", {
      type: "replace",
      open: () => "<dt>",
      close: "</dt>",
    });

    this.registerTag("dd", {
      type: "replace",
      open: () => "<dd>",
      close: "</dd>",
    });

    this.registerTag("color", {
      type: "replace",
      open: (attr) => {
        const color = attr || "white";
        return `<span style="color: ${color}">`;
      },
      close: "</span>",
    });

    this.registerTag("code", {
      type: "replace",
      open: () => "<pre><code>",
      close: "</code></pre>",
    });
  }

  processContent(content: string) {
    const h1Pattern = /\[h1\|([^\]]+)\]/g;
    const h2Pattern = /\[h2\|([^\]]+)\]/g;
    const h3Pattern = /\[h3\|([^\]]+)\]/g;
    const h4Pattern = /\[h4\|([^\]]+)\]/g;
    const h5Pattern = /\[h5\|([^\]]+)\]/g;
    const urlPattern = /\[url:([^\]]+)\]/g;
    const redactedPattern = /\[redacted:([^\]]+)\]/g;
    const keyValuePattern = /--([^:]+)(::)(.*?)(--|$)/g;
    const colorPattern = /\[color:([^\]]+)\](.*?)\[\/color\]/g;
    const containerPattern = /\[container:([^\]]+)\]/g;
    const sectionPattern = /\[section:([^\]]+)\]/g;

    const tableHeadPattern = /\[th\:([^\]]+)\]/g;
    const tableCellPattern = /\[td\:([^\]]+)\]/g;

    content = content
      .replace(h1Pattern, (match, anchorText) => `[h1=${anchorText}]`)
      .replace(h2Pattern, (match, anchorText) => `[h2=${anchorText}]`)
      .replace(h3Pattern, (match, anchorText) => `[h3=${anchorText}]`)
      .replace(h4Pattern, (match, anchorText) => `[h4=${anchorText}]`)
      .replace(h5Pattern, (match, anchorText) => `[h5=${anchorText}]`)
      .replace(urlPattern, (match, href) => `[url=${href}]`)
      .replace(redactedPattern, (match, number) => `[redacted=${number}]`)
      .replace(
        keyValuePattern,
        (match, key, separator, value) => `[dt]${key}[/dt][dd]${value}[/dd]`
      )
      .replace(
        colorPattern,
        (match, color, content) => `[color=${color}]${content}[/color]`
      )
      .replace(
        containerPattern,
        (match, className) => `[customDiv=${className}]`
      )
      .replace(/\[\/container\]/g, "[/customDiv]")
      .replace(
        sectionPattern,
        (match, className) => `[customSpan=${className}]`
      )
      .replace(/\[\/section\]/g, "[/customSpan]")
      .replace(tableHeadPattern, (match, width) => `[th=${width}]`)
      .replace(tableCellPattern, (match, width) => `[td=${width}]`);

    return content;
  }

  processContentForView(content: string) {
    const linkPattern = /@\[([^\]]+)\]\(([^:]+):([^)]+)\)/g;
    content = content.replace(
      linkPattern,
      (match, name, type, id) => `[customUrl=${id}]${name}[/customUrl]`
    );

    return content;
  }

  parseField(content: string) {
    this.registerTag("h1", {
      type: "replace",
      open: () => "<h2>",
      close: "</h2>",
    });

    this.registerTag("h2", {
      type: "replace",
      open: () => "<h3>",
      close: "</h3>",
    });

    this.registerTag("h3", {
      type: "replace",
      open: (attr) => {
        const idName = attr || "";
        return `<h4 id="${idName}">`;
      },
      close: "</h4>",
    });

    this.registerTag("h4", {
      type: "replace",
      open: () => "<h5>",
      close: "</h5>",
    });

    this.registerTag("h5", {
      type: "replace",
      open: () => "<h6>",
      close: "</h6>",
    });

    this.registerTag("quote", {
      type: "content",
      replace: (attr, content) => {
        const parts = content.split("|");

        if (parts.length === 2) {
          const mainContent = parts[0].trim();
          const additionalContent = parts[1].trim();

          return `<figure><blockquote class="blockquote">${mainContent}</blockquote><figcaption class="blockquote-footer">${additionalContent}</figcaption></figure>`;
        } else {
          return `<figure><blockquote class="blockquote">${content}</blockquote></figure>`;
        }
      },
    });

    this.registerTag("customDiv", {
      type: "replace",
      open: (attr) => {
        const className = attr || "";
        return `<div class="${className}">`;
      },
      close: "</div>",
    });

    this.registerTag("customSpan", {
      type: "replace",
      open: (attr) => {
        const className = attr || "";
        return `<span class="${className}">`;
      },
      close: "</span>",
    });

    let preprocessedContent = this.processContent(content);
    preprocessedContent = this.processContentForView(content);
    let parsedBBCode = this.parse(preprocessedContent)
      .replace(/(?<!<br\s*\/?>)(<br\s*\/?>)(?!<br\s*\/?>)/g, "")
      .replace(/<ber>/g, "<br>")
      .replace(
        /(<figure>.*?<\/figure>)(<br\s*\/?>){2}/g,
        (match, figureBlock) => figureBlock
      );

    const parsedHTML = parse(parsedBBCode, {
      replace: customTransform,
    });

    return parsedHTML;
  }

  parsePureBBCode(content: string) {
    this.registerTag("h1", {
      type: "replace",
      open: () => "<h1>",
      close: "</h1>",
    });

    this.registerTag("h2", {
      type: "replace",
      open: () => "<h2>",
      close: "</h2>",
    });

    this.registerTag("h3", {
      type: "replace",
      open: () => "<h3>",
      close: "</h3>",
    });

    this.registerTag("h4", {
      type: "replace",
      open: () => "<h4>",
      close: "</h4>",
    });

    this.registerTag("quote", {
      type: "replace",
      open: () => "<blockquote>",
      close: "</blockquote>",
    });

    this.registerTag("customDiv", {
      type: "replace",
      open: (attr) => {
        const className = attr || "";
        return `[container:${className}]`;
      },
      close: "[/container]",
    });

    this.registerTag("customSpan", {
      type: "replace",
      open: (attr) => {
        const className = attr || "";
        return `[section:${className}]`;
      },
      close: "[/section]]",
    });

    let preprocessedContent = this.processContent(content).replace(
      /\n/g,
      "[br]"
    );

    let parsedBBCode = this.parse(preprocessedContent)
      .replace(/(?<!<br\s*\/?>)(<br\s*\/?>)(?!<br\s*\/?>)/g, "")
      .replace(/<ber>/g, "\n")
      .replace(
        /(<figure>.*?<\/figure>)(<br\s*\/?>){2}/g,
        (match, figureBlock) => figureBlock
      );

    return parsedBBCode;
  }
}

const parser = new WorldAnvilParser();

export default parser;
