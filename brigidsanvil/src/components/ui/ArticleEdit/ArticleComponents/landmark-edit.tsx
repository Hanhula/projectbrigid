import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./landmark-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Landmark } from "@/components/types/article-types/landmark";

const LandmarkEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Landmark;
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
    topLevelTabsId="landmark-edit-tabs"
    bodyTabsId="landmark-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default LandmarkEdit;
