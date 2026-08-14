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
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  world,
  article,
  fieldIdentifier,
  id,
}) => {
  const dispatch = useDispatch();
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContentValue = useSelector(selectEditedContentValueByID);
  const editedContent =
    typeof editedContentValue === "string" ? editedContentValue : undefined;

  const [inputValue, setInputValue] = useState<string>(
    String(editedContent ?? article[fieldIdentifier] ?? ""),
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

  // Update local state when editedContent changes
  useEffect(() => {
    if (editedContent !== undefined) {
      setInputValue((previousValue) =>
        previousValue === editedContent ? previousValue : editedContent,
      );
    }
  }, [editedContent]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    delayedDispatch(newValue);
  };

  return (
    <Form.Control
      id={id}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={() => delayedDispatch.flush()}
    />
  );
};

export default DebouncedInput;
