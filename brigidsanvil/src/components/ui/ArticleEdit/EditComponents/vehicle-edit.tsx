import { Vehicle } from "@/components/types/article-types/vehicle";
import {
  bodyFieldRegistry,
  bodySubTabRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
} from "./vehicle-edit-registry";
import { ArticleEditPage } from "./article-edit-page";

const VehicleEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Vehicle;
  resetSignal?: number;
}) => (
  <ArticleEditPage
    article={article}
    bodyFieldRegistry={bodyFieldRegistry}
    bodySubTabRegistry={bodySubTabRegistry}
    subtitleFieldRegistry={subtitleFieldRegistry}
    sidebarFieldRegistry={sidebarFieldRegistry}
    footerFieldRegistry={footerFieldRegistry}
    defaultBodySubTabKey="identity"
    topLevelTabsId="vehicle-edit-tabs"
    bodyTabsId="vehicle-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default VehicleEdit;
