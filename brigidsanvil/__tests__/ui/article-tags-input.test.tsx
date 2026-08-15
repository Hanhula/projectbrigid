import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  articleSlice,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";
import ArticleTagsInput from "@/components/ui/ArticleEdit/EditComponents/article-tags-input";

jest.mock("react-tagsinput", () => ({
  __esModule: true,
  default: ({ value, onChange, inputProps }: any) => (
    <input
      aria-label={inputProps.name}
      value={value.join(",")}
      onChange={(event) => onChange(event.target.value.split(","))}
    />
  ),
}));

describe("ArticleTagsInput", () => {
  test("stores normalized tags in the article edit state", () => {
    const world = { id: "world-1" } as any;
    const article = { id: "article-1", tags: "lore, history" } as any;
    const store = configureStore({
      reducer: { [articleSlice.name]: articleSlice.reducer },
    });

    render(
      <Provider store={store}>
        <ArticleTagsInput
          world={world}
          article={article}
          fieldIdentifier="tags"
        />
      </Provider>,
    );

    const input = screen.getByRole("textbox", { name: "tags" });
    expect(input).toHaveValue("lore,history");

    fireEvent.change(input, { target: { value: " lore , history , " } });

    const selectEditedValue = makeSelectEditedContentValueByID(
      world.id,
      article.id,
      "tags",
    );
    expect(selectEditedValue(store.getState() as any)).toBe("lore,history");
  });
});
