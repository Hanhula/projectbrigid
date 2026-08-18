import React from "react";
import { render, cleanup } from "@testing-library/react";
import { articleEditPageRegistry } from "@/components/ui/ArticleEdit/ArticleComponents/article-edit-page-registry";

const articleEditPageMock = jest.fn<null, [unknown]>(() => null);

jest.mock(
  "../../src/components/ui/ArticleEdit/EditComponents/article-edit-page",
  () => ({
    ArticleEditPage: (props: unknown) => {
      articleEditPageMock(props);
      return null;
    },
  }),
);

describe("article edit page defaults", () => {
  beforeEach(() => {
    articleEditPageMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it.each(Object.keys(articleEditPageRegistry))(
    "%s uses a default body sub-tab key present in its registry",
    (entityClass) => {
      const { Component } = articleEditPageRegistry[entityClass];

      render(
        React.createElement(Component, {
          article: { id: `test-${entityClass}` },
        }),
      );

      const props = articleEditPageMock.mock.lastCall?.[0] as unknown as {
        defaultBodySubTabKey?: string;
        bodySubTabRegistry?: Array<{ eventKey: string }>;
      };

      if (props.defaultBodySubTabKey) {
        expect(props.bodySubTabRegistry).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ eventKey: props.defaultBodySubTabKey }),
          ]),
        );
      }
    },
  );
});
