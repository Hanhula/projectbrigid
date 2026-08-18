import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./plot-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Plot } from "@/components/types/article-types/plot";

const PlotEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Plot;
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
    topLevelTabsId="plot-edit-tabs"
    bodyTabsId="plot-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default PlotEdit;
