import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./species-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Species } from "@/components/types/article-types/species";

const SpeciesEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Species;
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
    defaultBodySubTabKey="basic-information"
    topLevelTabsId="species-edit-tabs"
    bodyTabsId="species-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default SpeciesEdit;
