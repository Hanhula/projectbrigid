import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./condition-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Condition } from "@/components/types/article-types/condition";

const ConditionEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Condition;
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
    topLevelTabsId="condition-edit-tabs"
    bodyTabsId="condition-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ConditionEdit;
