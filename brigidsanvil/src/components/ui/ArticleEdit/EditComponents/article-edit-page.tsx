import { Article } from "@/components/types/article";
import { selectWorld } from "@/components/store/apiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import {
  ArticleFieldConfig,
  renderArticleField,
} from "./article-edit-field-renderer";
import {
  ArticleTopLevelTabKey,
  articleTopLevelTabRegistry,
} from "./article-edit-registry-common";
import DebouncedInput from "./debounced-input";

export type ArticleBodySubTabConfig<TArticle extends Article> = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<TArticle>[];
};

export type ArticleEditPageProps<TArticle extends Article> = {
  article: TArticle;
  bodyFieldRegistry: ArticleFieldConfig<TArticle>[];
  bodySubTabRegistry: ArticleBodySubTabConfig<TArticle>[];
  subtitleFieldRegistry: ArticleFieldConfig<TArticle>[];
  sidebarFieldRegistry: ArticleFieldConfig<TArticle>[];
  footerFieldRegistry: ArticleFieldConfig<TArticle>[];
  designFieldRegistry: ArticleFieldConfig<TArticle>[];
  defaultBodySubTabKey: string;
  topLevelTabsId: string;
  bodyTabsId: string;
  resetSignal?: number;
};

export function ArticleEditPage<TArticle extends Article>({
  article,
  bodyFieldRegistry,
  bodySubTabRegistry,
  subtitleFieldRegistry,
  sidebarFieldRegistry,
  footerFieldRegistry,
  designFieldRegistry,
  defaultBodySubTabKey,
  topLevelTabsId,
  bodyTabsId,
  resetSignal = 0,
}: ArticleEditPageProps<TArticle>) {
  const world = useSelector(selectWorld);
  const [lastFocusedEditor, setLastFocusedEditor] = useState("");

  const renderFields = (fields: ArticleFieldConfig<TArticle>[]) => {
    return fields.map((field) =>
      renderArticleField(field, {
        article,
        world,
        lastFocusedEditor,
        setLastFocusedEditor,
        resetSignal,
      }),
    );
  };

  const tabContentByKey: Record<ArticleTopLevelTabKey, JSX.Element> = {
    body: (
      <>
        {renderFields(bodyFieldRegistry)}
        <Tabs
          defaultActiveKey={defaultBodySubTabKey}
          id={bodyTabsId}
          className="mb-3"
          mountOnEnter
          unmountOnExit
        >
          {bodySubTabRegistry.map((subTab) => (
            <Tab
              key={subTab.eventKey}
              eventKey={subTab.eventKey}
              title={subTab.title}
            >
              {renderFields(subTab.fields)}
            </Tab>
          ))}
        </Tabs>
      </>
    ),
    subtitle: <>{renderFields(subtitleFieldRegistry)}</>,
    sidebar: <>{renderFields(sidebarFieldRegistry)}</>,
    footer: <>{renderFields(footerFieldRegistry)}</>,
    design: <>{renderFields(designFieldRegistry)}</>,
  };

  const hasFieldsByTabKey: Record<ArticleTopLevelTabKey, boolean> = {
    body: bodyFieldRegistry.length > 0 || bodySubTabRegistry.length > 0,
    subtitle: subtitleFieldRegistry.length > 0,
    sidebar: sidebarFieldRegistry.length > 0,
    footer: footerFieldRegistry.length > 0,
    design: designFieldRegistry.length > 0,
  };

  return (
    <div>
      <h2 className="article-edit-header mt-2">
        Editing {article.entityClass}: {article.title}
      </h2>
      <div className="mb-3">
        <label htmlFor={`article-title-${article.id}`} className="form-label">
          Title
        </label>
        <DebouncedInput
          world={world}
          article={article}
          fieldIdentifier="title"
          id={`article-title-${article.id}`}
        />
      </div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <small className="text-muted">
          Editing via Brigid, not via WorldAnvil. Changes will save locally, but
          will not be reflected in WorldAnvil until you press Save to
          WorldAnvil.
        </small>
      </div>
      <Tabs
        defaultActiveKey="body"
        id={topLevelTabsId}
        className="mb-3"
        mountOnEnter
        unmountOnExit
      >
        {articleTopLevelTabRegistry
          .filter((tabConfig) => hasFieldsByTabKey[tabConfig.eventKey])
          .map((tabConfig) => (
            <Tab
              key={tabConfig.eventKey}
              eventKey={tabConfig.eventKey}
              title={tabConfig.title}
            >
              {tabContentByKey[tabConfig.eventKey]}
            </Tab>
          ))}
      </Tabs>
    </div>
  );
}
