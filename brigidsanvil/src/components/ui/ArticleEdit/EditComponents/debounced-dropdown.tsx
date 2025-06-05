import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { useState, useEffect, useMemo, useCallback } from "react";
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

  if (!article || article === undefined || article === null) {
    console.log("No article chosen!");
    return null; // Return null instead of undefined
  }

  const options = currentArticles
    .filter((a) => entityClass.includes(a.entityClass))
    .map((a) => ({ value: a.id, label: a.title }));

  // Calculate initial value from article data
  const getInitialValueFromArticle = () => {
    const fieldValue = article[fieldIdentifier];

    console.log(`[${fieldIdentifier}] Field value:`, fieldValue);

    if (!fieldValue || fieldValue === null || fieldValue === undefined) {
      return isMulti ? [] : null;
    } else if (Array.isArray(fieldValue)) {
      return fieldValue
        .map((item) => options.find((option) => option.value === item.id))
        .filter(Boolean);
    } else {
      const targetId =
        typeof fieldValue === "object" && fieldValue.id
          ? fieldValue.id
          : fieldValue;

      return options.find((option) => option.value === targetId) || null;
    }
  };

  // Use local state to control the dropdown value
  const [currentValue, setCurrentValue] = useState(() =>
    getInitialValueFromArticle()
  );

  // Update local state when article data changes (from Redux)
  useEffect(() => {
    const articleValue = getInitialValueFromArticle();
    setCurrentValue(articleValue);
  }, [article[fieldIdentifier], options.length]); // Re-run when field value or options change

  const delayedDispatch = useCallback(
    debounce((value: any) => {
      dispatch(
        setEditedContentByID({
          world: world,
          articleID: article.id,
          fieldIdentifier,
          editedFields: value,
        })
      );
    }, 500), // Reduced from 2000ms to 500ms
    [world.id, article.id, fieldIdentifier]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      delayedDispatch.cancel();
    };
  }, [delayedDispatch]);

  interface OptionType {
    value: string;
    label: string;
  }

  const handleChange = (newValue: any) => {
    console.log(`[${fieldIdentifier}] Selection changed to:`, newValue);

    // Immediately update local state for responsive UI
    setCurrentValue(newValue);

    if (isMulti) {
      if (Array.isArray(newValue)) {
        const selectedValues = newValue.map((option: OptionType) => ({
          id: option.value.toString(),
        }));
        console.log(
          `[${fieldIdentifier}] Dispatching multi-select:`,
          selectedValues
        );
        delayedDispatch(selectedValues);
      } else {
        console.log(`[${fieldIdentifier}] Dispatching empty multi-select`);
        delayedDispatch([]);
      }
    } else {
      if (newValue && newValue.value) {
        const selectedValue = { id: newValue.value.toString() };
        console.log(
          `[${fieldIdentifier}] Dispatching single-select:`,
          selectedValue
        );
        delayedDispatch(selectedValue);
      } else {
        console.log(`[${fieldIdentifier}] Dispatching null selection`);
        delayedDispatch(null);
      }
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentValue}
      styles={selectStyles}
      isMulti={isMulti}
      isClearable={!isMulti}
    />
  );
};

export default DebouncedDropdown;
