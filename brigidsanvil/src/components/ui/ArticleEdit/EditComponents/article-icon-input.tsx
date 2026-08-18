import { Article } from "@/components/types/article";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { World } from "@/components/types/world";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditableIcons from "../../Table/EditableComponents/editable-icons";
import DebouncedInput from "./debounced-input";

type ArticleIconInputProps = {
  world: World;
  article: Article;
  fieldIdentifier: string;
};

const ArticleIconInput = ({
  world,
  article,
  fieldIdentifier,
}: ArticleIconInputProps) => {
  const dispatch = useDispatch();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const selectEditedContentValueByID = useMemo(
    () =>
      makeSelectEditedContentValueByID(world.id, article.id, fieldIdentifier),
    [world.id, article.id, fieldIdentifier],
  );
  const editedValue = useSelector(selectEditedContentValueByID);
  const value = String(editedValue ?? article[fieldIdentifier] ?? "");

  const handlePickerSave = (newIcon: string) => {
    dispatch(
      setEditedContentByID({
        world: { id: world.id },
        articleID: article.id,
        fieldIdentifier,
        editedFields: newIcon,
      }),
    );
  };

  return (
    <>
      <InputGroup>
        <DebouncedInput
          world={world}
          article={article}
          fieldIdentifier={fieldIdentifier}
        />
        <Button
          variant="secondary"
          onClick={() => setIsPickerOpen(true)}
          title="Choose an icon"
          aria-label="Choose an icon"
        >
          <FontAwesomeIcon icon={faIcons} />
        </Button>
      </InputGroup>
      <EditableIcons
        value={value}
        onSave={handlePickerSave}
        editing={isPickerOpen}
        setEditing={setIsPickerOpen}
        hideTrigger
      />
    </>
  );
};

export default ArticleIconInput;
