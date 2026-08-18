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
      screen.getByRole("button", { name: "Reset content" }),
    ).toHaveAttribute("title", "Reset content");
    expect(
      screen.getByRole("button", { name: "Refresh content" }),
    ).toHaveAttribute("title", "Refresh content");
    expect(
      screen.getByRole("button", { name: "Save to WorldAnvil" }),
    ).toHaveAttribute("title", "Save to WorldAnvil");
    expect(
      screen.getByRole("button", { name: "Export backup" }),
    ).toHaveAttribute("title", "Export backup");
    expect(
      screen.getByRole("button", { name: "Import backup" }),
    ).toHaveAttribute("title", "Import backup");
  });
});
