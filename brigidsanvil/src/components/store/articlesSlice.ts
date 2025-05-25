import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Article, WorldArticle, WorldArticles } from "../types/article";
import { Image } from "../types/image";
import { User } from "../types/user";
import { World } from "../types/world";

export type WorldArticleDetailState = {
  world: World;
  isFullDetail: boolean;
};

export type WorldArticlesState = {
  worldArticles: Map<string, WorldArticles>;
  currentWorldArticles: WorldArticles;
  isLoadingWorldArticles: boolean;
  detailState: Map<string, WorldArticleDetailState>;
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
  content: null,
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
  isFullDetail: false,
};

// Initial state
const initialState = {
  worldArticles: new Map<string, WorldArticles>(),
  currentWorldArticles: {
    world: {
      id: "",
    },
    articles: new Map<string, Article>(),
  },
  isLoadingWorldArticles: false,
  detailState: new Map<string, WorldArticleDetailState>(),
};

// Actual Slice
export const articleSlice = createSlice({
  name: "articleState",
  initialState,
  reducers: {
    setWorldArticlesMap(state, action) {
      state.worldArticles = action.payload;
    },
    setWorldArticles(state, action) {
      const newWorldArticles: WorldArticles = action.payload;
      state.worldArticles.set(newWorldArticles.world.id, newWorldArticles);
    },
    setCurrentWorldArticles(state, action) {
      const currentWorld: World = action.payload;
      const worldArticle = state.worldArticles.get(currentWorld.id);
      if (worldArticle) {
        state.currentWorldArticles = worldArticle as WorldArticles;
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

      state.detailState.set(newDetailState.world.id, newDetailState);
    },
    updateArticleById(state, action) {
      const updatedArticleObj: WorldArticle = action.payload;
      const worldArticle = state.worldArticles.get(updatedArticleObj.world.id);
      if (worldArticle) {
        const articleToUpdate = worldArticle.articles.get(
          updatedArticleObj.article.id
        );
        if (articleToUpdate) {
          worldArticle.articles.set(
            updatedArticleObj.article.id,
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
  setWorldArticlesMap,
  setWorldArticles,
  setCurrentWorldArticles,
  setLoadingWorldArticles,
  setDetailState,
  updateArticleById,
} = articleSlice.actions;

export const selectWorldArticles = (state: {
  articleState: WorldArticlesState;
}) => state.articleState.worldArticles;

export const selectIsLoadingWorldArticles = (state: {
  articleState: WorldArticlesState;
}) => state.articleState.isLoadingWorldArticles;

export const selectWorldArticlesByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    console.log("state", state);
    console.log("state articles", state.articleState.worldArticles);
    const worldArticle = state.articleState.worldArticles.get(worldId);

    const placeholderArticle: WorldArticles = {
      world: initialWorld,
      articles: new Map<string, Article>(),
    };

    return worldArticle || placeholderArticle;
  };

export const selectCurrentDetailStateByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    const currentDetailState = state.articleState.detailState.get(worldId);

    const placeholderState: WorldArticleDetailState = {
      world: initialWorld,
      isFullDetail: false,
    };

    return currentDetailState || placeholderState;
  };

export default articleSlice.reducer;
