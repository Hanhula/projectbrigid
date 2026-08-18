import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { Article } from "@/components/types/article";
import { Form } from "react-bootstrap";
import { Person } from "@/components/types/article-types/person";

export interface DebouncedInputProps {
  world: World;
  article: Article | Person;
  fieldIdentifier: string;
  id?: string;
  type?: "text" | "number";
  valueAsReference?: boolean;
}

const getReferenceId = (value: unknown) =>
  typeof value === "object" && value !== null && "id" in value
    ? String((value as { id: unknown }).id)
    : String(value ?? "");

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  world,
  article,
  fieldIdentifier,
  id,
  type = "text",
  valueAsReference = false,
}) => {
  const dispatch = useDispatch();
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContentValue = useSelector(selectEditedContentValueByID);
  const editedContent = valueAsReference
    ? editedContentValue !== undefined
      ? getReferenceId(editedContentValue)
      : undefined
    : typeof editedContentValue === "string"
    ? editedContentValue
    : undefined;

  const [inputValue, setInputValue] = useState<string>(
    valueAsReference
      ? getReferenceId(editedContentValue ?? article[fieldIdentifier])
      : String(editedContent ?? article[fieldIdentifier] ?? ""),
  );

  // Create memoized debounced dispatch function
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

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      delayedDispatch.flush();
      delayedDispatch.cancel();
    };
  }, [delayedDispatch]);

  // Update local state when editedContent or the underlying article value changes
  useEffect(() => {
    const nextValue = valueAsReference
      ? getReferenceId(editedContentValue ?? article[fieldIdentifier])
      : String(editedContent ?? article[fieldIdentifier] ?? "");
    setInputValue((previousValue) =>
      previousValue === nextValue ? previousValue : nextValue,
    );
  }, [
    editedContent,
    editedContentValue,
    article,
    fieldIdentifier,
    valueAsReference,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    delayedDispatch(newValue);
  };

  return (
    <Form.Control
      id={id}
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={() => delayedDispatch.flush()}
    />
  );
};

export default DebouncedInput;
