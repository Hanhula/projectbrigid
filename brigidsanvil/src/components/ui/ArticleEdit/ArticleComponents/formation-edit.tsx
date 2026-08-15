import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./formation-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Formation } from "@/components/types/article-types/formation";

const FormationEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Formation;
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
    defaultBodySubTabKey="composition"
    topLevelTabsId="formation-edit-tabs"
    bodyTabsId="formation-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default FormationEdit;
