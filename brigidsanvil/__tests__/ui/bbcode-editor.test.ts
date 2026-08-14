import {
  buildMentionCompletions,
  collectDecorationSpans,
  createBbcodeKeyBindings,
  getOpaqueInsert,
  getMentionSuggestions,
  mentionCompletionTokenRegex,
  mentionTokenRegex,
  normalizeEditorLinebreaks,
  normalizeQuoteAuthorDelimiter,
  normalizeMentionQuery,
  normalizeWorldAnvilSingleLineBreaks,
} from "@/components/ui/ArticleEdit/EditComponents/utils/bbcode-tags";
import { buildToolbarTooltip } from "@/components/ui/ArticleEdit/EditComponents/utils/toolbar-buttons";

const iconStub = (() => null) as any;

describe("BBCodeEditor utilities", () => {
  test("collectDecorationSpans returns non-overlapping spans in sorted order", () => {
    const input =
      "[quote]Quote text|Author[/quote]\n" +
      "@[Nisrei](organization:5177657a-0219-4b38-ae53-0f19254114e2)\n" +
      "[row]\n[container:col-md-8]\n[img:4699450]\n[/container]\n[/row]";

    const spans = collectDecorationSpans(input);

    for (let i = 1; i < spans.length; i += 1) {
      expect(spans[i].from).toBeGreaterThanOrEqual(spans[i - 1].from);
    }

    for (let i = 0; i < spans.length; i += 1) {
      for (let j = i + 1; j < spans.length; j += 1) {
        const overlaps =
          spans[i].from < spans[j].to && spans[i].to > spans[j].from;
        expect(overlaps).toBe(false);
      }
    }
  });

  test("collectDecorationSpans prioritizes mention span over generic tag spans", () => {
    const input = "@[Kailuva](person:52664451-feec-46c7-aa60-765bba87944d)";
    const spans = collectDecorationSpans(input);

    expect(spans.length).toBe(1);
    expect(spans[0].kind).toBe("mention");
    expect(spans[0].from).toBe(0);
    expect(spans[0].to).toBe(input.length);
  });

  test("getOpaqueInsert uses WA image format", () => {
    const result = getOpaqueInsert("[img]", "");

    expect(result.insert).toBe("[img:image-id]");
    expect(result.cursorOffset).toBe("[img:".length);
  });

  test("getOpaqueInsert wraps row and container content as opaque text blocks", () => {
    const row = getOpaqueInsert("[row]", "body");
    const container = getOpaqueInsert("[container]", "body");
    const section = getOpaqueInsert("[section]", "body");
    const url = getOpaqueInsert("[url]", "body");

    expect(row.insert).toBe("[row]\nbody\n[/row]");
    expect(container.insert).toBe("[container]\nbody\n[/container]");
    expect(section.insert).toBe("[section]\nbody\n[/section]");
    expect(url.insert).toBe("[url:url-data]\nbody\n[/url]");
    expect(url.cursorOffset).toBe("[url:url-data]\n".length + "body".length);
  });

  test("buildToolbarTooltip includes hotkey when provided", () => {
    expect(
      buildToolbarTooltip({
        label: "Bold",
        icon: iconStub,
        description: "Bold",
        hotkey: "Ctrl/Cmd+B",
        action: { type: "tag", openTag: "[b]", closeTag: "[/b]" },
      }),
    ).toBe("Bold (Ctrl/Cmd+B)");

    expect(
      buildToolbarTooltip({
        label: "Image",
        icon: iconStub,
        description: "Image reference",
        action: { type: "opaque", tag: "[img]" },
      }),
    ).toBe("Image reference");
  });

  test("mention token regex supports both @name and @[name triggers", () => {
    expect("@Kail".match(mentionTokenRegex)?.[0]).toBe("@Kail");
    expect("@[Kail".match(mentionTokenRegex)?.[0]).toBe("@[Kail");
  });

  test("mentionCompletionTokenRegex anchors at cursor end", () => {
    expect(mentionCompletionTokenRegex.test("bad. @aaa")).toBe(true);
    expect(mentionCompletionTokenRegex.test("bad. @aaa ")).toBe(false);
    expect(mentionCompletionTokenRegex.test("bad. aaa")).toBe(false);
  });

  test("normalizeMentionQuery extracts query from both trigger styles", () => {
    expect(normalizeMentionQuery("@Kailuva")).toBe("kailuva");
    expect(normalizeMentionQuery("@[Kailuva")).toBe("kailuva");
  });

  test("getMentionSuggestions falls back to article list for unmatched query", () => {
    const options = getMentionSuggestions(
      [
        {
          id: "1",
          title: "Kailuva",
          entityClass: "Person",
        } as any,
        {
          id: "2",
          title: "Tuiravi",
          entityClass: "Person",
        } as any,
      ],
      "aaa",
    );

    expect(options.length).toBeGreaterThan(0);
    expect(options[0].label).toBe("Kailuva");
  });

  test("getMentionSuggestions shows placeholder when no world articles are loaded", () => {
    const options = getMentionSuggestions([], "aaa");

    expect(options.length).toBeGreaterThan(0);
    expect(options[0].label).toBe("No matching articles");
  });

  test("buildMentionCompletions maps articles to uiw mention options", () => {
    const options = buildMentionCompletions([
      {
        id: "1",
        title: "Kailuva",
        entityClass: "Person",
      } as any,
    ]);

    expect(options).toHaveLength(1);
    expect(options[0].label).toBe("@Kailuva");
    expect(options[0].apply).toBe("@[Kailuva](person:1)");
  });

  test("buildMentionCompletions caps results and filters invalid articles", () => {
    const manyArticles = Array.from({ length: 250 }, (_, index) => ({
      id: `${index}`,
      title: `Article ${index}`,
      entityClass: "Person",
    })) as any[];
    manyArticles.push({ id: "x", title: "", entityClass: "Person" });
    manyArticles.push({ title: "No Id", entityClass: "Person" });

    const options = buildMentionCompletions(manyArticles as any);

    expect(options).toHaveLength(200);
    expect(options[0].label).toBe("@Article 0");
  });

  test("normalizeEditorLinebreaks keeps intentional blank lines", () => {
    const input =
      "[b]it's not good jim[/b]\n\nyeah I mean\nit was never gonna be very good";

    expect(normalizeEditorLinebreaks(input)).toBe(input);
  });

  test("normalizeEditorLinebreaks removes whitespace-only lines", () => {
    const input = "line one\n   \nline two\n\t\nline three";

    expect(normalizeEditorLinebreaks(input)).toBe(
      "line one\n\nline two\n\nline three",
    );
  });

  test("normalizeQuoteAuthorDelimiter keeps quote author separator WA-friendly", () => {
    const input = "[quote]test\n\ntesttest\ntest\n|author[/quote]";

    expect(normalizeQuoteAuthorDelimiter(input)).toBe(
      "[quote]test\n\ntesttest\ntest|author[/quote]",
    );
  });

  test("normalizeWorldAnvilSingleLineBreaks is available for explicit [br] insertion only", () => {
    const input = "line one\nline two\n\nline three\nline four";

    expect(normalizeWorldAnvilSingleLineBreaks(input)).toBe(
      "line one[br]line two\n\nline three[br]line four",
    );
  });

  test("key bindings include Mod-u for underline and invoke insertTag", () => {
    const insertTag = jest.fn(() => true);
    const insertOpaqueBlock = jest.fn(() => true);

    const bindings = createBbcodeKeyBindings({ insertTag, insertOpaqueBlock });
    const underlineBinding = bindings.find(
      (binding) => binding.key === "Mod-u",
    );

    expect(underlineBinding).toBeDefined();
    expect(underlineBinding?.run).toBeDefined();

    const runResult = underlineBinding!.run!({} as any);

    expect(runResult).toBe(true);
    expect(insertTag).toHaveBeenCalledWith("[u]", "[/u]");
  });

  test("key bindings include Shift-Enter and invoke explicit [br] insertion", () => {
    const insertTag = jest.fn(() => true);
    const insertOpaqueBlock = jest.fn(() => true);
    const insertLineBreakTag = jest.fn(() => true);

    const bindings = createBbcodeKeyBindings({
      insertTag,
      insertOpaqueBlock,
      insertLineBreakTag,
    });
    const lineBreakBinding = bindings.find(
      (binding) => binding.key === "Shift-Enter",
    );

    expect(lineBreakBinding).toBeDefined();
    expect(lineBreakBinding?.run).toBeDefined();

    const runResult = lineBreakBinding!.run!({} as any);

    expect(runResult).toBe(true);
    expect(insertLineBreakTag).toHaveBeenCalledTimes(1);
  });
});
