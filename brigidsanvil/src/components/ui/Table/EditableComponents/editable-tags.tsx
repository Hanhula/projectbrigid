import {
  faCheck,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TagsInput from "react-tagsinput";

function EditableTags({
  value: initialValue,
  onSave,
}: {
  value: string;
  onSave: (newValues: string) => void;
}) {
  const [tags, setTags] = useState(
    initialValue.split(",").filter((tag) => tag.trim() !== "")
  );
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const newTagsString = tags.join(",");
    onSave(newTagsString);
    setEditing(false);
  };

  const handleCancel = () => {
    setTags(initialValue.split(",").filter((tag) => tag.trim() !== ""));
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
            <TagsInput
              className="react-tagsinput form-control"
              value={tags}
              onChange={setTags}
              inputProps={{
                name: "tags",
                placeholder: "Enter tags",
                onKeyUp: handleKeyUp,
              }}
              addOnBlur={true}
              addKeys={["Tab", ","]}
              addOnPaste={true}
              pasteSplit={(data) => {
                return data.split(",").map((d) => d.trim());
              }}
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
