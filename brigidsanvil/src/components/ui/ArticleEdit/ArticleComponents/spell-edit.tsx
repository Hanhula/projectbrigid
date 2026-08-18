import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./spell-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Spell } from "@/components/types/article-types/spell";

const SpellEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Spell;
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
    topLevelTabsId="spell-edit-tabs"
    bodyTabsId="spell-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default SpellEdit;
