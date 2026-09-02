import { Article } from "@/components/types/article";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TagsField from "@/components/ui/Common/tags-field";

type ArticleTagsInputProps = {
  world: World;
  article: Article;
  fieldIdentifier: string;
  resetSignal?: number;
};

const ArticleTagsInput = ({
  world,
  article,
  fieldIdentifier,
}: ArticleTagsInputProps) => {
  const dispatch = useDispatch();
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContentValue = useSelector(selectEditedContentValueByID);
  const editedContent =
    typeof editedContentValue === "string" ? editedContentValue : undefined;
  const currentValue = String(editedContent ?? article[fieldIdentifier] ?? "");

  const handleChange = (newValue: string) => {
    dispatch(
      setEditedContentByID({
        world: { id: world.id },
        articleID: article.id,
        fieldIdentifier,
        editedFields: newValue,
      }),
    );
  };

  return (
    <TagsField
      className="article-tags-input react-tagsinput form-control"
      value={currentValue}
      onChange={handleChange}
      name={fieldIdentifier}
    />
  );
};

export default ArticleTagsInput;
