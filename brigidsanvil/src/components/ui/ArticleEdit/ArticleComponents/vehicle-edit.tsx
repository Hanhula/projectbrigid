import { Vehicle } from "@/components/types/article-types/vehicle";
import {
  bodyFieldRegistry,
  bodySubTabRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  designFieldRegistry,
} from "./vehicle-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";

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
    designFieldRegistry={designFieldRegistry}
    defaultBodySubTabKey="identity"
    topLevelTabsId="vehicle-edit-tabs"
    bodyTabsId="vehicle-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default VehicleEdit;
