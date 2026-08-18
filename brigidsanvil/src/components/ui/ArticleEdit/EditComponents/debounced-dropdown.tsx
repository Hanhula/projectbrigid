import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { useState, useEffect, useMemo } from "react";
import {
  makeSelectEditedContentValueByID,
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
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContent = useSelector(selectEditedContentValueByID);

  if (!article || article === undefined || article === null) {
    return null; // Return null instead of undefined
  }

  const options = useMemo(
    () =>
      currentArticles
        .filter((a) => entityClass.includes(a.entityClass))
        .map((a) => ({ value: a.id, label: a.title })),
    [currentArticles, entityClass],
  );

  const optionsById = useMemo(
    () =>
      options.reduce<Record<string, { value: string; label: string }>>(
        (acc, option) => {
          acc[option.value] = option;
          return acc;
        },
        {},
      ),
    [options],
  );

  // Calculate current value from edited content first, then fallback to article data.
  const getInitialValue = () => {
    const fieldValue = editedContent ?? article[fieldIdentifier];

    if (!fieldValue || fieldValue === null || fieldValue === undefined) {
      return isMulti ? [] : null;
    } else if (Array.isArray(fieldValue)) {
      return fieldValue.map((item) => optionsById[item.id]).filter(Boolean);
    } else {
      const targetId =
        typeof fieldValue === "object" && fieldValue.id
          ? fieldValue.id
          : fieldValue;

      return optionsById[targetId] || null;
    }
  };

  // Use local state to control the dropdown value
  const [currentValue, setCurrentValue] = useState(() => getInitialValue());

  // Update local state when edited content, article data, or options change.
  useEffect(() => {
    const articleValue = getInitialValue();
    setCurrentValue(articleValue);
  }, [editedContent, article[fieldIdentifier], optionsById, isMulti]);

  const delayedDispatch = useMemo(
    () =>
      debounce((value: any) => {
        dispatch(
          setEditedContentByID({
            world: { id: world.id },
            articleID: article.id,
            fieldIdentifier,
            editedFields: value,
          }),
        );
      }, 500),
    [dispatch, world.id, article.id, fieldIdentifier],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      delayedDispatch.flush();
      delayedDispatch.cancel();
    };
  }, [delayedDispatch]);

  interface OptionType {
    value: string;
    label: string;
  }

  const handleChange = (newValue: any) => {
    // Immediately update local state for responsive UI
    setCurrentValue(newValue);

    if (isMulti) {
      if (Array.isArray(newValue)) {
        const selectedValues = newValue.map((option: OptionType) => ({
          id: option.value.toString(),
        }));
        delayedDispatch(selectedValues);
      } else {
        delayedDispatch([]);
      }
    } else {
      if (newValue && newValue.value) {
        const selectedValue = { id: newValue.value.toString() };
        delayedDispatch(selectedValue);
      } else {
        delayedDispatch(null);
      }
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      onBlur={() => delayedDispatch.flush()}
      value={currentValue}
      styles={selectStyles}
      isMulti={isMulti}
      isClearable={!isMulti}
    />
  );
};

export default DebouncedDropdown;
