import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./location-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Location } from "@/components/types/article-types/location";

const LocationEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Location;
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
    topLevelTabsId="location-edit-tabs"
    bodyTabsId="location-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default LocationEdit;
