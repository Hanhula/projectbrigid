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
import ImageFolderTree from "./image-folder-tree";
import ImageGrid from "./image-grid";
import ImageDetailPanel from "./image-detail-panel";
import ConfirmModal from "@/components/ui/ConfirmModal/confirm-modal";

import "./image-manager.scss";

// Images are rendered client-side page-at-a-time since worlds can have thousands of images.
const PAGE_SIZE = 60;

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
  }, [selectedFolderId, normalizedQuery]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages - 1));
  }, [totalPages]);

  const pagedImages = visibleImages.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

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
          </div>
          <ImageGrid
            images={pagedImages}
            selectedImageId={selectedImage?.id ?? null}
            syncingImageId={syncingImageId}
            onSelect={handleSelectImage}
            onRequestDelete={setImagePendingDelete}
            onSync={(image) => void handleSyncImage(image)}
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
