import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Folder } from "../types/folder";

export const IMAGE_FOLDER_ROOT_ID = "-1";

// Synthetic id (not a real WA folder) representing images with no folder assigned.
export const UNSORTED_FOLDER_ID = "unsorted";

export type FolderFetchProgress = {
  worldId: string;
  totalCount: number;
  loadedCount: number;
  offset: number;
  isComplete: boolean;
};

export type FoldersState = {
  isLoadingFolders: boolean;
  folderFetchProgress: FolderFetchProgress;
  folderIdsByWorld: Record<string, string[]>;
  foldersByIdByWorld: Record<string, Record<string, Folder>>;
};

const initialFolderFetchProgress: FolderFetchProgress = {
  worldId: "",
  totalCount: 0,
  loadedCount: 0,
  offset: 0,
  isComplete: false,
};

const initialState: FoldersState = {
  isLoadingFolders: false,
  folderFetchProgress: initialFolderFetchProgress,
  folderIdsByWorld: {},
  foldersByIdByWorld: {},
};

export const folderSlice = createSlice({
  name: "folderState",
  initialState,
  reducers: {
    // Merges (rather than replaces) so incremental pages accumulate into the existing set.
    setWorldFolders(state, action) {
      const { worldId, folders } = action.payload as {
        worldId: string;
        folders: Folder[];
      };

      const folderRecord = state.foldersByIdByWorld[worldId] ?? {};
      for (const folder of folders) {
        folderRecord[folder.id] = folder;
      }

      state.foldersByIdByWorld[worldId] = folderRecord;
      state.folderIdsByWorld[worldId] = Object.keys(folderRecord);
    },
    addFolder(state, action) {
      const { worldId, folder } = action.payload as {
        worldId: string;
        folder: Folder;
      };

      const folderRecord = state.foldersByIdByWorld[worldId] ?? {};
      folderRecord[folder.id] = folder;
      state.foldersByIdByWorld[worldId] = folderRecord;
      state.folderIdsByWorld[worldId] = Object.keys(folderRecord);
    },
    updateFolderById(state, action) {
      const { worldId, folder } = action.payload as {
        worldId: string;
        folder: Folder;
      };

      const folderRecord = state.foldersByIdByWorld[worldId] ?? {};
      folderRecord[folder.id] = folder;
      state.foldersByIdByWorld[worldId] = folderRecord;
      state.folderIdsByWorld[worldId] = Object.keys(folderRecord);
    },
    removeFolderById(state, action) {
      const { worldId, folderId } = action.payload as {
        worldId: string;
        folderId: string;
      };

      const folderRecord = state.foldersByIdByWorld[worldId];
      if (!folderRecord) {
        return;
      }

      delete folderRecord[folderId];
      state.folderIdsByWorld[worldId] = Object.keys(folderRecord);
    },
    setLoadingFolders(state, action) {
      state.isLoadingFolders = action.payload;
    },
    setFolderFetchProgress(state, action) {
      const progress = action.payload as Partial<FolderFetchProgress>;
      state.folderFetchProgress = {
        ...state.folderFetchProgress,
        ...progress,
      };
    },
    resetFolderFetchProgress(state) {
      state.folderFetchProgress = initialFolderFetchProgress;
    },
    resetFolderState(state) {
      state.isLoadingFolders = initialState.isLoadingFolders;
      state.folderFetchProgress = initialFolderFetchProgress;
      state.folderIdsByWorld = {};
      state.foldersByIdByWorld = {};
    },
  },
});

export const {
  setWorldFolders,
  addFolder,
  updateFolderById,
  removeFolderById,
  setLoadingFolders,
  setFolderFetchProgress,
  resetFolderFetchProgress,
  resetFolderState,
} = folderSlice.actions;

const selectFoldersByIdByWorldState = (state: {
  folderState: Partial<FoldersState>;
}) => state.folderState?.foldersByIdByWorld ?? {};

const EMPTY_FOLDER_MAP: Record<string, Folder> = {};
const EMPTY_FOLDER_LIST: Folder[] = [];
const EMPTY_FOLDER_CHILDREN: Record<string, Folder[]> = {};

export const selectIsLoadingFolders = (state: {
  folderState: Partial<FoldersState>;
}) => state.folderState?.isLoadingFolders ?? false;

export const selectFolderFetchProgress = (state: {
  folderState: Partial<FoldersState>;
}) => state.folderState?.folderFetchProgress ?? initialFolderFetchProgress;

export const selectFolderMapByWorld = (worldId: string) =>
  createSelector([selectFoldersByIdByWorldState], (foldersByIdByWorld) => {
    return foldersByIdByWorld[worldId] ?? EMPTY_FOLDER_MAP;
  });

export const selectFoldersByWorld = (worldId: string) =>
  createSelector([selectFolderMapByWorld(worldId)], (folderMap) => {
    const folders = Object.values(folderMap);
    return folders.length ? folders : EMPTY_FOLDER_LIST;
  });

// Groups folders by parent id ("-1" is the world root) for tree rendering.
export const selectFolderTreeByWorld = (worldId: string) =>
  createSelector([selectFoldersByWorld(worldId)], (folders) => {
    if (folders.length === 0) {
      return EMPTY_FOLDER_CHILDREN;
    }

    return folders.reduce<Record<string, Folder[]>>(
      (childrenByParent, folder) => {
        const parentId =
          folder.parent?.id ?? folder.folderId ?? IMAGE_FOLDER_ROOT_ID;
        const children = childrenByParent[parentId] ?? [];
        children.push(folder);
        childrenByParent[parentId] = children;
        return childrenByParent;
      },
      {},
    );
  });
