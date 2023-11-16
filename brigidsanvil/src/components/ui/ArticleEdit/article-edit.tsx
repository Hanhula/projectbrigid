import { Article } from "@/components/types/article";
import { WorldAnvilEditor } from "./editor";

export const ArticleEditPage = (article: Article) => {
  return (
    <div>
      <WorldAnvilEditor
        fieldIdentifier="content"
        id={article.id}
        existingContent={article.content!}
      />
      <WorldAnvilEditor
        fieldIdentifier="fullFooter"
        id={article.id}
        existingContent={article.fullfooter!}
      />
      {/* ... other components ... */}
    </div>
  );
};
