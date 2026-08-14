import EditUtils from "@/components/ui/ArticleEdit/utils/editutils";
import { ArticlesToTest } from "./articles-to-test";

describe("Kailuva article BBCode fixtures", () => {
  const editUtils = new EditUtils();
  const kailuva = ArticlesToTest[0];

  test.each([
    "[quote]With Kailuva by my side, I'm delighted to live in interesting times!|Tuiravi[/quote]",
    "[quote]You know, this is going to be a good two centuries - almost three - of information. That's a lot. Sure you don't want to come help me figure out if this explodes instead?|Kailuva[/quote]",
    "[quote]I mean, we're monogamous, so... does it matter?|Kailuva[/quote]",
    "[quote]Gods, too many!|Kailuva[/quote]",
    "[quote]Don't you think we've got enough wolves?|a doubtful Kailuva to an unrepentant Tuiravi[/quote]",
  ])("round-trips the supported quote fixture exactly", (value) => {
    expect(editUtils.serializeVal(editUtils.deserialize(value))).toBe(value);
  });

  test("preserves quote author metadata for attached article fixtures", () => {
    const quote =
      "[quote]Don't you think we've got enough wolves?|a doubtful Kailuva to an unrepentant Tuiravi[/quote]";

    const [quoteBlock] = editUtils.deserialize(quote) as Array<{
      type: string;
      author?: string;
    }>;

    expect(quoteBlock.type).toBe("blockquote");
    expect(quoteBlock.author).toBe(
      "a doubtful Kailuva to an unrepentant Tuiravi",
    );
  });

  test("layout-heavy fields deserialize and reserialize without dropping quote semantics", () => {
    const layoutHeavy =
      "[row]\n" +
      "[container:col-md-4]\n" +
      "@[Kailuva](person:52664451-feec-46c7-aa60-765bba87944d)\n" +
      "[/container]\n" +
      "[container:col-md-8]\n" +
      "[img:4699450]\n" +
      "[/container]\n" +
      "[/row]\n\n" +
      "[quote]test\n\ntesttest\ntest|author[/quote]";

    const serialized = editUtils.serializeVal(
      editUtils.deserialize(layoutHeavy),
    );

    expect(serialized.length).toBeGreaterThan(0);
    expect(serialized).toContain("[quote]");
    expect(serialized).toContain("|author[/quote]");
  });

  test("round-trips full Kailuva article content exactly", () => {
    const content = kailuva.content as string;
    const normalizedContent = content.replace(/\r\n/g, "\n");
    const serialized = editUtils.serializeVal(editUtils.deserialize(content));

    expect(serialized).toBe(normalizedContent);
  });
});
