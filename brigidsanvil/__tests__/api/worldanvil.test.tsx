import React, { useEffect } from "react";
import { act, render, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { apiSlice } from "@/components/store/apiSlice";
import { articleSlice } from "@/components/store/articlesSlice";
import { authSlice } from "@/components/store/authSlice";

type WorldAnvilAPI = ReturnType<typeof useWorldAnvilAPI>;

const createFetchResponse = (payload: unknown, url: string) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  url,
  json: async () => payload,
});

const createTestStore = (editStateByWorld: Record<string, unknown>) => {
  return configureStore({
    reducer: {
      [apiSlice.name]: apiSlice.reducer,
      [articleSlice.name]: articleSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    preloadedState: {
      [apiSlice.name]: {
        apiResponse: { success: true },
        identity: { success: true, id: "identity-1" },
        world: {
          id: "world-1",
          title: "Primary World",
        },
        worlds: { success: true, entities: [] },
        isLoadingArticles: false,
        articleFetchProgress: {
          worldId: "",
          totalCount: 0,
          loadedCount: 0,
          offset: 0,
          isComplete: false,
        },
      },
      [authSlice.name]: {
        authToken: "token-1",
      },
      [articleSlice.name]: {
        worldArticles: [],
        currentWorldArticles: {
          world: { id: "world-1" },
          articles: [],
        },
        isLoadingWorldArticles: false,
        detailState: [],
        worldArticlesById: {
          "world-1": {
            world: { id: "world-1" },
            articles: [
              {
                id: "article-1",
                title: "Article",
                slug: "article",
                state: "public",
                isWip: false,
                isDraft: false,
                entityClass: "Person",
                icon: "",
                url: "https://example.com/article",
                subscribergroups: [],
                folderId: "",
                tags: "",
                updateDate: {
                  date: "2026-01-01",
                  timezone_type: 0,
                  timezone: "UTC",
                },
                content: "",
              },
            ],
          },
        },
        detailStateByWorld: {},
        articleIdsByWorld: {
          "world-1": ["article-1"],
        },
        articlesByIdByWorld: {
          "world-1": {
            "article-1": {
              id: "article-1",
              title: "Article",
              slug: "article",
              state: "public",
              isWip: false,
              isDraft: false,
              entityClass: "Person",
              icon: "",
              url: "https://example.com/article",
              subscribergroups: [],
              folderId: "",
              tags: "",
              updateDate: {
                date: "2026-01-01",
                timezone_type: 0,
                timezone: "UTC",
              },
              content: "",
            },
          },
        },
        editStateByWorld,
        editorMode: "rich",
      },
    } as any,
  });
};

const HookHarness = ({
  onReady,
}: {
  onReady: (api: WorldAnvilAPI) => void;
}) => {
  const api = useWorldAnvilAPI();

  useEffect(() => {
    onReady(api);
  }, [api, onReady]);

  return null;
};

describe("useWorldAnvilAPI updateEditedArticleByFields", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("uses cross-world edit fallback and clears the source edit bucket after successful save", async () => {
    const store = createTestStore({
      "world-2": {
        world: { id: "world-2", title: "Secondary World" },
        editedFieldsByArticle: {
          "article-1": {
            content: "patched from fallback world",
          },
        },
      },
    });

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(
        createFetchResponse({ id: "article-1" }, "/api/article?id=article-1"),
      )
      .mockResolvedValueOnce(
        createFetchResponse(
          {
            id: "article-1",
            updateDate: {
              date: "2026-01-01",
            },
          },
          "/api/article?id=article-1&granularity=2",
        ),
      );

    global.fetch = fetchMock as unknown as typeof fetch;

    let worldAnvilAPI: WorldAnvilAPI | null = null;

    render(
      <Provider store={store}>
        <HookHarness
          onReady={(api) => {
            worldAnvilAPI = api;
          }}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(worldAnvilAPI).not.toBeNull();
    });

    await act(async () => {
      await worldAnvilAPI!.updateEditedArticleByFields("article-1");
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/article?id=article-1");

    const patchOptions = fetchMock.mock.calls[0][1] as RequestInit;
    expect(patchOptions.method).toBe("PATCH");
    expect(JSON.parse(String(patchOptions.body))).toEqual({
      content: "patched from fallback world",
    });

    const articleState = (store.getState() as any).articleState;
    expect(articleState.editStateByWorld["world-2"]).toBeUndefined();
  });

  test("returns null and does not throw when there are no pending local edits", async () => {
    const store = createTestStore({});

    const fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    let worldAnvilAPI: WorldAnvilAPI | null = null;

    render(
      <Provider store={store}>
        <HookHarness
          onReady={(api) => {
            worldAnvilAPI = api;
          }}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(worldAnvilAPI).not.toBeNull();
    });

    await expect(
      worldAnvilAPI!.updateEditedArticleByFields("article-404"),
    ).resolves.toBeNull();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      "No local edits found for article with ID article-404; skipping save request.",
    );

    warnSpy.mockRestore();
  });
});
