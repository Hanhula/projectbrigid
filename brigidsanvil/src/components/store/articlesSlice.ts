import { createSelector, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Article, WorldArticle, WorldArticles } from "../types/article";
import { Image } from "../types/image";
import { User } from "../types/user";
import { World } from "../types/world";
import { selectWorld } from "./apiSlice";

export type WorldArticleDetailState = {
  world: World;
  isFullDetail: boolean;
};

export type FieldEditState = {
  fieldIdentifier: string;
  editedContent: string;
};

export type ArticleEditState = {
  articleID: string;
  fieldsChanged: FieldEditState[];
};

export type EditState = {
  world: World;
  editedArticles: ArticleEditState[];
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
  editState: EditState[];
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
  state.editState = state.editState ?? [];
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
    editState: articleState?.editState ?? [],
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
  editState: [],
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
    resetArticleState(state) {
      state.worldArticles = initialState.worldArticles;
      state.currentWorldArticles = initialState.currentWorldArticles;
      state.isLoadingWorldArticles = initialState.isLoadingWorldArticles;
      state.detailState = initialState.detailState;
      state.worldArticlesById = {};
      state.detailStateByWorld = {};
      state.articleIdsByWorld = {};
      state.articlesByIdByWorld = {};
      state.editState = [];
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
    setEditStateByWorld(state, action) {
      const { world, editedArticles } = action.payload;

      const existingEditStateIndex = state.editState.findIndex(
        (editState) => editState.world.id === world.id,
      );

      if (existingEditStateIndex !== -1) {
        state.editState[existingEditStateIndex] = {
          world,
          editedArticles,
        };
      } else {
        state.editState.push({
          world,
          editedArticles,
        });
      }
    },
    setEditedArticle(state, action) {
      const { world, articleID, fieldsChanged } = action.payload;

      let editState = state.editState.find(
        (editState) => editState.world.id === world.id,
      );

      if (!editState) {
        editState = { world, editedArticles: [] };
        state.editState.push(editState);
      }

      let editedArticle = editState.editedArticles.find(
        (editedArticle) => editedArticle.articleID === articleID,
      );

      if (!editedArticle) {
        editedArticle = { articleID, fieldsChanged: [] };
        editState.editedArticles.push(editedArticle);
      }

      editedArticle.fieldsChanged = fieldsChanged;
    },
    setEditedContentByID(state, action) {
      const { world, articleID, fieldIdentifier, editedFields } =
        action.payload;

      let editState = state.editState.find(
        (editState) => editState.world.id === world.id,
      );

      if (!editState) {
        editState = { world, editedArticles: [] };
        state.editState.push(editState);
      }

      let editedArticle = editState.editedArticles.find(
        (editedArticle) => editedArticle.articleID === articleID,
      );

      if (!editedArticle) {
        editedArticle = { articleID, fieldsChanged: [] };
        editState.editedArticles.push(editedArticle);
      }

      let editedField = editedArticle.fieldsChanged.find(
        (field: FieldEditState) => field.fieldIdentifier === fieldIdentifier,
      );

      if (!editedField) {
        editedField = { fieldIdentifier, editedContent: "" };
        editedArticle.fieldsChanged.push(editedField);
      }

      editedField.editedContent = editedFields;
    },
    removeEditByID(state, action) {
      const { worldId, articleID } = action.payload;

      const worldIndex = state.editState.findIndex(
        (editState) => editState.world.id === worldId,
      );

      if (worldIndex !== -1) {
        const articleIndex = state.editState[
          worldIndex
        ].editedArticles.findIndex(
          (editedArticle) => editedArticle.articleID === articleID,
        );

        if (articleIndex !== -1) {
          state.editState[worldIndex].editedArticles.splice(articleIndex, 1);
          if (state.editState[worldIndex].editedArticles.length === 0) {
            state.editState.splice(worldIndex, 1);
          }
        }
      }
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
        state.editState = incomingState.editState ?? state.editState ?? [];
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
  resetArticleState,
  updateArticleById,
  setEditStateByWorld,
  setEditedArticle,
  setEditedContentByID,
  removeEditByID,
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

export const selectEditState = (state: { articleState: WorldArticlesState }) =>
  state.articleState.editState;

// Select the edited articles for a specific world
export const selectEditedArticlesByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    const editState = state.articleState.editState.find(
      (editState) => editState.world.id === worldId,
    );

    return editState?.editedArticles || [];
  };

// Select the edited content for a specific article within a world
export const selectEditedContentByID =
  (worldId: string, articleID: string) =>
  (state: { articleState: WorldArticlesState }) => {
    const editState = state.articleState.editState.find(
      (editState) => editState.world.id === worldId,
    );

    const editedArticle = editState?.editedArticles.find(
      (editedArticle) => editedArticle.articleID === articleID,
    );

    return editedArticle?.fieldsChanged || [];
  };

export const makeSelectCurrentArticles = () =>
  createSelector(
    [selectWorldArticlesByIdState, selectWorld],
    (worldArticlesById, world) => {
      return worldArticlesById[world.id]?.articles ?? [];
    },
  );

export const selectCurrentArticles = makeSelectCurrentArticles();

export const makeSelectEditedContentByID = (
  worldId: string,
  articleId: string,
  fieldIdentifier: string,
) =>
  createSelector([selectEditState], (editState) => {
    const worldEditState = editState.find(
      (editState) => editState.world.id === worldId,
    );

    const editedArticle = worldEditState?.editedArticles.find(
      (editedArticle) => editedArticle.articleID === articleId,
    );

    const editedField = editedArticle?.fieldsChanged.find(
      (field: FieldEditState) => field.fieldIdentifier === fieldIdentifier,
    );

    return editedField?.editedContent || "";
  });

export default articleSlice.reducer;
