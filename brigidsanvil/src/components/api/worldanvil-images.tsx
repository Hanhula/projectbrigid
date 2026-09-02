import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, ImageUpdate } from "../types/image";
import { CreateFolder, Folder, FolderUpdate } from "../types/folder";
import { selectWorld } from "../store/apiSlice";
import { selectAuthToken } from "../store/authSlice";
import {
  removeImageById,
  resetImageFetchProgress,
  selectImageMapByWorld,
  setImageFetchProgress,
  setLoadingImages,
  setWorldImages,
  updateImageById,
} from "../store/imagesSlice";
import {
  addFolder,
  IMAGE_FOLDER_ROOT_ID,
  removeFolderById,
  resetFolderFetchProgress,
  setFolderFetchProgress,
  setLoadingFolders,
  setWorldFolders,
  updateFolderById,
} from "../store/foldersSlice";
import { CallType, callWorldAnvil as callWorldAnvilBase } from "./api-client";

// WA caps list endpoints at this many entities per page regardless of the requested limit.
const PAGE_SIZE = 50;
// Throttle between granularity-2 detail fetches so large libraries don't hammer the API.
const THROTTLE_DELAY_MS = 200;

// POST /world/images only returns ImageRef-level data (no filename/size/description/credits/etc),
// so a fetched image needs a follow-up GET ?granularity=2 unless we already have full detail for it.
function shouldHydrateImage(refImage: Image, existingImage?: Image) {
  if (!existingImage) {
    return true;
  }

  const hasFullDetail =
    existingImage.filename !== undefined && existingImage.size !== undefined;
  if (!hasFullDetail) {
    return true;
  }

  const newDate = refImage.updateDate?.date ?? "";
  const existingDate = existingImage.updateDate?.date ?? "";
  return newDate > existingDate;
}

export function useWorldAnvilImagesAPI() {
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const world = useSelector(selectWorld);
  const imageMapSelector = useMemo(
    () => selectImageMapByWorld(world.id),
    [world.id],
  );
  const currentImageMap = useSelector(imageMapSelector);
  const imageFetchRequestIdRef = useRef(0);
  const folderFetchRequestIdRef = useRef(0);

  async function callWorldAnvil(
    endpoint: string,
    callType: string,
    body?: string,
  ) {
    return callWorldAnvilBase(authToken, endpoint, callType, body);
  }

  async function getImages() {
    const activeRequestId = ++imageFetchRequestIdRef.current;
    dispatch(resetImageFetchProgress());
    dispatch(setLoadingImages(true));

    let offset = 0;
    let imageFetch: Image[] = [];
    let isListComplete = false;

    try {
      // Phase 1: page through the ref-level list so we know every image id in the world.
      while (!isListComplete) {
        if (imageFetchRequestIdRef.current !== activeRequestId) {
          return;
        }

        const endpoint = `/world/images?id=${world.id}`;
        const body = JSON.stringify({ limit: PAGE_SIZE, offset });
        const data = await callWorldAnvil(endpoint, CallType.POST, body);
        const entities: Image[] = data.entities ?? [];

        if (imageFetchRequestIdRef.current !== activeRequestId) {
          return;
        }

        imageFetch = [...imageFetch, ...entities];
        offset += entities.length;
        isListComplete = entities.length < PAGE_SIZE;

        dispatch(
          setImageFetchProgress({
            worldId: world.id,
            totalCount: imageFetch.length,
            loadedCount: imageFetch.length,
            offset,
            isComplete: false,
          }),
        );
      }

      // Phase 2: hydrate to granularity 2 (full detail) only for images that are new or stale.
      const upToDate: Image[] = [];
      const toHydrate: Image[] = [];
      for (const refImage of imageFetch) {
        const existing = currentImageMap[refImage.id];
        if (shouldHydrateImage(refImage, existing)) {
          toHydrate.push(refImage);
        } else {
          upToDate.push(existing);
        }
      }

      const totalSteps = imageFetch.length + toHydrate.length;
      let completedSteps = upToDate.length;

      dispatch(
        setImageFetchProgress({
          worldId: world.id,
          totalCount: totalSteps,
          loadedCount: completedSteps,
          offset,
          isComplete: false,
        }),
      );

      const hydratedImages: Image[] = [];
      for (const refImage of toHydrate) {
        if (imageFetchRequestIdRef.current !== activeRequestId) {
          return;
        }

        try {
          const fullImage = await getImage(refImage.id, "2");
          hydratedImages.push(fullImage);
        } catch (error) {
          console.error("Error hydrating image detail:", error);
          hydratedImages.push(refImage);
        }

        completedSteps += 1;
        if (imageFetchRequestIdRef.current === activeRequestId) {
          dispatch(
            setImageFetchProgress({
              worldId: world.id,
              totalCount: totalSteps,
              loadedCount: completedSteps,
              offset,
              isComplete: false,
            }),
          );
        }

        await new Promise((resolve) => setTimeout(resolve, THROTTLE_DELAY_MS));
      }

      if (imageFetchRequestIdRef.current !== activeRequestId) {
        return;
      }

      dispatch(
        setWorldImages({
          worldId: world.id,
          images: [...upToDate, ...hydratedImages],
        }),
      );
      dispatch(
        setImageFetchProgress({
          worldId: world.id,
          totalCount: totalSteps,
          loadedCount: totalSteps,
          offset,
          isComplete: true,
        }),
      );
    } finally {
      if (imageFetchRequestIdRef.current === activeRequestId) {
        dispatch(setLoadingImages(false));
      }
    }
  }

  async function getImage(
    id: string,
    granularity: string = "2",
  ): Promise<Image> {
    const endpoint = `/image?id=${id}&granularity=${granularity}`;
    return await callWorldAnvil(endpoint, CallType.GET);
  }

  // Force a fresh granularity-2 fetch for a single image, bypassing the updateDate check
  // used during bulk fetches, so a card/panel can pull the latest WA state on demand.
  async function syncImage(id: string): Promise<Image> {
    const fullImage = await getImage(id, "2");
    dispatch(updateImageById({ worldId: world.id, image: fullImage }));
    return fullImage;
  }

  async function updateImage(id: string, updateBody: ImageUpdate) {
    const endpoint = `/image?id=${id}`;
    const data = await callWorldAnvil(
      endpoint,
      CallType.PATCH,
      JSON.stringify(updateBody),
    );
    // PATCH only echoes ImageRef-level fields, so merge onto the existing full-detail
    // image (and the diff we just sent) rather than replacing it outright.
    const existingImage = currentImageMap[id];
    const mergedImage: Image = {
      ...(existingImage ?? ({} as Image)),
      ...updateBody,
      ...data,
    };
    dispatch(updateImageById({ worldId: world.id, image: mergedImage }));
    return data;
  }

  async function deleteImage(id: string) {
    const endpoint = `/image?id=${id}`;
    const data = await callWorldAnvil(endpoint, CallType.DELETE);
    dispatch(removeImageById({ worldId: world.id, imageId: id }));
    return data;
  }

  async function getFolders() {
    const activeRequestId = ++folderFetchRequestIdRef.current;
    dispatch(resetFolderFetchProgress());
    dispatch(setLoadingFolders(true));

    let offset = 0;
    let loadedCount = 0;
    let isComplete = false;

    try {
      while (!isComplete) {
        if (folderFetchRequestIdRef.current !== activeRequestId) {
          return;
        }

        const endpoint = `/world/folders?id=${world.id}`;
        const body = JSON.stringify({
          limit: PAGE_SIZE,
          offset,
          entityType: "Image",
        });
        const data = await callWorldAnvil(endpoint, CallType.POST, body);
        const entities: Folder[] = data.entities ?? [];

        if (folderFetchRequestIdRef.current !== activeRequestId) {
          return;
        }

        if (entities.length > 0) {
          dispatch(setWorldFolders({ worldId: world.id, folders: entities }));
        }

        loadedCount += entities.length;
        offset += entities.length;
        isComplete = entities.length < PAGE_SIZE;

        dispatch(
          setFolderFetchProgress({
            worldId: world.id,
            totalCount: loadedCount,
            loadedCount,
            offset,
            isComplete,
          }),
        );
      }
    } finally {
      if (folderFetchRequestIdRef.current === activeRequestId) {
        dispatch(setLoadingFolders(false));
      }
    }
  }

  async function createFolder(title: string, parentId?: string) {
    const endpoint = `/folder`;
    const createBody: CreateFolder = {
      title,
      entityType: "Image",
      world: { id: world.id },
      parent: { id: parentId ?? IMAGE_FOLDER_ROOT_ID },
    };
    const data = await callWorldAnvil(
      endpoint,
      CallType.PUT,
      JSON.stringify(createBody),
    );
    dispatch(addFolder({ worldId: world.id, folder: data }));
    return data;
  }

  async function updateFolder(id: string, updateBody: FolderUpdate) {
    const endpoint = `/folder?id=${id}`;
    const data = await callWorldAnvil(
      endpoint,
      CallType.PATCH,
      JSON.stringify(updateBody),
    );
    dispatch(updateFolderById({ worldId: world.id, folder: data }));
    return data;
  }

  async function deleteFolder(id: string) {
    const endpoint = `/folder?id=${id}`;
    const data = await callWorldAnvil(endpoint, CallType.DELETE);
    dispatch(removeFolderById({ worldId: world.id, folderId: id }));
    return data;
  }

  return {
    getImages,
    getImage,
    syncImage,
    updateImage,
    deleteImage,
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
