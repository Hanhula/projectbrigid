import { Article } from "@/components/types/article";
import { World } from "@/components/types/world";
import {
  setEditedContentByID,
  makeSelectEditedContentValueByID,
} from "@/components/store/articlesSlice";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export type FieldDropdownOption = string | { value: string; label: string };

export type DebouncedFieldDropdownProps = {
  world: World;
  article: Article;
  fieldIdentifier: string;
  options: FieldDropdownOption[];
  id: string;
  valueAsReference?: boolean;
};

const getOptionValue = (option: FieldDropdownOption) =>
  typeof option === "string" ? option : option.value;

const getOptionLabel = (option: FieldDropdownOption) =>
  typeof option === "string" ? option : option.label;

const DebouncedFieldDropdown = ({
  world,
  article,
  fieldIdentifier,
  options,
  id,
  valueAsReference = false,
}: DebouncedFieldDropdownProps) => {
  const dispatch = useDispatch();
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContent = useSelector(selectEditedContentValueByID);
  const articleValue = article[fieldIdentifier];
  const getCurrentValue = (value: unknown) =>
    typeof value === "object" && value !== null && "id" in value
      ? String(value.id)
      : String(value ?? "");
  const [currentValue, setCurrentValue] = useState(
    getCurrentValue(editedContent ?? articleValue),
  );

  useEffect(() => {
    const nextValue = editedContent ?? article[fieldIdentifier] ?? "";
    setCurrentValue(getCurrentValue(nextValue));
  }, [editedContent, article, fieldIdentifier]);

  const delayedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(
          setEditedContentByID({
            world: { id: world.id },
            articleID: article.id,
            fieldIdentifier,
            editedFields: valueAsReference && value ? { id: value } : value,
          }),
        );
      }, 500),
    [dispatch, world.id, article.id, fieldIdentifier, valueAsReference],
  );

  useEffect(() => {
    return () => {
      delayedDispatch.flush();
      delayedDispatch.cancel();
    };
  }, [delayedDispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value;
    setCurrentValue(nextValue);
    delayedDispatch(nextValue);
  };

  return (
    <Form.Select
      id={id}
      value={currentValue}
      onChange={handleChange}
      onBlur={() => delayedDispatch.flush()}
      aria-label={fieldIdentifier}
    >
      <option value="">Select an option</option>
      {options.map((option) => {
        const value = getOptionValue(option);
        return (
          <option key={value} value={value}>
            {getOptionLabel(option)}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default DebouncedFieldDropdown;
