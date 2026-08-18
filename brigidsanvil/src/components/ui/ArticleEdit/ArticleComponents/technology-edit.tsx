import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./technology-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Technology } from "@/components/types/article-types/technology";

const TechnologyEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Technology;
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
    topLevelTabsId="technology-edit-tabs"
    bodyTabsId="technology-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default TechnologyEdit;
