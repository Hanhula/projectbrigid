import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./rank-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Rank } from "@/components/types/article-types/rank";

const RankEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Rank;
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
    topLevelTabsId="rank-edit-tabs"
    bodyTabsId="rank-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default RankEdit;
