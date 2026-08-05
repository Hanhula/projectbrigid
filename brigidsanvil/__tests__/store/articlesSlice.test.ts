import { selectWorldArticleStats } from "@/components/store/articlesSlice";

describe("article selector memoization", () => {
  it("returns a stable stats object for the same world state", () => {
    const state = {
      articleState: {
        worldArticles: [
          {
            world: { id: "world-1" },
            articles: [
              { id: "1", isDraft: false, tags: "stub" },
              { id: "2", isDraft: true, tags: "" },
            ],
          },
        ],
        currentWorldArticles: {
          world: { id: "world-1" },
          articles: [],
        },
        isLoadingWorldArticles: false,
        detailState: [
          {
            world: { id: "world-1" },
            isFullDetail: false,
          },
        ],
      },
    } as any;

    const first = selectWorldArticleStats(state, "world-1");
    const second = selectWorldArticleStats(state, "world-1");

    expect(first).toBe(second);
    expect(first).toEqual({ stubCount: 1, draftCount: 1 });
  });
});
