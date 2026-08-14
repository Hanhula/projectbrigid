import {
  bodyFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
} from "./article-edit-registry";
import { ArticleEditPage } from "./article-edit-page";
import { Article } from "@/components/types/article";

const ArticleEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Article;
  resetSignal?: number;
}) => (
  <ArticleEditPage
    article={article}
    bodyFieldRegistry={bodyFieldRegistry}
    bodySubTabRegistry={[]}
    subtitleFieldRegistry={subtitleFieldRegistry}
    sidebarFieldRegistry={sidebarFieldRegistry}
    footerFieldRegistry={footerFieldRegistry}
    defaultBodySubTabKey="identity"
    topLevelTabsId="article-edit-tabs"
    bodyTabsId="article-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ArticleEdit;
