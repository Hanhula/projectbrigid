import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import DebouncedInput from "@/components/ui/ArticleEdit/EditComponents/debounced-input";
import {
  articleSlice,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";

describe("DebouncedInput persistence", () => {
  const createStore = (preloadedArticleState?: any) =>
    configureStore({
      reducer: {
        [articleSlice.name]: articleSlice.reducer,
      },
      preloadedState: preloadedArticleState
        ? {
            [articleSlice.name]: {
              ...articleSlice.getInitialState(),
              ...preloadedArticleState,
            },
          }
        : undefined,
    });

  const world = { id: "world-1", title: "World" } as any;
  const article = {
    id: "article-1",
    middlename: "",
  } as any;

  test("flushes pending edits on unmount so refresh keeps local state", () => {
    const store = createStore();

    const { unmount } = render(
      <Provider store={store}>
        <DebouncedInput
          world={world}
          article={article}
          fieldIdentifier="middlename"
        />
      </Provider>,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Ari" },
    });

    unmount();

    const selector = makeSelectEditedContentValueByID(
      world.id,
      article.id,
      "middlename",
    );
    const saved = selector(store.getState() as any);

    expect(saved).toBe("Ari");
  });

  test("loads existing local edit state value over empty article value", () => {
    const store = createStore({
      editStateByWorld: {
        [world.id]: {
          world,
          editedFieldsByArticle: {
            [article.id]: {
              middlename: "Ari",
            },
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <DebouncedInput
          world={world}
          article={article}
          fieldIdentifier="middlename"
        />
      </Provider>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("Ari");
  });

  test("does not overwrite in-progress typing with stale edited state", () => {
    const store = createStore({
      editStateByWorld: {
        [world.id]: {
          world,
          editedFieldsByArticle: {
            [article.id]: {
              middlename: "A",
            },
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <DebouncedInput
          world={world}
          article={article}
          fieldIdentifier="middlename"
        />
      </Provider>,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Al" },
    });

    expect(screen.getByRole("textbox")).toHaveValue("Al");
  });
});
