import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, WorldCategory, WorldCategories } from "../types/category";
import { Image } from "../types/image";
import { User } from "../types/user";
import { World } from "../types/world";

export type WorldCategoryDetailState = {
  world: World;
  isFullDetail: boolean;
};

export type WorldCategoriesState = {
  worldCategories: WorldCategories[];
  currentWorldCategories: WorldCategories;
  isLoadingWorldCategories: boolean;
  categoryDetailState: WorldCategoryDetailState[];
};

let initialCategory: Category = {
  id: "",
  title: "",
  slug: "",
  state: "",
  isWip: false,
  isDraft: false,
  entityClass: "",
  icon: "",
  url: "",
  subscribergroups: [],
  folderId: "",
  tags: "",
  updateDate: {
    date: "",
    timezone_type: 0,
    timezone: "",
  },
};

let initialWorld: World = {
  id: "",
  title: "",
  slug: "",
  state: "",
  isWip: false,
  isDraft: false,
  entityClass: "",
  icon: "",
  url: "",
  subscribergroups: [],
  folderId: "",
  tags: "",
  updateDate: {
    date: "",
    timezone_type: 0,
    timezone: "",
  },
  descriptionParsed: "",
  owner: initialCategory as User,
  countFollowers: 0,
  countArticles: 0,
  countMaps: 0,
  countTimelines: 0,
  subtitle: "",
  locale: "",
  description: "",
  excerpt: "",
  isStored: false,
  displayCss: "",
  displayPanelCss: "",
  copyright: "",
  worldSidebarContent: "",
  globalAnnouncement: "",
  globalHeader: "",
  globalSidebarFooter: "",
  globalArticleIntroduction: "",
  cover: initialCategory as Image,
  genre: null,
  theme: "",
  isEditable: false,
  success: false,
};

let initialDetail: WorldCategoryDetailState = {
  world: initialWorld,
  isFullDetail: false,
};

// Initial state
const initialState = {
  worldCategories: [
    {
      world: {
        id: "",
      },
      categories: [initialCategory],
    },
  ],
  currentWorldCategories: {
    world: {
      id: "",
    },
    categories: [initialCategory],
  },
  isLoadingWorldCategories: false,
  categoryDetailState: [initialDetail],
};

// Actual Slice
export const categorySlice = createSlice({
  name: "categoryState",
  initialState,
  reducers: {
    setWorldCategories(state, action) {
      const newWorldCategories: WorldCategories = action.payload;
      const worldIndex = state.worldCategories.findIndex(
        (worldCategory) =>
          worldCategory.world.id === newWorldCategories.world.id
      );

      if (worldIndex !== -1) {
        state.worldCategories[worldIndex] = newWorldCategories;
      } else {
        state.worldCategories.push(newWorldCategories);
      }
    },
    setCurrentWorldCategories(state, action) {
      const currentWorld: World = action.payload;
      const worldCategory = state.worldCategories.find(
        (worldCategory) => worldCategory.world.id === currentWorld.id
      );
      if (worldCategory) {
        state.currentWorldCategories = worldCategory;
      } else {
        console.error(`World with ID ${currentWorld.id} not found.`);
      }
    },
    setLoadingWorldCategories(state, action) {
      state.isLoadingWorldCategories = action.payload;
    },
    setCategoryDetailState(state, action) {
      const { world, isFullDetail } = action.payload;

      const newDetailState: WorldCategoryDetailState = {
        world,
        isFullDetail,
      };

      if (state.categoryDetailState) {
        const existingDetailStateIndex = state.categoryDetailState.findIndex(
          (categoryDetailState) =>
            categoryDetailState.world.id === newDetailState.world.id
        );

        if (existingDetailStateIndex !== -1) {
          state.categoryDetailState[existingDetailStateIndex] = newDetailState;
        } else {
          state.categoryDetailState.push(newDetailState);
        }
      } else {
        state.categoryDetailState = [newDetailState];
      }
    },
    updateCategoryById(state, action) {
      const updatedCategoryObj: WorldCategory = action.payload;
      const worldIndex = state.worldCategories.findIndex(
        (worldCategory) =>
          worldCategory.world.id === updatedCategoryObj.world.id
      );

      if (worldIndex !== -1) {
        const categoryIndex = state.worldCategories[
          worldIndex
        ].categories.findIndex(
          (category) => category.id === updatedCategoryObj.category.id
        );

        if (categoryIndex !== -1) {
          state.worldCategories[worldIndex].categories[categoryIndex] =
            updatedCategoryObj.category;
        } else {
          state.worldCategories[worldIndex].categories.push(
            updatedCategoryObj.category
          );
        }
      } else {
        console.error(
          `World with ID ${updatedCategoryObj.world.id} not found.`
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action,
      };
    });
  },
});

export const {
  setWorldCategories,
  setCurrentWorldCategories,
  setLoadingWorldCategories,
  setCategoryDetailState,
  updateCategoryById,
} = categorySlice.actions;

export const selectWorldCategories = (state: {
  categoryState: WorldCategoriesState;
}) => state.categoryState.worldCategories;

export const selectIsLoadingWorldCategories = (state: {
  categoryState: WorldCategoriesState;
}) => state.categoryState.isLoadingWorldCategories;

export const selectWorldCategoriesByWorld =
  (worldId: string) => (state: { categoryState: WorldCategoriesState }) => {
    const worldCategory = state.categoryState.worldCategories.find(
      (worldCategory) => worldCategory.world.id === worldId
    );

    const placeholderCategory: WorldCategories = {
      world: initialWorld,
      categories: [initialCategory],
    };

    return worldCategory || placeholderCategory;
  };

export const selectCurrentCategoryDetailStateByWorld =
  (worldId: string) => (state: { categoryState: WorldCategoriesState }) => {
    const placeholderState: WorldCategoryDetailState = {
      world: initialWorld,
      isFullDetail: false,
    };

    if (state.categoryState.categoryDetailState) {
      const currentCategoryDetailState =
        state.categoryState.categoryDetailState.find(
          (categoryDetailState) => categoryDetailState.world.id === worldId
        );

      return currentCategoryDetailState || placeholderState;
    } else {
      return placeholderState;
    }
  };

export default categorySlice.reducer;
