import React from "react";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  normalizeEditorLinebreaks,
  normalizeQuoteAuthorDelimiter,
} from "@/components/ui/ArticleEdit/EditComponents/utils/bbcode-tags";
import BBCodeEditor from "@/components/ui/ArticleEdit/EditComponents/bbcode-editor";
import { apiSlice } from "@/components/store/apiSlice";
import {
  articleSlice,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";

beforeAll(() => {
  if (!Range.prototype.getClientRects) {
    Range.prototype.getClientRects =
      function getClientRectsPolyfill(): DOMRectList {
        return {
          length: 0,
          item: () => null,
          [Symbol.iterator]: function* () {
            yield* [] as DOMRect[];
          },
        } as DOMRectList;
      };
  }
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.name]: apiSlice.reducer,
      [articleSlice.name]: articleSlice.reducer,
    },
    preloadedState: {
      [apiSlice.name]: {
        apiResponse: { success: true },
        identity: { success: false },
        world: {
          id: "world-1",
          title: "Test World",
        },
        worlds: { success: false },
        articles: [],
        isLoadingArticles: false,
        articleFetchProgress: {
          worldId: "",
          totalCount: 0,
          loadedCount: 0,
          offset: 0,
          isComplete: false,
        },
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
                title: "Kailuva",
                slug: "kailuva",
                state: "public",
                isWip: false,
                isDraft: false,
                entityClass: "Person",
                icon: "",
                url: "https://example.com/kailuva",
                subscribergroups: [],
                folderId: "",
                tags: "",
                updateDate: {
                  date: "",
                  timezone_type: 0,
                  timezone: "",
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
          "world-1": {},
        },
        editStateByWorld: {},
        editorMode: "rich",
      },
    } as any,
  });
};

describe("BBCodeEditor integration", () => {
  test("save normalization preserves single and double line breaks", () => {
    const input = `[b]it's not good jim[/b]

yeah I mean
it was never gonna be very good

was it now
bet

[quote]test

testtest
test
|author[/quote]`;

    const saved = normalizeQuoteAuthorDelimiter(
      normalizeEditorLinebreaks(input),
    );

    expect(saved).toBe(`[b]it's not good jim[/b]

yeah I mean
it was never gonna be very good

was it now
bet

[quote]test

testtest
test|author[/quote]`);
  });

  test("does not clear existing content when editor loses focus state", async () => {
    const store = createTestStore();

    const { rerender } = render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]keep me[/quote]"
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[quote]keep me[/quote]");
    });

    rerender(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]keep me[/quote]"
          onFocus={() => {}}
          lastFocusedEditor={""}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[quote]keep me[/quote]");
    });
  });

  test("does not render temporary mention debug output", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(document.querySelector(".cm-content")).toBeInTheDocument();
    });

    expect(screen.queryByText(/mention-debug/i)).not.toBeInTheDocument();
  });

  test("Image helper inserts WA-compatible [img:]", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(document.querySelector(".cm-content")).toBeInTheDocument();
    });

    fireEvent.focus(document.querySelector(".cm-content") as HTMLElement);
    const imageButton = screen.getByRole("button", { name: "Image" });
    expect(imageButton).toHaveAttribute(
      "title",
      "Image reference (Ctrl+Shift+I)",
    );
    expect(imageButton.querySelector("svg")).toBeInTheDocument();

    fireEvent.click(imageButton);

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[img:]");
    });
  });

  test("resetSignal restores content back to existing WorldAnvil value", async () => {
    const store = createTestStore();

    const { rerender } = render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]server[/quote]"
          onFocus={() => {}}
          lastFocusedEditor={"content"}
          resetSignal={0}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[quote]server[/quote]");
    });

    fireEvent.focus(document.querySelector(".cm-content") as HTMLElement);
    fireEvent.click(screen.getByRole("button", { name: "Image" }));

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[img:]");
    });

    rerender(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]server[/quote]"
          onFocus={() => {}}
          lastFocusedEditor={"content"}
          resetSignal={1}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[quote]server[/quote]");
      expect(content).not.toContain("[img:]");
    });
  });

  test("restore resetSignal loads imported local content", async () => {
    const store = createTestStore();

    const { rerender } = render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]current server value[/quote]"
          onFocus={() => {}}
          lastFocusedEditor="content"
          resetSignal={0}
        />
      </Provider>,
    );

    act(() => {
      store.dispatch({
        type: "articleState/setEditedContentByID",
        payload: {
          world: { id: "world-1" },
          articleID: "article-1",
          fieldIdentifier: "content",
          editedFields: "[quote]imported backup value[/quote]",
        },
      });
    });

    rerender(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent="[quote]current server value[/quote]"
          onFocus={() => {}}
          lastFocusedEditor="content"
          resetSignal={-1}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("[quote]imported backup value[/quote]");
      expect(content).not.toContain("[quote]current server value[/quote]");
    });
  });

  test("blur commits latest local content to edit state before unfocused sync", async () => {
    const store = createTestStore();

    const { rerender } = render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(document.querySelector(".cm-content")).toBeInTheDocument();
    });

    fireEvent.focus(document.querySelector(".cm-content") as HTMLElement);
    fireEvent.click(screen.getByRole("button", { name: "Image" }));

    rerender(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      const selectEditedContent = makeSelectEditedContentValueByID(
        "world-1",
        "article-1",
        "content",
      );
      const edited = selectEditedContent(store.getState() as any);
      expect(edited).toContain("[img:]");
    });
  });

  test("keeps latest local content when editor unmounts while focused", async () => {
    const store = createTestStore();

    const { unmount } = render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={"content"}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(document.querySelector(".cm-content")).toBeInTheDocument();
    });

    fireEvent.focus(document.querySelector(".cm-content") as HTMLElement);
    fireEvent.click(screen.getByRole("button", { name: "Image" }));

    unmount();

    const selectEditedContent = makeSelectEditedContentValueByID(
      "world-1",
      "article-1",
      "content",
    );
    const edited = selectEditedContent(store.getState() as any);
    expect(edited).toContain("[img:]");
  });

  test("does not wipe restored local edits on initial mount", async () => {
    const store = createTestStore();
    store.dispatch({
      type: "articleState/setEditedContentByID",
      payload: {
        world: { id: "world-1" },
        articleID: "article-1",
        fieldIdentifier: "content",
        editedFields: "restored local draft",
      },
    });

    render(
      <Provider store={store}>
        <BBCodeEditor
          id="article-1"
          fieldIdentifier="content"
          existingContent=""
          onFocus={() => {}}
          lastFocusedEditor={null}
          resetSignal={0}
        />
      </Provider>,
    );

    await waitFor(() => {
      const content = document.querySelector(".cm-content")?.textContent ?? "";
      expect(content).toContain("restored local draft");
    });

    const selectEditedContent = makeSelectEditedContentValueByID(
      "world-1",
      "article-1",
      "content",
    );
    const edited = selectEditedContent(store.getState() as any);
    expect(edited).toBe("restored local draft");
  });
});
