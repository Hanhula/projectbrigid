import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  articleSlice,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";
import DebouncedFieldDropdown from "@/components/ui/ArticleEdit/EditComponents/debounced-field-dropdown";

describe("DebouncedFieldDropdown relationship values", () => {
  const world = { id: "world-1", title: "World" } as any;
  const article = {
    id: "item-1",
    type: { id: "armor-id", title: "Armor" },
  } as any;

  const renderDropdown = () => {
    const store = configureStore({
      reducer: { [articleSlice.name]: articleSlice.reducer },
    });

    render(
      <Provider store={store}>
        <DebouncedFieldDropdown
          world={world}
          article={article}
          fieldIdentifier="type"
          id="item-type"
          options={[
            { value: "ammunition-id", label: "Ammunition" },
            { value: "armor-id", label: "Armor" },
          ]}
          valueAsReference
        />
      </Provider>,
    );

    return store;
  };

  test("selects an existing relationship by id", () => {
    renderDropdown();

    expect(screen.getByRole("combobox")).toHaveValue("armor-id");
  });

  test("stores a selected type as an id reference", () => {
    const store = renderDropdown();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "ammunition-id" },
    });
    fireEvent.blur(screen.getByRole("combobox"));

    const selectEditedValue = makeSelectEditedContentValueByID(
      world.id,
      article.id,
      "type",
    );
    expect(selectEditedValue(store.getState() as any)).toEqual({
      id: "ammunition-id",
    });
  });
});
