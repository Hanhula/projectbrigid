import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  sidebarFieldRegistry,
  subtitleFieldRegistry,
  bodySubTabRegistry,
} from "./language-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Language } from "@/components/types/article-types/language";

const LanguageEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Language;
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
    topLevelTabsId="language-edit-tabs"
    bodyTabsId="language-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default LanguageEdit;
