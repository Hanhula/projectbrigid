import {
  faCheck,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TagsField from "@/components/ui/Common/tags-field";

function EditableTags({
  value: initialValue,
  onSave,
}: {
  value: string;
  onSave: (newValues: string) => void;
}) {
  const [tagsValue, setTagsValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(tagsValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setTagsValue(initialValue);
    setEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="editing">
      {editing ? (
        <div className="cell-editing">
          <div className="input-group">
            <TagsField
              value={tagsValue}
              onChange={setTagsValue}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className="cell-edit-buttons">
            <Button
              variant="success"
              className="cell-save"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button
              variant="danger"
              className="cell-cancel"
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {initialValue.split(",").map((tag, index) => (
            <span key={index} className="badge text-bg-secondary">
              {tag}
            </span>
          ))}
          <Button variant="primary" className="cell-edit" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default EditableTags;
