import { Material } from "@/components/types/article-types/material";
import { ArticleEditPage } from "./article-edit-page";
import {
  bodyFieldRegistry,
  bodySubTabRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
} from "./material-edit-registry";

const MaterialEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Material;
  resetSignal?: number;
}) => (
  <ArticleEditPage
    article={article}
    bodyFieldRegistry={bodyFieldRegistry}
    bodySubTabRegistry={bodySubTabRegistry}
    subtitleFieldRegistry={subtitleFieldRegistry}
    sidebarFieldRegistry={sidebarFieldRegistry}
    footerFieldRegistry={footerFieldRegistry}
    defaultBodySubTabKey="properties"
    topLevelTabsId="material-edit-tabs"
    bodyTabsId="material-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default MaterialEdit;
