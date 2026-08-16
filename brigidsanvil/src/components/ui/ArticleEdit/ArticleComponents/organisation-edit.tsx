import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./organisation-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Organisation } from "@/components/types/article-types/organisation";

const OrganisationEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Organisation;
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
    topLevelTabsId="organisation-edit-tabs"
    bodyTabsId="organisation-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default OrganisationEdit;
