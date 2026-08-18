import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./report-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Report } from "@/components/types/article-types/report";

const ReportEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Report;
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
    defaultBodySubTabKey="summary"
    topLevelTabsId="report-edit-tabs"
    bodyTabsId="report-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ReportEdit;
