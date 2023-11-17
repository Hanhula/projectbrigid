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
  editedArticles: ArticleEditState[] | any[];
};

export type WorldArticlesState = {
  worldArticles: WorldArticles[];
  currentWorldArticles: WorldArticles;
  isLoadingWorldArticles: boolean;
  detailState: WorldArticleDetailState[];
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

let initialEditState: EditState = {
  world: initialWorld,
  editedArticles: [
    {
      articleID: "",
      fieldsChanged: { fieldIdentifier: "", editedContent: "" },
    },
  ],
};

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
  detailState: [initialDetail],
  editState: [initialEditState],
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
    setEditStateByWorld(state, action) {
      const { world, editedArticles } = action.payload;

      if (state.editState) {
        const existingEditStateIndex = state.editState.findIndex(
          (editState) => editState.world.id === world.id
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
      } else {
        state.editState = [initialEditState];
        state.editState.push({
          world,
          editedArticles,
        });
      }
    },
    setEditedArticle(state, action) {
      const { world, articleID, fieldsChanged } = action.payload;

      let editState = state.editState.find(
        (editState) => editState.world.id === world.id
      );

      if (!editState) {
        editState = { world, editedArticles: [] };
        state.editState.push(editState);
      }

      let editedArticle = editState.editedArticles.find(
        (editedArticle) => editedArticle.articleID === articleID
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
        (editState) => editState.world.id === world.id
      );

      if (!editState) {
        editState = { world, editedArticles: [] };
        state.editState.push(editState);
      }

      let editedArticle = editState.editedArticles.find(
        (editedArticle) => editedArticle.articleID === articleID
      );

      if (!editedArticle) {
        editedArticle = { articleID, fieldsChanged: [] };
        editState.editedArticles.push(editedArticle);
      }

      let editedField = editedArticle.fieldsChanged.find(
        (field: FieldEditState) => field.fieldIdentifier === fieldIdentifier
      );

      if (!editedField) {
        editedField = { fieldIdentifier, editedContent: "" };
        editedArticle.fieldsChanged.push(editedField);
      }

      editedField.editedContent = editedFields;
    },
    removeEditByID(state, action) {
      const { worldID, articleID } = action.payload;
      console.log("world:", worldID);
      console.log("article:", articleID);

      const worldIndex = state.editState.findIndex(
        (editState) => editState.world.id === worldID
      );

      console.log("worldindex:", worldIndex);

      if (worldIndex !== -1) {
        const articleIndex = state.editState[
          worldIndex
        ].editedArticles.findIndex(
          (editedArticle) => editedArticle.articleID === articleID
        );

        console.log("articleindex:", articleIndex);

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
  setEditStateByWorld,
  setEditedArticle,
  setEditedContentByID,
  removeEditByID,
} = articleSlice.actions;

export const selectWorldArticles = (state: {
  articleState: WorldArticlesState;
}) => state.articleState.worldArticles;

export const selectIsLoadingWorldArticles = (state: {
  articleState: WorldArticlesState;
}) => state.articleState.isLoadingWorldArticles;

export const selectWorldArticlesByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    const worldArticle = state.articleState.worldArticles.find(
      (worldArticle) => worldArticle.world.id === worldId
    );

    const placeholderArticle: WorldArticles = {
      world: initialWorld,
      articles: [initialArticle],
    };

    return worldArticle || placeholderArticle;
  };

export const selectCurrentDetailStateByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    const currentDetailState = state.articleState.detailState.find(
      (detailState) => detailState.world.id === worldId
    );

    const placeholderState: WorldArticleDetailState = {
      world: initialWorld,
      isFullDetail: false,
    };

    return currentDetailState || placeholderState;
  };

export const selectEditState = (state: { articleState: WorldArticlesState }) =>
  state.articleState.editState;

// Select the edited articles for a specific world
export const selectEditedArticlesByWorld =
  (worldId: string) => (state: { articleState: WorldArticlesState }) => {
    const editState = state.articleState.editState.find(
      (editState) => editState.world.id === worldId
    );

    return editState?.editedArticles || [];
  };

// Select the edited content for a specific article within a world
export const selectEditedContentByID =
  (worldId: string, articleID: string) =>
  (state: { articleState: WorldArticlesState }) => {
    const editState = state.articleState.editState.find(
      (editState) => editState.world.id === worldId
    );

    const editedArticle = editState?.editedArticles.find(
      (editedArticle) => editedArticle.articleID === articleID
    );

    return editedArticle?.fieldsChanged || [];
  };

export const makeSelectCurrentArticles = () =>
  createSelector([selectWorldArticles, selectWorld], (worldArticles, world) => {
    const currentWorldArticles = worldArticles.find(
      (wa) => wa.world.id === world.id
    ) || {
      world: { id: "" },
      articles: [],
    };

    return currentWorldArticles.articles;
  });

export const selectCurrentArticles = makeSelectCurrentArticles();

export const makeSelectEditedContentByID = (
  worldId: string,
  articleId: string,
  fieldIdentifier: string
) =>
  createSelector([selectEditState], (editState) => {
    const worldEditState = editState.find(
      (editState) => editState.world.id === worldId
    );

    const editedArticle = worldEditState?.editedArticles.find(
      (editedArticle) => editedArticle.articleID === articleId
    );

    const editedField = editedArticle?.fieldsChanged.find(
      (field: FieldEditState) => field.fieldIdentifier === fieldIdentifier
    );

    return editedField?.editedContent || "";
  });

export default articleSlice.reducer;
