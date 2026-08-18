import { Person } from "@/components/types/article-types/person";
import {
  bodyFieldRegistry,
  bodySubTabRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  designFieldRegistry,
} from "./character-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";

const CharacterEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Person;
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
    defaultBodySubTabKey="physDesc"
    topLevelTabsId="character-edit-tabs"
    bodyTabsId="character-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default CharacterEdit;
