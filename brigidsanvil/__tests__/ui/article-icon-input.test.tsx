import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  articleSlice,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";
import ArticleIconInput from "@/components/ui/ArticleEdit/EditComponents/article-icon-input";

jest.mock(
  "../../src/components/ui/Table/EditableComponents/editable-icons",
  () => ({
    __esModule: true,
    default: ({ editing, onSave }: any) =>
      editing ? (
        <button onClick={() => onSave("fas fa-dragon")}>Select icon</button>
      ) : null,
  }),
);

describe("ArticleIconInput", () => {
  test("stores an icon selected through the picker in the article edit state", () => {
    const world = { id: "world-1" } as any;
    const article = { id: "article-1", icon: "fas fa-book" } as any;
    const store = configureStore({
      reducer: { [articleSlice.name]: articleSlice.reducer },
    });

    render(
      <Provider store={store}>
        <ArticleIconInput
          world={world}
          article={article}
          fieldIdentifier="icon"
        />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Choose an icon" }));
    fireEvent.click(screen.getByRole("button", { name: "Select icon" }));

    const selectEditedValue = makeSelectEditedContentValueByID(
      world.id,
      article.id,
      "icon",
    );
    expect(selectEditedValue(store.getState() as any)).toBe("fas fa-dragon");
  });
});
