import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { Article } from "@/components/types/article";
import { Form } from "react-bootstrap";

export interface DebouncedCheckboxProps {
  world: World;
  article: Article;
  fieldIdentifier: string;
  label?: string;
  id?: string;
  header?: string;
}

const DebouncedCheckbox: React.FC<DebouncedCheckboxProps> = ({
  world,
  article,
  fieldIdentifier,
  label,
  id,
  header,
}) => {
  const dispatch = useDispatch();
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedContentValue = useSelector(selectEditedContentValueByID);
  const checked =
    typeof editedContentValue === "boolean"
      ? editedContentValue
      : Boolean(article[fieldIdentifier]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setEditedContentByID({
        world: { id: world.id },
        articleID: article.id,
        fieldIdentifier,
        editedFields: event.target.checked,
      }),
    );
  };

  return (
    <>
      {header && <Form.Label>{header}</Form.Label>}
      <Form.Check
        id={id}
        type="checkbox"
        label={label}
        checked={checked}
        onChange={handleChange}
      />
    </>
  );
};

export default DebouncedCheckbox;
