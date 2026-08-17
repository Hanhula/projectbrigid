import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./settlement-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Settlement } from "@/components/types/article-types/settlement";

const SettlementEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Settlement;
  resetSignal?: number;
}) => {
  console.log(article.type);
  return (
    <ArticleEditPage
      article={article}
      bodyFieldRegistry={bodyFieldRegistry}
      bodySubTabRegistry={bodySubTabRegistry}
      subtitleFieldRegistry={subtitleFieldRegistry}
      sidebarFieldRegistry={sidebarFieldRegistry}
      footerFieldRegistry={footerFieldRegistry}
      designFieldRegistry={designFieldRegistry}
      defaultBodySubTabKey="information"
      topLevelTabsId="settlement-edit-tabs"
      bodyTabsId="settlement-sub-tabs"
      resetSignal={resetSignal}
    />
  );
};

export default SettlementEdit;
