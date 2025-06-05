import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  makeSelectEditedContentByID,
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
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  world,
  article,
  fieldIdentifier,
}) => {
  const dispatch = useDispatch();
  const selectEditedContentByID = makeSelectEditedContentByID(
    world.id,
    article.id,
    fieldIdentifier
  );
  const editedContent = useSelector(selectEditedContentByID);

  const [inputValue, setInputValue] = useState(
    editedContent || article[fieldIdentifier] || ""
  );

  // Create memoized debounced dispatch function
  const delayedDispatch = useCallback(
    debounce((value: string) => {
      dispatch(
        setEditedContentByID({
          world: world,
          articleID: article.id,
          fieldIdentifier,
          editedFields: value,
        })
      );
    }, 500), // Reduced from 2000ms to 500ms for better responsiveness
    [world.id, article.id, fieldIdentifier]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      delayedDispatch.cancel();
    };
  }, [delayedDispatch]);

  // Update local state when editedContent changes
  useEffect(() => {
    if (editedContent !== undefined && editedContent !== inputValue) {
      setInputValue(editedContent);
    }
  }, [editedContent]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    delayedDispatch(newValue);
  };

  return (
    <Form.Control type="text" value={inputValue} onChange={handleInputChange} />
  );
};

export default DebouncedInput;
