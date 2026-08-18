import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./militaryconflict-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { MilitaryConflict } from "@/components/types/article-types/militaryconflict";

const MilitaryConflictEdit = ({
  article,
  resetSignal = 0,
}: {
  article: MilitaryConflict;
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
    defaultBodySubTabKey="conflict"
    topLevelTabsId="militaryconflict-edit-tabs"
    bodyTabsId="militaryconflict-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default MilitaryConflictEdit;
