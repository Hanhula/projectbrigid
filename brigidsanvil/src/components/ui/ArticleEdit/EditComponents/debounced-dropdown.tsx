import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

import {
  makeSelectEditedContentByID,
  selectWorldArticlesByWorld,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { Article } from "@/components/types/article";

const DebouncedDropdown = ({
  entityClass,
  fieldIdentifier,
  world,
  article,
}: {
  entityClass: string[];
  fieldIdentifier: string;
  world: World;
  article: Article;
}) => {
  const dispatch = useDispatch();
  const selectEditedContentByID = makeSelectEditedContentByID(
    world.id,
    article.id,
    fieldIdentifier
  );
  const editedContent = useSelector(selectEditedContentByID);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const options = currentArticles
    .filter((a) => entityClass.includes(a.entityClass))
    .map((a) => ({ value: a.id, label: a.title }));
  console.log(currentArticles);

  const initialValue = options.find(
    (option) => option.value === article[fieldIdentifier]
  );

  const delayedDispatch = debounce((value) => {
    dispatch(
      setEditedContentByID({
        world: world,
        articleID: article.id,
        fieldIdentifier,
        editedFields: value,
      })
    );
  }, 2000);

  const handleChange = (selectedOption) => {
    delayedDispatch(selectedOption.value);
  };

  return (
    <Select options={options} onChange={handleChange} value={initialValue} />
  );
};

export default DebouncedDropdown;
