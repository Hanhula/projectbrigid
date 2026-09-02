import { useRef, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import {
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAppSelector } from "@/components/store/store";
import { selectWorld } from "@/components/store/apiSlice";
import {
  IMAGE_FOLDER_ROOT_ID,
  UNSORTED_FOLDER_ID,
  selectFolderTreeByWorld,
} from "@/components/store/foldersSlice";
import { Folder } from "@/components/types/folder";
import { useWorldAnvilImagesAPI } from "@/components/api/worldanvil-images";
import ConfirmModal from "@/components/ui/ConfirmModal/confirm-modal";
import { addNotification } from "@/components/store/notificationsSlice";
import { useDispatch } from "react-redux";

type ImageFolderTreeProps = {
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
};

type FolderNodeProps = {
  folder: Folder;
  depth: number;
  childrenByParent: Record<string, Folder[]>;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onRequestRename: (folder: Folder) => void;
  onRequestDelete: (folder: Folder) => void;
  onRequestAddChild: (folder: Folder) => void;
};

function FolderNode({
  folder,
  depth,
  childrenByParent,
  selectedFolderId,
  onSelectFolder,
  onRequestRename,
  onRequestDelete,
  onRequestAddChild,
}: FolderNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const children = childrenByParent[folder.id] ?? [];

  return (
    <>
      <ListGroup.Item
        action
        active={selectedFolderId === folder.id}
        onClick={() => onSelectFolder(folder.id)}
        style={{ paddingLeft: `${1 + depth * 1.25}rem` }}
        className="d-flex align-items-center justify-content-between"
      >
        <span className="d-flex align-items-center gap-1">
          {children.length > 0 ? (
            <button
              type="button"
              className="btn btn-sm btn-link p-0"
              aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
              onClick={(event) => {
                event.stopPropagation();
                setIsExpanded((value) => !value);
              }}
            >
              {isExpanded ? (
                <ChevronDown size={14} aria-hidden="true" />
              ) : (
                <ChevronRight size={14} aria-hidden="true" />
              )}
            </button>
          ) : (
            <span style={{ display: "inline-block", width: 14 }} />
          )}
          {folder.title}
        </span>
        <span className="d-flex gap-1">
          <Button
            variant="outline-secondary"
            size="sm"
            title={`Add subfolder to ${folder.title}`}
            aria-label={`Add subfolder to ${folder.title}`}
            onClick={(event) => {
              event.stopPropagation();
              onRequestAddChild(folder);
            }}
          >
            <FolderPlus size={14} aria-hidden="true" />
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            title={`Rename ${folder.title}`}
            aria-label={`Rename ${folder.title}`}
            onClick={(event) => {
              event.stopPropagation();
              onRequestRename(folder);
            }}
          >
            <Pencil size={14} aria-hidden="true" />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            title={`Delete ${folder.title}`}
            aria-label={`Delete ${folder.title}`}
            onClick={(event) => {
              event.stopPropagation();
              onRequestDelete(folder);
            }}
          >
            <Trash2 size={14} aria-hidden="true" />
          </Button>
        </span>
      </ListGroup.Item>
      {isExpanded &&
        children.map((child) => (
          <FolderNode
            key={child.id}
            folder={child}
            depth={depth + 1}
            childrenByParent={childrenByParent}
            selectedFolderId={selectedFolderId}
            onSelectFolder={onSelectFolder}
            onRequestRename={onRequestRename}
            onRequestDelete={onRequestDelete}
            onRequestAddChild={onRequestAddChild}
          />
        ))}
    </>
  );
}

export default function ImageFolderTree({
  selectedFolderId,
  onSelectFolder,
}: ImageFolderTreeProps) {
  const dispatch = useDispatch();
  const world = useAppSelector(selectWorld);
  const childrenByParent = useAppSelector(selectFolderTreeByWorld(world.id));
  const worldAnvilImagesAPI = useWorldAnvilImagesAPI();

  const [newFolderParent, setNewFolderParent] = useState<Folder | null>(null);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const newFolderInputRef = useRef<HTMLInputElement>(null);
  const [renamingFolder, setRenamingFolder] = useState<Folder | null>(null);
  const [renameTitle, setRenameTitle] = useState("");
  const [folderPendingDelete, setFolderPendingDelete] = useState<Folder | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const rootFolders = childrenByParent[IMAGE_FOLDER_ROOT_ID] ?? [];

  const handleCreateFolder = async () => {
    const title = newFolderTitle.trim();
    if (!title) {
      return;
    }

    try {
      await worldAnvilImagesAPI.createFolder(
        title,
        newFolderParent?.id ?? undefined,
      );
      setNewFolderTitle("");
      setNewFolderParent(null);
      dispatch(addNotification(`Folder "${title}" created.`, "success"));
    } catch (error) {
      console.error("Error creating folder:", error);
      dispatch(addNotification("Unable to create folder.", "danger"));
    }
  };

  const handleRename = async () => {
    if (!renamingFolder) {
      return;
    }

    const title = renameTitle.trim();
    if (!title) {
      return;
    }

    try {
      await worldAnvilImagesAPI.updateFolder(renamingFolder.id, { title });
      dispatch(addNotification("Folder renamed.", "success"));
    } catch (error) {
      console.error("Error renaming folder:", error);
      dispatch(addNotification("Unable to rename folder.", "danger"));
    } finally {
      setRenamingFolder(null);
      setRenameTitle("");
    }
  };

  const handleConfirmDelete = async () => {
    if (!folderPendingDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      await worldAnvilImagesAPI.deleteFolder(folderPendingDelete.id);
      if (selectedFolderId === folderPendingDelete.id) {
        onSelectFolder(null);
      }
      dispatch(addNotification("Folder deleted.", "success"));
    } catch (error) {
      console.error("Error deleting folder:", error);
      dispatch(addNotification("Unable to delete folder.", "danger"));
    } finally {
      setIsDeleting(false);
      setFolderPendingDelete(null);
    }
  };

  return (
    <div className="image-folder-tree">
      <ListGroup className="mb-2">
        <ListGroup.Item
          action
          active={selectedFolderId === null}
          onClick={() => onSelectFolder(null)}
        >
          All Images
        </ListGroup.Item>
        <ListGroup.Item
          action
          active={selectedFolderId === UNSORTED_FOLDER_ID}
          onClick={() => onSelectFolder(UNSORTED_FOLDER_ID)}
        >
          Unsorted
        </ListGroup.Item>
        {rootFolders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            depth={0}
            childrenByParent={childrenByParent}
            selectedFolderId={selectedFolderId}
            onSelectFolder={onSelectFolder}
            onRequestRename={(target) => {
              setRenamingFolder(target);
              setRenameTitle(target.title);
            }}
            onRequestDelete={setFolderPendingDelete}
            onRequestAddChild={(target) => {
              setNewFolderParent(target);
              newFolderInputRef.current?.focus();
              newFolderInputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
          />
        ))}
      </ListGroup>
      <Form
        className="d-flex flex-column gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void handleCreateFolder();
        }}
      >
        {newFolderParent && (
          <div className="text-muted small">
            {`Creating subfolder in "${newFolderParent.title}"`}
          </div>
        )}
        <div className="d-flex gap-2">
          <Form.Control
            ref={newFolderInputRef}
            size="sm"
            placeholder={
              newFolderParent ? "New subfolder name" : "New root folder name"
            }
            value={newFolderTitle}
            onChange={(event) => setNewFolderTitle(event.target.value)}
          />
          <Button type="submit" size="sm" variant="primary">
            Add
          </Button>
          {newFolderParent && (
            <Button
              type="button"
              size="sm"
              variant="outline-secondary"
              onClick={() => setNewFolderParent(null)}
              title="Create at root instead"
            >
              Root
            </Button>
          )}
        </div>
      </Form>

      <ConfirmModal
        show={renamingFolder !== null}
        title="Rename folder"
        confirmLabel="Rename"
        confirmVariant="primary"
        body={
          <Form.Control
            autoFocus
            value={renameTitle}
            onChange={(event) => setRenameTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void handleRename();
              }
            }}
          />
        }
        onConfirm={() => void handleRename()}
        onCancel={() => setRenamingFolder(null)}
      />

      <ConfirmModal
        show={folderPendingDelete !== null}
        title="Delete folder?"
        confirmLabel="Delete Folder"
        isConfirming={isDeleting}
        body={
          <>
            Delete &quot;{folderPendingDelete?.title}&quot;? This does not
            delete the images inside it, but this action cannot be undone.
          </>
        }
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setFolderPendingDelete(null)}
      />
    </div>
  );
}
