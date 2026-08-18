import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./document-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Document } from "@/components/types/article-types/document";

const DocumentEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Document;
  resetSignal?: number;
}) => (
  <ArticleEditPage
    article={article}
    bodyFieldRegistry={bodyFieldRegistry}
    bodySubTabRegistry={bodySubTabRegistry}
    subtitleFieldRegistry={subtitleFieldRegistry}
    sidebarFieldRegistry={sidebarFieldRegistry}
    footerFieldRegistry={footerFieldRegistry}
    designFieldRegistry={designFieldRegistry}
    defaultBodySubTabKey="structure"
    topLevelTabsId="document-edit-tabs"
    bodyTabsId="document-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default DocumentEdit;
