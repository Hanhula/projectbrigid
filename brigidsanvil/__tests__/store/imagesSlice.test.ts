import {
  imageSlice,
  selectImagesByWorld,
  selectImageMapByWorld,
  selectIsLoadingImages,
  selectImageFetchProgress,
} from "@/components/store/imagesSlice";

const {
  setWorldImages,
  updateImageById,
  removeImageById,
  setLoadingImages,
  setImageFetchProgress,
  resetImageFetchProgress,
  resetImageState,
} = imageSlice.actions;

describe("imagesSlice", () => {
  const worldId = "world-1";
  const imageA = { id: "1", title: "Image A" } as any;
  const imageB = { id: "2", title: "Image B" } as any;

  it("normalizes images by world and id on setWorldImages, merging across pages", () => {
    let state = imageSlice.reducer(
      undefined,
      setWorldImages({ worldId, images: [imageA] }),
    );
    state = imageSlice.reducer(
      state,
      setWorldImages({ worldId, images: [imageB] }),
    );

    expect(state.imageIdsByWorld[worldId]).toEqual(["1", "2"]);
    expect(state.imagesByIdByWorld[worldId]["1"]).toEqual(imageA);
    expect(state.imagesByIdByWorld[worldId]["2"]).toEqual(imageB);
  });

  it("updates a single image by id", () => {
    let state = imageSlice.reducer(
      undefined,
      setWorldImages({ worldId, images: [imageA] }),
    );
    const updatedImage = { id: "1", title: "Renamed" } as any;
    state = imageSlice.reducer(
      state,
      updateImageById({ worldId, image: updatedImage }),
    );

    expect(state.imagesByIdByWorld[worldId]["1"].title).toBe("Renamed");
  });

  it("removes an image by id", () => {
    let state = imageSlice.reducer(
      undefined,
      setWorldImages({ worldId, images: [imageA, imageB] }),
    );
    state = imageSlice.reducer(
      state,
      removeImageById({ worldId, imageId: "1" }),
    );

    expect(state.imageIdsByWorld[worldId]).toEqual(["2"]);
    expect(state.imagesByIdByWorld[worldId]["1"]).toBeUndefined();
  });

  it("tracks loading state and fetch progress", () => {
    let state = imageSlice.reducer(undefined, setLoadingImages(true));
    expect(state.isLoadingImages).toBe(true);

    state = imageSlice.reducer(
      state,
      setImageFetchProgress({
        worldId,
        totalCount: 100,
        loadedCount: 50,
        offset: 50,
        isComplete: false,
      }),
    );
    expect(state.imageFetchProgress.loadedCount).toBe(50);

    state = imageSlice.reducer(state, resetImageFetchProgress());
    expect(state.imageFetchProgress.loadedCount).toBe(0);
  });

  it("resets all image state", () => {
    let state = imageSlice.reducer(
      undefined,
      setWorldImages({ worldId, images: [imageA] }),
    );
    state = imageSlice.reducer(state, resetImageState());

    expect(state.imageIdsByWorld).toEqual({});
    expect(state.imagesByIdByWorld).toEqual({});
    expect(state.isLoadingImages).toBe(false);
  });

  it("selects images and loading state from root state", () => {
    const rootState = {
      imageState: {
        imagesByIdByWorld: { [worldId]: { "1": imageA } },
        isLoadingImages: true,
        imageFetchProgress: {
          worldId,
          totalCount: 1,
          loadedCount: 1,
          offset: 1,
          isComplete: true,
        },
      },
    } as any;

    expect(selectImagesByWorld(worldId)(rootState)).toEqual([imageA]);
    expect(selectImageMapByWorld(worldId)(rootState)).toEqual({ "1": imageA });
    expect(selectIsLoadingImages(rootState)).toBe(true);
    expect(selectImageFetchProgress(rootState).isComplete).toBe(true);
  });
});
