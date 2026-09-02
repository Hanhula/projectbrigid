import {
  folderSlice,
  selectFoldersByWorld,
  selectFolderMapByWorld,
  selectFolderTreeByWorld,
  selectIsLoadingFolders,
  IMAGE_FOLDER_ROOT_ID,
} from "@/components/store/foldersSlice";

const {
  setWorldFolders,
  addFolder,
  updateFolderById,
  removeFolderById,
  setLoadingFolders,
  resetFolderState,
} = folderSlice.actions;

describe("foldersSlice", () => {
  const worldId = "world-1";
  const rootFolder = {
    id: "folder-1",
    title: "Root Folder",
    parent: { id: IMAGE_FOLDER_ROOT_ID },
  } as any;
  const childFolder = {
    id: "folder-2",
    title: "Child Folder",
    parent: { id: "folder-1" },
  } as any;

  it("normalizes folders by world and id on setWorldFolders, merging across pages", () => {
    let state = folderSlice.reducer(
      undefined,
      setWorldFolders({ worldId, folders: [rootFolder] }),
    );
    state = folderSlice.reducer(
      state,
      setWorldFolders({ worldId, folders: [childFolder] }),
    );

    expect(state.folderIdsByWorld[worldId]).toEqual(["folder-1", "folder-2"]);
  });

  it("adds, updates, and removes a folder by id", () => {
    let state = folderSlice.reducer(
      undefined,
      addFolder({ worldId, folder: rootFolder }),
    );
    expect(state.foldersByIdByWorld[worldId]["folder-1"]).toEqual(rootFolder);

    const renamed = { ...rootFolder, title: "Renamed" };
    state = folderSlice.reducer(
      state,
      updateFolderById({ worldId, folder: renamed }),
    );
    expect(state.foldersByIdByWorld[worldId]["folder-1"].title).toBe("Renamed");

    state = folderSlice.reducer(
      state,
      removeFolderById({ worldId, folderId: "folder-1" }),
    );
    expect(state.foldersByIdByWorld[worldId]["folder-1"]).toBeUndefined();
    expect(state.folderIdsByWorld[worldId]).toEqual([]);
  });

  it("resets all folder state", () => {
    let state = folderSlice.reducer(
      undefined,
      setWorldFolders({ worldId, folders: [rootFolder] }),
    );
    state = folderSlice.reducer(state, resetFolderState());

    expect(state.folderIdsByWorld).toEqual({});
    expect(state.foldersByIdByWorld).toEqual({});
  });

  it("selects folders, loading state, and a parent-grouped tree", () => {
    const rootState = {
      folderState: {
        foldersByIdByWorld: {
          [worldId]: { "folder-1": rootFolder, "folder-2": childFolder },
        },
        isLoadingFolders: true,
      },
    } as any;

    expect(selectFoldersByWorld(worldId)(rootState)).toEqual([
      rootFolder,
      childFolder,
    ]);
    expect(selectFolderMapByWorld(worldId)(rootState)).toEqual({
      "folder-1": rootFolder,
      "folder-2": childFolder,
    });
    expect(selectIsLoadingFolders(rootState)).toBe(true);

    const tree = selectFolderTreeByWorld(worldId)(rootState);
    expect(tree[IMAGE_FOLDER_ROOT_ID]).toEqual([rootFolder]);
    expect(tree["folder-1"]).toEqual([childFolder]);
  });
});
