import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";

const CharacterEdit = ({ article }: { article: Person }) => {
  return (
    <div>
      <WorldAnvilEditor
        fieldIdentifier="content"
        id={article.id}
        existingContent={article.content!}
      />

      <WorldAnvilEditor
        fieldIdentifier="bodyFeatures"
        id={article.id}
        existingContent={article.bodyFeatures!}
      />

      <WorldAnvilEditor
        fieldIdentifier="facialFeatures"
        id={article.id}
        existingContent={article.facialFeatures!}
      />
    </div>
  );
};

export default CharacterEdit;
