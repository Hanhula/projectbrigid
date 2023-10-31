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
      open: () => "<br>",
      close: null,
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
          return `<blockquote class="blockquote">${content}</blockquote>`;
        }
      },
    });

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
        const parts = content.split("|");
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
  }

  processContent(content: string) {
    const linkPattern = /@\[([^\]]+)\]\(([^:]+):([^)]+)\)/g;
    const containerPattern = /\[container:([^\]]+)\]/g;
    const sectionPattern = /\[section:([^\]]+)\]/g;

    const h1Pattern = /\[h1\|([^\]]+)\]/g;
    const h2Pattern = /\[h2\|([^\]]+)\]/g;
    const h3Pattern = /\[h3\|([^\]]+)\]/g;
    const h4Pattern = /\[h4\|([^\]]+)\]/g;
    const h5Pattern = /\[h5\|([^\]]+)\]/g;
    const urlPattern = /\[url:([^\]]+)\]/g;

    content = content
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
      .replace(h1Pattern, (match, anchorText) => `[h1=${anchorText}]`)
      .replace(h2Pattern, (match, anchorText) => `[h2=${anchorText}]`)
      .replace(h3Pattern, (match, anchorText) => `[h3=${anchorText}]`)
      .replace(h4Pattern, (match, anchorText) => `[h4=${anchorText}]`)
      .replace(h5Pattern, (match, anchorText) => `[h5=${anchorText}]`)
      .replace(urlPattern, (match, href) => `[url=${href}]`)
      .replace(
        linkPattern,
        (match, name, type, id) => `[customUrl=${id}]${name}[/customUrl]`
      );

    return content;
  }

  parseField(content: string) {
    let preprocessedContent = this.processContent(content);
    let parsedBBCode = this.parse(preprocessedContent);

    const parsedHTML = parse(parsedBBCode, {
      replace: customTransform,
    });

    return parsedHTML;
  }
}

const parser = new WorldAnvilParser();

export default parser;
