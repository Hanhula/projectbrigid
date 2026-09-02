import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  OverlayTrigger,
  Pagination,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import {
  ChevronDown,
  ChevronUp,
  Folder as FolderIcon,
  Upload,
} from "lucide-react";
import { useAppSelector } from "@/components/store/store";
import { selectWorld } from "@/components/store/apiSlice";
import {
  selectImageFetchProgress,
  selectImagesByWorld,
  selectIsLoadingImages,
} from "@/components/store/imagesSlice";
import {
  IMAGE_FOLDER_ROOT_ID,
  UNSORTED_FOLDER_ID,
  selectFoldersByWorld,
} from "@/components/store/foldersSlice";
import { useWorldAnvilImagesAPI } from "@/components/api/worldanvil-images";
import { addNotification } from "@/components/store/notificationsSlice";
import { Image, ImageUpdate } from "@/components/types/image";
import { tagsFromValue } from "@/components/ui/Common/tags-field";
import ImageFolderTree from "./image-folder-tree";
import ImageGrid from "./image-grid";
import ImageDetailPanel from "./image-detail-panel";
import ImageBulkToolbar, { BulkTagMode } from "./image-bulk-toolbar";
import ConfirmModal from "@/components/ui/ConfirmModal/confirm-modal";

import "./image-manager.scss";

const PAGE_SIZE = 50;
const MAX_BULK_BATCH_SIZE = 50;
const BULK_THROTTLE_DELAY_MS = 200;

function imageMatchesQuery(image: Image, query: string) {
  const haystack = [
    image.title,
    image.tags,
    image.description,
    image.alt,
    image.creditArtistName,
    image.creditArtTitle,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export default function ImageManager() {
  const dispatch = useDispatch();
  const world = useAppSelector(selectWorld);
  const images = useAppSelector(selectImagesByWorld(world.id));
  const folders = useAppSelector(selectFoldersByWorld(world.id));
  const isLoadingImages = useAppSelector(selectIsLoadingImages);
  const imageFetchProgress = useAppSelector(selectImageFetchProgress);
  const worldAnvilImagesAPI = useWorldAnvilImagesAPI();

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isFolderTreeExpanded, setIsFolderTreeExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [syncingImageId, setSyncingImageId] = useState<string | null>(null);
  const [imagePendingDelete, setImagePendingDelete] = useState<Image | null>(
    null,
  );
  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const [checkedImageIds, setCheckedImageIds] = useState<Set<string>>(
    new Set(),
  );
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{
    completed: number;
    total: number;
  } | null>(null);

  const folderFilteredImages =
    selectedFolderId === null
      ? images
      : selectedFolderId === UNSORTED_FOLDER_ID
      ? images.filter(
          (image) => !image.folderId || image.folderId === IMAGE_FOLDER_ROOT_ID,
        )
      : images.filter((image) => image.folderId === selectedFolderId);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleImages = useMemo(() => {
    if (!normalizedQuery) {
      return folderFilteredImages;
    }
    return folderFilteredImages.filter((image) =>
      imageMatchesQuery(image, normalizedQuery),
    );
  }, [folderFilteredImages, normalizedQuery]);

  const totalPages = Math.max(1, Math.ceil(visibleImages.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(0);
    setSelectedIndex(null);
    setCheckedImageIds(new Set());
  }, [selectedFolderId, normalizedQuery]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    setCheckedImageIds(new Set());
  }, [currentPage]);

  const pagedImages = visibleImages.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  const isAllOnPageChecked =
    pagedImages.length > 0 &&
    pagedImages.every((image) => checkedImageIds.has(image.id));

  const selectedImage =
    selectedIndex !== null ? visibleImages[selectedIndex] ?? null : null;

  const handleFetchAll = () => {
    void worldAnvilImagesAPI.getImages();
    void worldAnvilImagesAPI.getFolders();
  };

  const handleSaveImage = async (id: string, updateBody: ImageUpdate) => {
    setIsSavingImage(true);
    try {
      await worldAnvilImagesAPI.updateImage(id, updateBody);
      dispatch(addNotification("Image updated.", "success"));
    } catch (error) {
      console.error("Error updating image:", error);
      dispatch(addNotification("Unable to update image.", "danger"));
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleConfirmDeleteImage = async () => {
    if (!imagePendingDelete) {
      return;
    }

    setIsDeletingImage(true);
    try {
      await worldAnvilImagesAPI.deleteImage(imagePendingDelete.id);
      dispatch(addNotification("Image deleted.", "success"));
      setSelectedIndex(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      dispatch(addNotification("Unable to delete image.", "danger"));
    } finally {
      setIsDeletingImage(false);
      setImagePendingDelete(null);
    }
  };

  const handleSelectImage = (image: Image) => {
    const nextIndex = visibleImages.findIndex(
      (candidate) => candidate.id === image.id,
    );
    setSelectedIndex(nextIndex === -1 ? null : nextIndex);
  };

  const handleSelectFolder = (folderId: string | null) => {
    setSelectedFolderId(folderId);
    setIsFolderTreeExpanded(false);
  };

  const handleSyncImage = async (image: Image) => {
    setSyncingImageId(image.id);
    try {
      await worldAnvilImagesAPI.syncImage(image.id);
      dispatch(
        addNotification(`Synced "${image.title}" from WorldAnvil.`, "success"),
      );
    } catch (error) {
      console.error("Error syncing image:", error);
      dispatch(
        addNotification("Unable to sync image from WorldAnvil.", "danger"),
      );
    } finally {
      setSyncingImageId(null);
    }
  };

  const handleToggleChecked = (image: Image) => {
    setCheckedImageIds((current) => {
      const next = new Set(current);
      if (next.has(image.id)) {
        next.delete(image.id);
      } else {
        next.add(image.id);
      }
      return next;
    });
  };

  const handleClearChecked = () => setCheckedImageIds(new Set());

  const handleToggleSelectAllOnPage = () => {
    setCheckedImageIds((current) => {
      const next = new Set(current);
      if (isAllOnPageChecked) {
        pagedImages.forEach((image) => next.delete(image.id));
      } else {
        pagedImages.forEach((image) => next.add(image.id));
      }
      return next;
    });
  };

  const runBulkUpdate = async (
    buildUpdate: (image: Image) => ImageUpdate | null,
  ) => {
    const targetImages = images.filter((image) =>
      checkedImageIds.has(image.id),
    );
    if (
      targetImages.length === 0 ||
      targetImages.length > MAX_BULK_BATCH_SIZE
    ) {
      return;
    }

    setIsBulkProcessing(true);
    setBulkProgress({ completed: 0, total: targetImages.length });

    let successCount = 0;
    let skippedCount = 0;
    let failureCount = 0;

    for (let i = 0; i < targetImages.length; i += 1) {
      const image = targetImages[i];
      const updateBody = buildUpdate(image);

      if (!updateBody || Object.keys(updateBody).length === 0) {
        skippedCount += 1;
      } else {
        try {
          await worldAnvilImagesAPI.updateImage(image.id, updateBody);
          successCount += 1;
        } catch (error) {
          console.error(`Error bulk-updating image ${image.id}:`, error);
          failureCount += 1;
        }
      }

      setBulkProgress({ completed: i + 1, total: targetImages.length });

      if (i < targetImages.length - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, BULK_THROTTLE_DELAY_MS),
        );
      }
    }

    setIsBulkProcessing(false);
    setBulkProgress(null);
    setCheckedImageIds(new Set());

    const summary = [
      successCount > 0 ? `${successCount} updated` : null,
      skippedCount > 0 ? `${skippedCount} unchanged` : null,
      failureCount > 0 ? `${failureCount} failed` : null,
    ]
      .filter(Boolean)
      .join(", ");

    dispatch(
      addNotification(
        `Bulk update complete: ${summary || "no images updated"}.`,
        failureCount > 0 ? "danger" : "success",
      ),
    );
  };

  const handleBulkApplyTags = (mode: BulkTagMode, tagsValue: string) => {
    const tagsToApply = tagsFromValue(tagsValue);

    void runBulkUpdate((image) => {
      const existingTags = tagsFromValue(image.tags ?? "");
      let newTags: string[];

      if (mode === "add") {
        newTags = Array.from(new Set([...existingTags, ...tagsToApply]));
      } else if (mode === "remove") {
        newTags = existingTags.filter((tag) => !tagsToApply.includes(tag));
      } else {
        newTags = tagsToApply;
      }

      const newTagsValue = newTags.join(",");
      if (newTagsValue === (image.tags ?? "")) {
        return null;
      }

      return { tags: newTagsValue };
    });
  };

  const handleBulkMoveToFolder = (folderId: string) => {
    void runBulkUpdate((image) => {
      const currentFolderId = image.folderId ?? IMAGE_FOLDER_ROOT_ID;
      if (currentFolderId === folderId) {
        return null;
      }
      return { folderId };
    });
  };

  return (
    <div className="image-manager">
      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        <Button
          variant="primary"
          onClick={handleFetchAll}
          disabled={isLoadingImages}
        >
          Fetch All Images
        </Button>
        <OverlayTrigger
          overlay={
            <Tooltip id="upload-disabled-tooltip">
              Uploading new images isn&apos;t supported by the WorldAnvil API
              yet. Upload images on WorldAnvil directly, then manage them here.
            </Tooltip>
          }
        >
          <span>
            <Button variant="outline-secondary" disabled>
              <Upload size={16} aria-hidden="true" className="me-1" />
              Upload Image
            </Button>
          </span>
        </OverlayTrigger>
        {isLoadingImages && (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {imageFetchProgress.worldId === world.id &&
          imageFetchProgress.loadedCount > 0 && (
            <span className="text-muted">
              {isLoadingImages
                ? `Fetched ${imageFetchProgress.loadedCount} images so far...`
                : `Fetch complete: ${imageFetchProgress.loadedCount} images loaded`}
            </span>
          )}
      </div>
      <div
        className={`image-manager-layout${
          selectedImage ? " has-selection" : ""
        }`}
      >
        <div className="image-manager-sidebar-toggle d-lg-none">
          <Button
            variant="outline-secondary"
            className="w-100 d-flex align-items-center justify-content-between"
            onClick={() => setIsFolderTreeExpanded((value) => !value)}
          >
            <span className="d-flex align-items-center gap-2">
              <FolderIcon size={16} aria-hidden="true" />
              Folders
            </span>
            {isFolderTreeExpanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </Button>
        </div>
        <div
          className={`image-manager-sidebar${
            isFolderTreeExpanded ? " is-open" : ""
          }`}
        >
          <ImageFolderTree
            selectedFolderId={selectedFolderId}
            onSelectFolder={handleSelectFolder}
          />
        </div>
        <div className="image-manager-content">
          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <Form.Control
              type="search"
              className="image-manager-search"
              placeholder="Search loaded images by title, tags, description..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <span className="text-muted small">
              {visibleImages.length === 0
                ? "No images match."
                : `Showing ${currentPage * PAGE_SIZE + 1}-${Math.min(
                    (currentPage + 1) * PAGE_SIZE,
                    visibleImages.length,
                  )} of ${visibleImages.length} images`}
            </span>
            <Form.Check
              type="checkbox"
              id="select-all-on-page"
              className="ms-auto"
              label={`Select all on page (${pagedImages.length})`}
              checked={isAllOnPageChecked}
              disabled={pagedImages.length === 0}
              onChange={handleToggleSelectAllOnPage}
            />
          </div>
          {checkedImageIds.size > 0 && (
            <ImageBulkToolbar
              selectedCount={checkedImageIds.size}
              maxBatchSize={MAX_BULK_BATCH_SIZE}
              folders={folders}
              isProcessing={isBulkProcessing}
              progress={bulkProgress}
              onClearSelection={handleClearChecked}
              onApplyTags={handleBulkApplyTags}
              onMoveToFolder={handleBulkMoveToFolder}
            />
          )}
          <ImageGrid
            images={pagedImages}
            selectedImageId={selectedImage?.id ?? null}
            syncingImageId={syncingImageId}
            checkedImageIds={checkedImageIds}
            onSelect={handleSelectImage}
            onRequestDelete={setImagePendingDelete}
            onSync={(image) => void handleSyncImage(image)}
            onToggleChecked={handleToggleChecked}
          />
          {totalPages > 1 && (
            <Pagination className="mt-3 flex-wrap">
              <Pagination.Prev
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
              />
              <Pagination.Item disabled>{`Page ${
                currentPage + 1
              } of ${totalPages}`}</Pagination.Item>
              <Pagination.Next
                disabled={currentPage >= totalPages - 1}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
                }
              />
            </Pagination>
          )}
        </div>
        <div className="image-manager-detail">
          <ImageDetailPanel
            image={selectedImage}
            folders={folders}
            isSaving={isSavingImage}
            isSyncing={
              selectedImage !== null && syncingImageId === selectedImage.id
            }
            position={
              selectedIndex !== null
                ? { index: selectedIndex, count: visibleImages.length }
                : null
            }
            onSave={handleSaveImage}
            onRequestDelete={setImagePendingDelete}
            onSync={(image) => void handleSyncImage(image)}
            onPrev={() =>
              setSelectedIndex((current) => {
                if (current === null || visibleImages.length === 0) {
                  return current;
                }
                return (
                  (current - 1 + visibleImages.length) % visibleImages.length
                );
              })
            }
            onNext={() =>
              setSelectedIndex((current) => {
                if (current === null || visibleImages.length === 0) {
                  return current;
                }
                return (current + 1) % visibleImages.length;
              })
            }
            onBack={() => setSelectedIndex(null)}
          />
        </div>
      </div>
      <ConfirmModal
        show={imagePendingDelete !== null}
        title="Delete image?"
        confirmLabel="Delete Image"
        isConfirming={isDeletingImage}
        body={
          <>
            Delete &quot;{imagePendingDelete?.title}&quot;? This action is
            irreversible.
          </>
        }
        onConfirm={() => void handleConfirmDeleteImage()}
        onCancel={() => setImagePendingDelete(null)}
      />
    </div>
  );
}
