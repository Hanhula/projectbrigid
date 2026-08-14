import EditUtils from "@/components/ui/ArticleEdit/SlateEditor/utils/editutils";

describe("EditUtils BBCode round-trip", () => {
  test("preserves mixed nested inline marks across deserialize and serialize", () => {
    const editUtils = new EditUtils();
    const input =
      "test test test\n\n" +
      "test\n\n" +
      "test test teee[b]eeeeee[/b][u][b]ee[/b][/u][b]eeeee[/b]eeeeest\n\n" +
      "[b]test[br]test test test[/b]\n\n" +
      "test";

    const roundTripped = editUtils.serializeVal(editUtils.deserialize(input));

    expect(roundTripped).toBe(input);
  });

  test("preserves blockquote position across deserialize and serialize", () => {
    const editUtils = new EditUtils();
    const input = "first\n\n[quote]quoted text[/quote]\n\nlast";

    const roundTripped = editUtils.serializeVal(editUtils.deserialize(input));

    expect(roundTripped).toBe(input);
  });

  test("preserves real article quote fields across deserialize and serialize", () => {
    const editUtils = new EditUtils();

    const quoteFields = [
      "[quote]With Kailuva by my side, I'm delighted to live in interesting times!|Tuiravi[/quote]",
      "[quote]You know, this is going to be a good two centuries - almost three - of information. That's a lot. Sure you don't want to come help me figure out if this explodes instead?|Kailuva[/quote]",
      "[quote]I mean, we're monogamous, so... does it matter?|Kailuva[/quote]",
      "[quote]Gods, too many!|Kailuva[/quote]",
      "[quote]Don't you think we've got enough wolves?|a doubtful Kailuva to an unrepentant Tuiravi[/quote]",
    ];

    for (const input of quoteFields) {
      const roundTripped = editUtils.serializeVal(editUtils.deserialize(input));
      expect(roundTripped).toBe(input);

      const [quoteBlock] = editUtils.deserialize(input) as Array<{
        type: string;
        author?: string;
      }>;

      expect(quoteBlock.type).toBe("blockquote");
      expect(quoteBlock.author).toBe(
        input.slice(input.lastIndexOf("|") + 1, -8),
      );
    }
  });

  test("preserves blockquote author metadata from real article content", () => {
    const editUtils = new EditUtils();

    const content =
      "[quote]With Kailuva by my side, I'm delighted to live in interesting times!|Tuiravi[/quote]\n\nKailuva Sikuvael is a @[snow elven](ethnicity:4196c7ca-6679-46b7-a36e-c6ed8be75b3d) diplomat and explorer.";

    const [quoteBlock] = editUtils.deserialize(content) as Array<{
      type: string;
      author?: string;
    }>;

    expect(quoteBlock.type).toBe("blockquote");
    expect(quoteBlock.author).toBe("Tuiravi");
  });

  test("preserves inline mentions without inserting extra paragraph breaks", () => {
    const editUtils = new EditUtils();
    const input =
      "Kailuva is a @[snow elven](ethnicity:4196c7ca-6679-46b7-a36e-c6ed8be75b3d) diplomat and explorer.";

    const roundTripped = editUtils.serializeVal(editUtils.deserialize(input));

    expect(roundTripped).toBe(input);
  });
});
