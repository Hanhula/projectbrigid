import { Article } from "@/components/types/article";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const tagsFromValue = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

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
  resetSignal = 0,
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
  const [tags, setTags] = useState(() =>
    tagsFromValue(String(editedContent ?? article[fieldIdentifier] ?? "")),
  );

  useEffect(() => {
    setTags(
      tagsFromValue(String(editedContent ?? article[fieldIdentifier] ?? "")),
    );
  }, [article, editedContent, fieldIdentifier, resetSignal]);

  const handleChange = (newTags: string[]) => {
    const normalizedTags = newTags.map((tag) => tag.trim()).filter(Boolean);
    setTags(normalizedTags);
    dispatch(
      setEditedContentByID({
        world: { id: world.id },
        articleID: article.id,
        fieldIdentifier,
        editedFields: normalizedTags.join(","),
      }),
    );
  };

  return (
    <TagsInput
      className="article-tags-input react-tagsinput form-control"
      value={tags}
      onChange={handleChange}
      inputProps={{
        name: fieldIdentifier,
        placeholder: "Enter tags",
      }}
      addOnBlur
      addKeys={["Tab", ","]}
      addOnPaste
      pasteSplit={(data) => data.split(",").map((tag) => tag.trim())}
    />
  );
};

export default ArticleTagsInput;
