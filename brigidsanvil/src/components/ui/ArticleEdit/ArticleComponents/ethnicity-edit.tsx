import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./ethnicity-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Ethnicity } from "@/components/types/article-types/ethnicity";

const EthnicityEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Ethnicity;
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
    defaultBodySubTabKey="naming-traditions"
    topLevelTabsId="ethnicity-edit-tabs"
    bodyTabsId="ethnicity-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default EthnicityEdit;
