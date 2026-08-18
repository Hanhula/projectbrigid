import {
  bodyFieldRegistry,
  designFieldRegistry,
  footerFieldRegistry,
  subtitleFieldRegistry,
} from "./prose-edit-registry";
import { ArticleEditPage } from "../EditComponents/article-edit-page";
import { Prose } from "@/components/types/article-types/prose";

const ProseEdit = ({
  article,
  resetSignal = 0,
}: {
  article: Prose;
  resetSignal?: number;
}) => (
  <ArticleEditPage
    article={article}
    bodyFieldRegistry={bodyFieldRegistry}
    bodySubTabRegistry={[]}
    subtitleFieldRegistry={subtitleFieldRegistry}
    sidebarFieldRegistry={[]}
    footerFieldRegistry={footerFieldRegistry}
    designFieldRegistry={designFieldRegistry}
    topLevelTabsId="prose-edit-tabs"
    bodyTabsId="prose-sub-tabs"
    resetSignal={resetSignal}
  />
);

export default ProseEdit;
