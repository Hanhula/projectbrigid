import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./law-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Law } from "@/components/types/article-types/law";

const LawEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Law;
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
    defaultBodySubTabKey="details"
    topLevelTabsId="law-edit-tabs"
    bodyTabsId="law-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default LawEdit;
