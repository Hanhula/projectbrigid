import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./ritual-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Ritual } from "@/components/types/article-types/ritual";

const RitualEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Ritual;
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
    defaultBodySubTabKey="properties"
    topLevelTabsId="ritual-edit-tabs"
    bodyTabsId="ritual-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default RitualEdit;
