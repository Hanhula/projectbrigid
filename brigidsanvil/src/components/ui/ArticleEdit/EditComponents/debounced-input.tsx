import React, { useState, useEffect } from "react";
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

interface DebouncedInputProps {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    delayedDispatch(event.target.value);
  };

  return (
    <Form.Control type="text" value={inputValue} onChange={handleInputChange} />
  );
};

export default DebouncedInput;
