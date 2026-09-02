import {
  computeArticleWordCount,
  computeArticleWordCounts,
  countWords,
  countWordsAccurate,
  getWordCountableFieldIdentifiers,
} from "@/components/ui/ArticleEdit/EditComponents/utils/word-count";
import { KailuvaStructure } from "./articles-to-test";

describe("word-count utils", () => {
  test("countWords keeps bbcode tags and mentions, splitting on punctuation like WA does", () => {
    expect(
      countWords(
        "[quote]With Kailuva by my side!|Tuiravi[/quote] a @[Nisrei](organization:123) diplomat",
      ),
    ).toBe(13);
    expect(countWords("")).toBe(0);
  });

  test("Person field registry excludes dropdowns, css and excerpt", () => {
    const fieldIdentifiers = getWordCountableFieldIdentifiers("Person");

    expect(fieldIdentifiers).toEqual(
      expect.arrayContaining(["content", "history", "physique"]),
    );
    expect(fieldIdentifiers).not.toEqual(
      expect.arrayContaining([
        "excerpt",
        "displayCss",
        "cssClasses",
        "tags",
        "cover",
        "icon",
        "organization",
        "species",
      ]),
    );
  });

  test("comes within a close margin of WorldAnvil's stored wordcount for the Kailuva fixture", () => {
    // WA's own wordcounter isn't precise around punctuation, so we don't expect
    // an exact match to article.wordcount - just a close approximation.
    const baselineCount = computeArticleWordCount(KailuvaStructure);

    expect(baselineCount).toBeGreaterThan(0);
    expect(
      Math.abs(baselineCount - KailuvaStructure.wordcount) /
        KailuvaStructure.wordcount,
    ).toBeLessThan(0.05);
  });

  test("accurate count strips bbcode/mentions and is lower than the WA-approximate count", () => {
    const { accurate, waApprox } = computeArticleWordCounts(KailuvaStructure);

    expect(accurate).toBeGreaterThan(0);
    expect(accurate).toBeLessThan(waApprox);
    expect(
      countWordsAccurate("[quote]With Kailuva by my side!|Tuiravi[/quote]"),
    ).toBe(5);
  });

  test("responds to edited field overrides", () => {
    const baselineCount = computeArticleWordCount(KailuvaStructure);
    const withEdit = computeArticleWordCount(KailuvaStructure, {
      content: "Just three words",
    });

    expect(withEdit).toBe(
      baselineCount - countWords(KailuvaStructure.content) + 3,
    );
  });
});
