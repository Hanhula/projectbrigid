import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Layers, X } from "lucide-react";
import { Folder } from "@/components/types/folder";
import { IMAGE_FOLDER_ROOT_ID } from "@/components/store/foldersSlice";
import TagsField from "@/components/ui/Common/tags-field";

export type BulkTagMode = "add" | "remove" | "replace";

type ImageBulkToolbarProps = {
  selectedCount: number;
  maxBatchSize: number;
  folders: Folder[];
  isProcessing: boolean;
  progress: { completed: number; total: number } | null;
  onClearSelection: () => void;
  onApplyTags: (mode: BulkTagMode, tagsValue: string) => void;
  onMoveToFolder: (folderId: string) => void;
};

export default function ImageBulkToolbar({
  selectedCount,
  maxBatchSize,
  folders,
  isProcessing,
  progress,
  onClearSelection,
  onApplyTags,
  onMoveToFolder,
}: ImageBulkToolbarProps) {
  const [tagsMode, setTagsMode] = useState<BulkTagMode>("add");
  const [tagsValue, setTagsValue] = useState("");
  const [moveFolderId, setMoveFolderId] = useState(IMAGE_FOLDER_ROOT_ID);

  const isOverLimit = selectedCount > maxBatchSize;
  const isDisabled = isProcessing || isOverLimit;

  const handleApplyTags = () => {
    if (isDisabled || (tagsMode !== "replace" && tagsValue.trim() === "")) {
      return;
    }
    onApplyTags(tagsMode, tagsValue);
    setTagsValue("");
  };

  return (
    <div className="image-bulk-toolbar mb-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        <span className="d-flex align-items-center gap-2 fw-semibold">
          <Layers size={16} aria-hidden="true" />
          {`${selectedCount} image${selectedCount === 1 ? "" : "s"} selected`}
        </span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onClearSelection}
          disabled={isProcessing}
        >
          <X size={14} aria-hidden="true" className="me-1" />
          Clear selection
        </Button>
      </div>

      {isOverLimit && (
        <Alert variant="warning" className="py-2">
          {`Bulk actions are limited to ${maxBatchSize} images at a time to avoid overloading WorldAnvil. Deselect ${
            selectedCount - maxBatchSize
          } image${selectedCount - maxBatchSize === 1 ? "" : "s"} to continue.`}
        </Alert>
      )}

      {isProcessing && progress && (
        <div className="d-flex align-items-center gap-2 mb-2">
          <Spinner animation="border" size="sm" role="status" />
          <span className="text-muted small">
            {`Applying: ${progress.completed} of ${progress.total}`}
          </span>
        </div>
      )}

      <div className="image-bulk-toolbar-row">
        <Form.Select
          size="sm"
          value={tagsMode}
          disabled={isDisabled}
          onChange={(event) => setTagsMode(event.target.value as BulkTagMode)}
          className="image-bulk-tag-mode"
        >
          <option value="add">Add tags</option>
          <option value="remove">Remove tags</option>
          <option value="replace">Replace tags</option>
        </Form.Select>
        <div className="image-bulk-tags-input">
          <TagsField value={tagsValue} onChange={setTagsValue} />
        </div>
        <Button
          variant="primary"
          size="sm"
          disabled={isDisabled}
          onClick={handleApplyTags}
        >
          Apply
        </Button>
      </div>

      <div className="image-bulk-toolbar-row">
        <Form.Select
          size="sm"
          value={moveFolderId}
          disabled={isDisabled}
          onChange={(event) => setMoveFolderId(event.target.value)}
          className="image-bulk-folder-select"
        >
          <option value={IMAGE_FOLDER_ROOT_ID}>Unsorted / world root</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.title}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="secondary"
          size="sm"
          disabled={isDisabled}
          onClick={() => onMoveToFolder(moveFolderId)}
        >
          Move to folder
        </Button>
      </div>
    </div>
  );
}
