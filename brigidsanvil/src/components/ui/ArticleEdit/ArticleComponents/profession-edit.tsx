import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./profession-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Profession } from "@/components/types/article-types/profession";

const ProfessionEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Profession;
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
    defaultBodySubTabKey="career"
    topLevelTabsId="profession-edit-tabs"
    bodyTabsId="profession-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ProfessionEdit;
