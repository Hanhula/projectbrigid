import { Parser } from "bulletin-board-code";

export class WorldAnvilHTMLParser {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      fixInvalidChildren: false,
      fixInvalidNesting: false,
      removeEmptyTags: false,
      lazyTransformation: false,
    });
    this.setWorldAnvilTags();
  }

  setWorldAnvilTags() {
    this.parser.unsetHandler(["p", "br", "quote"]);
    this.parser.setHandler("bold", {
      bbcode: "[b]{0}[/b]",
      html: "<strong>{0}</strong>",
    });

    this.parser.setHandler("paragraph", {
      bbcode: "[p]{0}[/p]",
      html: "<p>{0}</p>",
      isInline: true,
    });

    this.parser.setHandler("br", {
      bbcode: "[br]",
      html: "<br>",
      isSelfClosing: true,
      excludeClosing: true,
    });
  }

  parseHTML(html: string) {
    console.log(
      "WorldAnvilHTMLParser: Parsing the following HTML to BBCode",
      html
    );
    console.log(html);
    return this.parser.toBBCode("<p> test </p>", true);
  }
}
