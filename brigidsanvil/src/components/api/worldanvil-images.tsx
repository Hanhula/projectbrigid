import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, ImageUpdate } from "../types/image";
import { CreateFolder, Folder, FolderUpdate } from "../types/folder";
import { selectWorld } from "../store/apiSlice";
import { selectAuthToken } from "../store/authSlice";
import {
  removeImageById,
  resetImageFetchProgress,
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

export function useWorldAnvilImagesAPI() {
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const world = useSelector(selectWorld);
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
    let loadedCount = 0;
    let isComplete = false;

    try {
      while (!isComplete) {
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

        if (entities.length > 0) {
          dispatch(setWorldImages({ worldId: world.id, images: entities }));
        }

        loadedCount += entities.length;
        offset += entities.length;
        isComplete = entities.length < PAGE_SIZE;

        dispatch(
          setImageFetchProgress({
            worldId: world.id,
            totalCount: loadedCount,
            loadedCount,
            offset,
            isComplete,
          }),
        );
      }
    } finally {
      if (imageFetchRequestIdRef.current === activeRequestId) {
        dispatch(setLoadingImages(false));
      }
    }
  }

  async function getImage(id: string, granularity: string = "2") {
    const endpoint = `/image?id=${id}&granularity=${granularity}`;
    return await callWorldAnvil(endpoint, CallType.GET);
  }

  async function updateImage(id: string, updateBody: ImageUpdate) {
    const endpoint = `/image?id=${id}`;
    const data = await callWorldAnvil(
      endpoint,
      CallType.PATCH,
      JSON.stringify(updateBody),
    );
    dispatch(updateImageById({ worldId: world.id, image: data }));
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
    updateImage,
    deleteImage,
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
