import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ArticleEditToolbar from "@/components/ui/ArticleEdit/EditComponents/article-edit-toolbar";

describe("ArticleEditToolbar", () => {
  test("provides accessible labels and tooltips for actions", () => {
    render(
      <ArticleEditToolbar
        article={
          {
            id: "article-1",
            title: "Example article",
            url: "https://example.com/articles/article-1",
            entityClass: "Article",
          } as any
        }
        isRefreshing={false}
        onReset={() => undefined}
        onRefresh={() => undefined}
        onSave={() => undefined}
        onExportBackup={() => undefined}
        onImportBackup={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Hide options" }),
    ).toHaveAttribute("title", "Hide options");
    expect(
      screen.getByRole("button", { name: "Reset article content" }),
    ).toHaveAttribute("title", "Reset article content");
    expect(
      screen.getByRole("button", { name: "Refresh article content" }),
    ).toHaveAttribute("title", "Refresh article content");
    expect(
      screen.getByRole("button", { name: "Save article to WorldAnvil" }),
    ).toHaveAttribute("title", "Save article to WorldAnvil");
    expect(
      screen.getByRole("button", { name: "Export article backup" }),
    ).toHaveAttribute("title", "Export article backup");
    expect(
      screen.getByRole("button", { name: "Import article backup" }),
    ).toHaveAttribute("title", "Import article backup");
  });
});
