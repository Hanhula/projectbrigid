import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./item-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Item } from "@/components/types/article-types/item";

const ItemEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Item;
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
    defaultBodySubTabKey="generic"
    topLevelTabsId="item-edit-tabs"
    bodyTabsId="item-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ItemEdit;
