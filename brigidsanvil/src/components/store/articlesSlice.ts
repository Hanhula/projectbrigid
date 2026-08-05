import { createSelector, createSlice } from "@reduxjs/toolkit";
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
  worldArticles: WorldArticles[];
  currentWorldArticles: WorldArticles;
  isLoadingWorldArticles: boolean;
  detailState: WorldArticleDetailState[];
  worldArticlesById: Record<string, WorldArticles>;
  detailStateByWorld: Record<string, WorldArticleDetailState>;
  articleIdsByWorld: Record<string, string[]>;
  articlesByIdByWorld: Record<string, Record<string, Article>>;
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

const normalizeWorldArticlesById = (worldArticles: WorldArticles[]) => {
  return worldArticles.reduce<Record<string, WorldArticles>>(
    (acc, worldArticle) => {
      if (worldArticle.world?.id) {
        acc[worldArticle.world.id] = worldArticle;
      }

      return acc;
    },
    {},
  );
};

const normalizeDetailStateByWorld = (
  detailState: WorldArticleDetailState[],
) => {
  return detailState.reduce<Record<string, WorldArticleDetailState>>(
    (acc, detail) => {
      if (detail.world?.id) {
        acc[detail.world.id] = detail;
      }

      return acc;
    },
    {},
  );
};

const normalizeArticleIdsByWorld = (worldArticles: WorldArticles[]) => {
  return worldArticles.reduce<Record<string, string[]>>((acc, worldArticle) => {
    if (worldArticle.world?.id) {
      acc[worldArticle.world.id] = worldArticle.articles.map(
        (article) => article.id,
      );
    }

    return acc;
  }, {});
};

const normalizeArticlesByIdByWorld = (worldArticles: WorldArticles[]) => {
  return worldArticles.reduce<Record<string, Record<string, Article>>>(
    (acc, worldArticle) => {
      if (worldArticle.world?.id) {
        acc[worldArticle.world.id] = worldArticle.articles.reduce<
          Record<string, Article>
        >((articleAcc, article) => {
          articleAcc[article.id] = article;
          return articleAcc;
        }, {});
      }

      return acc;
    },
    {},
  );
};

const ensureArticleStateRecords = (state: WorldArticlesState) => {
  state.worldArticlesById = state.worldArticlesById ?? {};
  state.detailStateByWorld = state.detailStateByWorld ?? {};
  state.articleIdsByWorld = state.articleIdsByWorld ?? {};
  state.articlesByIdByWorld = state.articlesByIdByWorld ?? {};
};

export const migratePersistedArticleState = (
  articleState?: Partial<WorldArticlesState>,
): WorldArticlesState => {
  const nextState: WorldArticlesState = {
    worldArticles: articleState?.worldArticles ?? initialState.worldArticles,
    currentWorldArticles:
      articleState?.currentWorldArticles ?? initialState.currentWorldArticles,
    isLoadingWorldArticles:
      articleState?.isLoadingWorldArticles ??
      initialState.isLoadingWorldArticles,
    detailState: articleState?.detailState ?? initialState.detailState,
    worldArticlesById: articleState?.worldArticlesById ?? {},
    detailStateByWorld: articleState?.detailStateByWorld ?? {},
    articleIdsByWorld: articleState?.articleIdsByWorld ?? {},
    articlesByIdByWorld: articleState?.articlesByIdByWorld ?? {},
  };

  const legacyWorldArticles = nextState.worldArticles ?? [];
  const legacyDetailState = nextState.detailState ?? [];

  ensureArticleStateRecords(nextState);

  nextState.worldArticlesById = Object.keys(nextState.worldArticlesById).length
    ? nextState.worldArticlesById
    : normalizeWorldArticlesById(legacyWorldArticles);

  nextState.detailStateByWorld = Object.keys(nextState.detailStateByWorld)
    .length
    ? nextState.detailStateByWorld
    : normalizeDetailStateByWorld(legacyDetailState);

  nextState.articleIdsByWorld = Object.keys(nextState.articleIdsByWorld).length
    ? nextState.articleIdsByWorld
    : normalizeArticleIdsByWorld(legacyWorldArticles);

  nextState.articlesByIdByWorld = Object.keys(nextState.articlesByIdByWorld)
    .length
    ? nextState.articlesByIdByWorld
    : normalizeArticlesByIdByWorld(legacyWorldArticles);

  if (!nextState.currentWorldArticles?.world?.id) {
    const [firstWorldArticles] = Object.values(nextState.worldArticlesById);
    nextState.currentWorldArticles =
      firstWorldArticles ?? initialState.currentWorldArticles;
  }

  return nextState;
};

const migrateWorldArticlesState = (state: WorldArticlesState) => {
  return migratePersistedArticleState(state);
};

// Initial state
const initialState: WorldArticlesState = {
  worldArticles: [
    {
      world: {
        id: "",
      },
      articles: [initialArticle],
    },
  ] as WorldArticles[],
  currentWorldArticles: {
    world: {
      id: "",
    },
    articles: [initialArticle],
  } as WorldArticles,
  isLoadingWorldArticles: false,
  detailState: [initialDetail],
  worldArticlesById: {},
  detailStateByWorld: {},
  articleIdsByWorld: {},
  articlesByIdByWorld: {},
};

// Actual Slice
export const articleSlice = createSlice({
  name: "articleState",
  initialState,
  reducers: {
    setWorldArticles(state, action) {
      const newWorldArticles: WorldArticles = action.payload;
      const worldId = newWorldArticles.world.id;
      const articleRecord = newWorldArticles.articles.reduce<
        Record<string, Article>
      >((acc, article) => {
        acc[article.id] = article;
        return acc;
      }, {});

      state.worldArticlesById[worldId] = {
        ...newWorldArticles,
        articles: newWorldArticles.articles,
      };
      state.currentWorldArticles = state.worldArticlesById[worldId];
      state.articleIdsByWorld[worldId] = Object.keys(articleRecord);
      state.articlesByIdByWorld[worldId] = articleRecord;
    },
    setCurrentWorldArticles(state, action) {
      const currentWorld: World = action.payload;
      const worldArticle = state.worldArticlesById[currentWorld.id];
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

      state.detailStateByWorld[newDetailState.world.id] = newDetailState;
    },
    updateArticleById(state, action) {
      const updatedArticleObj: WorldArticle = action.payload;
      const worldId = updatedArticleObj.world.id;
      const worldArticlesByIdEntry = state.worldArticlesById[worldId];

      if (!worldArticlesByIdEntry) {
        console.error(`World with ID ${worldId} not found.`);
        return;
      }

      const articleRecord = state.articlesByIdByWorld[worldId] ?? {};
      const articleId = updatedArticleObj.article.id;

      articleRecord[articleId] = updatedArticleObj.article;
      state.articlesByIdByWorld[worldId] = articleRecord;
      state.articleIdsByWorld[worldId] = Object.keys(articleRecord);
      state.worldArticlesById[worldId] = {
        ...worldArticlesByIdEntry,
        articles: Object.values(articleRecord),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action) => {
      const hydrateAction = action as {
        payload?: {
          articleState?: Partial<WorldArticlesState>;
        };
      };
      const incomingState = hydrateAction.payload?.articleState;

      if (incomingState) {
        state.worldArticles =
          incomingState.worldArticles ?? state.worldArticles;
        state.detailState = incomingState.detailState ?? state.detailState;
        state.currentWorldArticles =
          incomingState.currentWorldArticles ?? state.currentWorldArticles;
        state.isLoadingWorldArticles =
          incomingState.isLoadingWorldArticles ?? state.isLoadingWorldArticles;
        state.worldArticlesById =
          incomingState.worldArticlesById ?? state.worldArticlesById ?? {};
        state.detailStateByWorld =
          incomingState.detailStateByWorld ?? state.detailStateByWorld ?? {};
        state.articleIdsByWorld =
          incomingState.articleIdsByWorld ?? state.articleIdsByWorld ?? {};
        state.articlesByIdByWorld =
          incomingState.articlesByIdByWorld ?? state.articlesByIdByWorld ?? {};
      }

      return migrateWorldArticlesState(state as WorldArticlesState);
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

const selectWorldArticlesByIdState = (state: {
  articleState: Partial<WorldArticlesState>;
}) => state.articleState?.worldArticlesById ?? {};

const selectArticlesByIdByWorldState = (state: {
  articleState: Partial<WorldArticlesState>;
}) => state.articleState?.articlesByIdByWorld ?? {};

const selectDetailStateByWorldState = (state: {
  articleState: Partial<WorldArticlesState>;
}) => state.articleState?.detailStateByWorld ?? {};

const selectWorldId = (
  _state: { articleState: WorldArticlesState },
  worldId: string,
) => worldId;

export const selectWorldArticles = (state: {
  articleState: Partial<WorldArticlesState>;
}) => state.articleState?.worldArticlesById ?? {};

export const selectWorldArticleMapByWorld = (worldId: string) =>
  createSelector([selectArticlesByIdByWorldState], (articlesByIdByWorld) => {
    return articlesByIdByWorld[worldId] || {};
  });

export const selectIsLoadingWorldArticles = (state: {
  articleState: Partial<WorldArticlesState>;
}) => state.articleState?.isLoadingWorldArticles ?? false;

const placeholderArticle: WorldArticles = {
  world: initialWorld,
  articles: [initialArticle],
};

export const selectWorldArticlesByWorld = (worldId: string) =>
  createSelector([selectWorldArticlesByIdState], (worldArticlesById) => {
    return worldArticlesById?.[worldId] || placeholderArticle;
  });

export const selectWorldArticleStats = createSelector(
  [selectWorldArticlesByIdState, selectWorldId],
  (worldArticlesById, worldId) => {
    const worldArticle = worldArticlesById[worldId];

    const articles = worldArticle?.articles ?? [initialArticle];
    let stubCount = 0;
    let draftCount = 0;

    for (const article of articles) {
      if (article.tags && article.tags.includes("stub")) {
        stubCount += 1;
      }

      if (article.isDraft) {
        draftCount += 1;
      }
    }

    return {
      stubCount,
      draftCount,
    };
  },
);

export const selectWorldStatisticsSummary = createSelector(
  [selectWorldArticlesByIdState, selectWorldId],
  (worldArticlesById, worldId) => {
    const worldArticle = worldArticlesById[worldId];

    const articles = worldArticle?.articles ?? [initialArticle];

    let publishedCount = 0;
    let draftCount = 0;
    let privateCount = 0;
    let publicCount = 0;
    let totalWordCount = 0;
    let totalLikes = 0;
    let totalViews = 0;
    let totalComments = 0;
    let totalTags = 0;
    let untaggedArticles = 0;

    for (const article of articles) {
      if (article.isDraft) {
        draftCount += 1;
      } else {
        publishedCount += 1;
      }

      if (article.state === "private") {
        privateCount += 1;
      } else if (article.state === "public") {
        publicCount += 1;
      }

      totalWordCount += article.wordcount ?? 0;
      totalLikes += article.likes ?? 0;
      totalViews += article.views ?? 0;
      totalComments += article.comments?.length ?? 0;

      if (article.tags) {
        const tagsSplit = article.tags.split(",");
        totalTags += tagsSplit.length;
      } else {
        untaggedArticles += 1;
      }
    }

    return {
      publishedCount,
      draftCount,
      privateCount,
      publicCount,
      totalWordCount,
      totalLikes,
      totalViews,
      totalComments,
      totalTags,
      untaggedArticles,
      articleCount: articles.length,
    };
  },
);

export const selectCurrentDetailStateByWorld = (worldId: string) =>
  createSelector([selectDetailStateByWorldState], (detailStateByWorld) => {
    const currentDetailState = detailStateByWorld[worldId];

    const placeholderState: WorldArticleDetailState = {
      world: initialWorld,
      isFullDetail: false,
    };

    return currentDetailState || placeholderState;
  });

export default articleSlice.reducer;
