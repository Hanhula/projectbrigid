import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Image } from "../types/image";

export type ImageFetchProgress = {
  worldId: string;
  totalCount: number;
  loadedCount: number;
  offset: number;
  isComplete: boolean;
};

export type ImagesState = {
  isLoadingImages: boolean;
  imageFetchProgress: ImageFetchProgress;
  imageIdsByWorld: Record<string, string[]>;
  imagesByIdByWorld: Record<string, Record<string, Image>>;
};

const initialImageFetchProgress: ImageFetchProgress = {
  worldId: "",
  totalCount: 0,
  loadedCount: 0,
  offset: 0,
  isComplete: false,
};

const initialState: ImagesState = {
  isLoadingImages: false,
  imageFetchProgress: initialImageFetchProgress,
  imageIdsByWorld: {},
  imagesByIdByWorld: {},
};

export const imageSlice = createSlice({
  name: "imageState",
  initialState,
  reducers: {
    // Merges (rather than replaces) so incremental pages accumulate into the existing set.
    setWorldImages(state, action) {
      const { worldId, images } = action.payload as {
        worldId: string;
        images: Image[];
      };

      const imageRecord = state.imagesByIdByWorld[worldId] ?? {};
      for (const image of images) {
        imageRecord[image.id] = image;
      }

      state.imagesByIdByWorld[worldId] = imageRecord;
      state.imageIdsByWorld[worldId] = Object.keys(imageRecord);
    },
    updateImageById(state, action) {
      const { worldId, image } = action.payload as {
        worldId: string;
        image: Image;
      };

      const imageRecord = state.imagesByIdByWorld[worldId] ?? {};
      imageRecord[image.id] = image;
      state.imagesByIdByWorld[worldId] = imageRecord;
      state.imageIdsByWorld[worldId] = Object.keys(imageRecord);
    },
    removeImageById(state, action) {
      const { worldId, imageId } = action.payload as {
        worldId: string;
        imageId: string;
      };

      const imageRecord = state.imagesByIdByWorld[worldId];
      if (!imageRecord) {
        return;
      }

      delete imageRecord[imageId];
      state.imageIdsByWorld[worldId] = Object.keys(imageRecord);
    },
    setLoadingImages(state, action) {
      state.isLoadingImages = action.payload;
    },
    setImageFetchProgress(state, action) {
      const progress = action.payload as Partial<ImageFetchProgress>;
      state.imageFetchProgress = {
        ...state.imageFetchProgress,
        ...progress,
      };
    },
    resetImageFetchProgress(state) {
      state.imageFetchProgress = initialImageFetchProgress;
    },
    resetImageState(state) {
      state.isLoadingImages = initialState.isLoadingImages;
      state.imageFetchProgress = initialImageFetchProgress;
      state.imageIdsByWorld = {};
      state.imagesByIdByWorld = {};
    },
  },
});

export const {
  setWorldImages,
  updateImageById,
  removeImageById,
  setLoadingImages,
  setImageFetchProgress,
  resetImageFetchProgress,
  resetImageState,
} = imageSlice.actions;

const selectImagesByIdByWorldState = (state: {
  imageState: Partial<ImagesState>;
}) => state.imageState?.imagesByIdByWorld ?? {};

const EMPTY_IMAGE_MAP: Record<string, Image> = {};
const EMPTY_IMAGE_LIST: Image[] = [];

export const selectIsLoadingImages = (state: {
  imageState: Partial<ImagesState>;
}) => state.imageState?.isLoadingImages ?? false;

export const selectImageFetchProgress = (state: {
  imageState: Partial<ImagesState>;
}) => state.imageState?.imageFetchProgress ?? initialImageFetchProgress;

export const selectImageMapByWorld = (worldId: string) =>
  createSelector([selectImagesByIdByWorldState], (imagesByIdByWorld) => {
    return imagesByIdByWorld[worldId] ?? EMPTY_IMAGE_MAP;
  });

export const selectImagesByWorld = (worldId: string) =>
  createSelector([selectImageMapByWorld(worldId)], (imageMap) => {
    const images = Object.values(imageMap);
    return images.length ? images : EMPTY_IMAGE_LIST;
  });
