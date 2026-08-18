import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./myth-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Myth } from "@/components/types/article-types/myth";

const MythEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Myth;
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
    defaultBodySubTabKey="information"
    topLevelTabsId="myth-edit-tabs"
    bodyTabsId="myth-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default MythEdit;
