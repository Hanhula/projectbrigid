import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, memo } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function EditableCell({
  value: initialValue,
  onSave,
  editing,
  setEditing,
  isTruncated,
  isDisabled,
  showTooltip = false,
  tooltipContent,
  ...props
}: {
  value: string;
  onSave: (newValues: string) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
  isTruncated?: boolean;
  isDisabled?: boolean;
  showTooltip?: boolean;
  tooltipContent?: React.JSX.Element | string;
}) {
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(editedValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(initialValue);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="editing">
      {editing ? (
        <div className="cell-editing">
          <div className="input-group">
            <textarea
              className="cell-edit form-control"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={255}
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
          {showTooltip ? (
            <OverlayTrigger
              overlay={<Tooltip id={`tooltip`}>{tooltipContent}</Tooltip>}
            >
              <div
                className={
                  isTruncated ? "excerpt-text text-truncate" : "excerpt-text"
                }
                {...props}
              >
                {editedValue}
              </div>
            </OverlayTrigger>
          ) : (
            <div
              className={
                isTruncated ? "excerpt-text text-truncate" : "excerpt-text"
              }
              {...props}
            >
              {editedValue}
            </div>
          )}
          <Button
            variant="primary"
            className="cell-edit"
            onClick={handleEdit}
            disabled={isDisabled}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(EditableCell);
