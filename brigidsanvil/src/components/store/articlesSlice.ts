import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { HYDRATE } from "next-redux-wrapper";
import { Article, WorldArticle, WorldArticles } from "../types/article";
import { Image } from "../types/image";
import { User } from "../types/user";
import { World } from "../types/world";

export type WorldArticleDetailState = {
  world: World;
  isFullDetail: boolean;
}

export type WorldArticlesState = {
  worldArticles: WorldArticles[];
  currentWorldArticles: WorldArticles;
  isLoadingWorldArticles: boolean;
  detailState: WorldArticleDetailState[];
};


let initialArticle: Article = {
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
  content: null
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
  owner: initialArticle as User,
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
  cover: initialArticle as Image,
  genre: null,
  theme: "",
  isEditable: false,
  success: false,
};

let initialDetail: WorldArticleDetailState = {
  world: initialWorld,
  isFullDetail: false
}

// Initial state
const initialState = {
  worldArticles: [
    {
      world: {
        id: "",
      },
      articles: [initialArticle],
    },
  ],
  currentWorldArticles: {
    world: {
      id: "",
    },
    articles: [initialArticle],
  },
  isLoadingWorldArticles: false,
  detailState: [initialDetail]
};

// Actual Slice
export const articleSlice = createSlice({
  name: "articleState",
  initialState,
  reducers: {
    setWorldArticles(state, action) {
      const newWorldArticles: WorldArticles = action.payload;
      const worldIndex = state.worldArticles.findIndex(
        (worldArticle) => worldArticle.world.id === newWorldArticles.world.id
      );

      if (worldIndex !== -1) {
        state.worldArticles[worldIndex] = newWorldArticles;
      } else {
        state.worldArticles.push(newWorldArticles);
      }
    },
    setCurrentWorldArticles(state, action) {
      const currentWorld: World = action.payload;
      const worldArticle = state.worldArticles.find(
        (worldArticle) => worldArticle.world.id === currentWorld.id
      );
      if (worldArticle) {
        state.currentWorldArticles = worldArticle;
      } else {
        console.error(`World with ID ${currentWorld.id} not found.`);
      }
    },
    setLoadingWorldArticles(state, action) {
      state.isLoadingWorldArticles = action.payload;
    },
    setDetailState(state, action) {
      const { world, isFullDetail } = action.payload;
    
      const newDetailState: WorldArticleDetailState = {
        world,
        isFullDetail,
      };
    
      const existingDetailStateIndex = state.detailState.findIndex(
        (detailState) => detailState.world.id === newDetailState.world.id
      );
    
      if (existingDetailStateIndex !== -1) {
        state.detailState[existingDetailStateIndex] = newDetailState;
      } else {
        state.detailState.push(newDetailState);
      }
    },
    updateArticleById(state, action) {
      const updatedArticleObj: WorldArticle = action.payload;
      const worldIndex = state.worldArticles.findIndex(
        (worldArticle) => worldArticle.world.id === updatedArticleObj.world.id
      );

      if (worldIndex !== -1) {
        const articleIndex = state.worldArticles[worldIndex].articles.findIndex(
          (article) => article.id === updatedArticleObj.article.id
        );

        if (articleIndex !== -1) {
          state.worldArticles[worldIndex].articles[articleIndex] =
            updatedArticleObj.article;
        } else {
          state.worldArticles[worldIndex].articles.push(
            updatedArticleObj.article
          );
        }
      } else {
        console.error(`World with ID ${updatedArticleObj.world.id} not found.`);
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
  setWorldArticles,
  setCurrentWorldArticles,
  setLoadingWorldArticles,
  setDetailState,
  updateArticleById,
} = articleSlice.actions;

// Base selectors
const selectArticleState = (state: {
  articleState: WorldArticlesState;
}) => state.articleState;

export const selectWorldArticles = createSelector(
  [selectArticleState],
  (articleState) => articleState.worldArticles
);

export const selectIsLoadingWorldArticles = createSelector(
  [selectArticleState],
  (articleState) => articleState.isLoadingWorldArticles
);

// Memoized selector factory for articles by world
// This uses a cache to avoid recreating selectors for the same worldId
const worldArticleSelectors: Record<string, any> = {};

export const selectWorldArticlesByWorld =
  (worldId: string) => {
    // Return cached selector if it exists
    if (!worldArticleSelectors[worldId]) {
      worldArticleSelectors[worldId] = createSelector(
        [selectArticleState],
        (articleState) => {
          const worldArticle = articleState.worldArticles.find(
            (worldArticle) => worldArticle.world.id === worldId
          );

          const placeholderArticle: WorldArticles = {
            world: initialWorld,
            articles: [initialArticle],
          };

          return worldArticle || placeholderArticle;
        }
      );
    }
    return worldArticleSelectors[worldId];
  };

// Memoized selector factory for detail state by world
const detailStateSelectors: Record<string, any> = {};

export const selectCurrentDetailStateByWorld =
  (worldId: string) => {
    // Return cached selector if it exists
    if (!detailStateSelectors[worldId]) {
      detailStateSelectors[worldId] = createSelector(
        [selectArticleState],
        (articleState) => {
          const currentDetailState = articleState.detailState.find(
            (detailState) => detailState.world.id === worldId
          );

          const placeholderState: WorldArticleDetailState = {
            world: initialWorld,
            isFullDetail: false
          }

          return currentDetailState || placeholderState;
        }
      );
    }
    return detailStateSelectors[worldId];
  };

export default articleSlice.reducer;
