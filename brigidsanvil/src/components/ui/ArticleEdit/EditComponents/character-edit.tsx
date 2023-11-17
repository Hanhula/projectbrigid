import { Person } from "@/components/types/article-types/person";
import { WorldAnvilEditor } from "../editor";

const CharacterEdit = ({ article }: { article: Person }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <br />
      <WorldAnvilEditor
        fieldIdentifier="content"
        id={article.id}
        existingContent={article.content!}
      />
      <br />
      <h2>Physical Description</h2>
      <h3>Body Features</h3>
      <WorldAnvilEditor
        fieldIdentifier="bodyFeatures"
        id={article.id}
        existingContent={article.bodyFeatures!}
      />
      <br />
      <h3>Facial Features</h3>
      <WorldAnvilEditor
        fieldIdentifier="facialFeatures"
        id={article.id}
        existingContent={article.facialFeatures!}
      />
    </div>
  );
};

export default CharacterEdit;
