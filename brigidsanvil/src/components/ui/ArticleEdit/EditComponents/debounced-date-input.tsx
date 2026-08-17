import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { Article } from "@/components/types/article";
import { WorldAnvilDate } from "@/components/types/date";
import { Form } from "react-bootstrap";

export interface DebouncedDateInputProps {
  world: World;
  article: Article;
  fieldIdentifier: string;
  id?: string;
}

// The API returns dates nested as { date, timezone, timezone_type }, but rejects that shape on
// write (500 Invalid JSON response) - it only accepts the plain "YYYY-MM-DD" date string.
type DateFieldValue = WorldAnvilDate | string | null | undefined;

const rawDateString = (value: DateFieldValue): string | undefined =>
  typeof value === "string" ? value : value?.date;

// WorldAnvil dates look like "2026-08-17 11:40:14.000000"; <input type="date"> wants "2026-08-17"
const toInputValue = (value: DateFieldValue): string => {
  const match = rawDateString(value)?.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
};

const toApiDateString = (inputValue: string): string | null => {
  return inputValue || null;
};

const DebouncedDateInput: React.FC<DebouncedDateInputProps> = ({
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
  const editedContentValue = useSelector(
    selectEditedContentValueByID,
  ) as DateFieldValue;

  const currentValue: DateFieldValue =
    editedContentValue !== undefined
      ? editedContentValue
      : (article[fieldIdentifier] as DateFieldValue);

  const [inputValue, setInputValue] = useState<string>(
    toInputValue(currentValue),
  );

  const delayedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(
          setEditedContentByID({
            world: { id: world.id },
            articleID: article.id,
            fieldIdentifier,
            editedFields: toApiDateString(value),
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

  // Update local state when editedContent or the underlying article value changes
  useEffect(() => {
    const nextValue = toInputValue(currentValue);
    setInputValue((previousValue) =>
      previousValue === nextValue ? previousValue : nextValue,
    );
  }, [currentValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    delayedDispatch(newValue);
  };

  return (
    <Form.Control
      id={id}
      type="date"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={() => delayedDispatch.flush()}
    />
  );
};

export default DebouncedDateInput;
