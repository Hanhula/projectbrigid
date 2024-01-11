import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

import {
  selectWorldArticlesByWorld,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { Article } from "@/components/types/article";
import { selectStyles } from "@/components/types/component-types/select-styles";

const DebouncedDropdown = ({
  entityClass,
  fieldIdentifier,
  world,
  article,
  isMulti = false,
}: {
  entityClass: string[];
  fieldIdentifier: string;
  world: World;
  article: Article;
  isMulti?: boolean;
}) => {
  const dispatch = useDispatch();
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const options = currentArticles
    .filter((a) => entityClass.includes(a.entityClass))
    .map((a) => ({ value: a.id, label: a.title }));

  let initialValue;

  if (Array.isArray(article[fieldIdentifier])) {
    for (let obj of article[fieldIdentifier]) {
      initialValue = options.find((option) => option.value === obj.id);
      if (initialValue) break;
    }
  } else {
    if(article[fieldIdentifier] === undefined || article[fieldIdentifier] === null) {return}
    initialValue = options.find(
      (option) => option.value === article[fieldIdentifier].id
    );
  }

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

  interface SelectedOption {
    value: string;
    label: string;
  }

  type SelectedOptionType = SelectedOption | null;
  type MultiSelectedOptionType = ReadonlyArray<SelectedOption>;

  function isSingleOption(
    value: SelectedOptionType | MultiSelectedOptionType
  ): value is SelectedOptionType {
    return !Array.isArray(value);
  }

  const handleChange = (
    selectedOption: SelectedOptionType | MultiSelectedOptionType
  ) => {
    if (Array.isArray(selectedOption)) {
      // Multi-select scenario
      const selectedValues = selectedOption.map((option) => ({
        id: option.value.toString(),
      }));
      delayedDispatch(selectedValues);
    } else if (selectedOption && isSingleOption(selectedOption)) {
      // Single select scenario
      delayedDispatch({ id: selectedOption.value.toString() });
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={initialValue}
      styles={selectStyles}
      isMulti={isMulti}
    />
  );
};

export default DebouncedDropdown;
