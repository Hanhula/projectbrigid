import { useDispatch, useSelector } from "react-redux";
import { selectAuthToken } from "../store/authSlice";
import {
  selectCurrentDetailStateByWorld,
  selectWorldArticlesByWorld,
  setWorldArticles,
  updateArticleById,
} from "../store/articlesSlice";
import {
  selectCurrentCategoryDetailStateByWorld,
  selectWorldCategoriesByWorld,
  setWorldCategories,
  updateCategoryById,
} from "../store/categoriesSlice";
import {
  selectIdentity,
  setIdentity,
  setWorld,
  setWorlds,
  selectWorld,
  setLoadingArticles,
  setLoadingCategories,
} from "@/components/store/apiSlice";

export function useWorldAnvilState() {
  const dispatch = useDispatch();
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const worldCategories = useSelector(selectWorldCategoriesByWorld(world.id));
  const currentArticles = worldArticles!.articles;
  const currentCategories = worldCategories!.categories;
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );
  const currentCategoryDetailState = useSelector(
    selectCurrentCategoryDetailStateByWorld(world.id)
  );

  return {
    dispatch,
    identity,
    authToken,
    world,
    worldArticles,
    worldCategories,
    currentArticles,
    currentCategories,
    currentDetailState,
    currentCategoryDetailState,
    setIdentity: (data: any) => dispatch(setIdentity(data)),
    setWorld: (data: any) => dispatch(setWorld(data)),
    setWorlds: (data: any) => dispatch(setWorlds(data)),
    setLoadingArticles: (isLoading: boolean) =>
      dispatch(setLoadingArticles(isLoading)),
    setLoadingCategories: (isLoading: boolean) =>
      dispatch(setLoadingCategories(isLoading)),
    setWorldArticles: (fetchedArticles: any) =>
      dispatch(setWorldArticles(fetchedArticles)),
    setWorldCategories: (fetchedArticles: any) =>
      dispatch(setWorldCategories(fetchedArticles)),
    updateArticleById: (worldArticle: any) =>
      dispatch(updateArticleById(worldArticle)),
    updateCategoryById: (worldCategory: any) =>
      dispatch(updateCategoryById(worldCategory)),
  };
}
