import { Article, WorldArticles } from "../types/article";
import { World } from "../types/world";
import { createTransform } from "redux-persist";
import { WorldArticleDetailState } from "./articlesSlice";

export function mapToObject(map: Map<string, any>): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value;
  }
  return obj;
}

function objectToMap(obj: Record<string, any>): Map<string, any> {
  const map = new Map();
  for (const key in obj) {
    map.set(key, obj[key]);
  }
  return map;
}

export const articleMapTransform = createTransform(
  (inboundState: any) => {
    return {
      ...inboundState,
      worldArticles:
        inboundState.worldArticles instanceof Map
          ? mapToObject(inboundState.worldArticles)
          : inboundState.worldArticles,
      detailState:
        inboundState.detailState instanceof Map
          ? mapToObject(inboundState.detailState)
          : inboundState.detailState,
    };
  },
  (outboundState: any) => {
    return {
      ...outboundState,
      worldArticles:
        outboundState.worldArticles &&
        !(outboundState.worldArticles instanceof Map)
          ? objectToMap(outboundState.worldArticles)
          : outboundState.worldArticles,
      detailState:
        outboundState.detailState && !(outboundState.detailState instanceof Map)
          ? objectToMap(outboundState.detailState)
          : outboundState.detailState,
    };
  },
  { whitelist: ["articleState"] }
);

export const migrateWorldArraysToMaps = (
  worldArticles: { world: World; articles: Article[] }[]
) => {
  const worldArticleMap: Map<string, WorldArticles> = new Map();
  worldArticles.forEach((worldArticle) => {
    if (!Array.isArray(worldArticle.articles)) {
      console.log("Error migrating arrays to maps. Report this to @Hanhula!");
      return;
    }

    const articleArray = worldArticle.articles;
    const articlesMap: Map<string, Article> = new Map();
    articleArray.forEach((article) => {
      articlesMap.set(article.id, article);
    });

    const newWorldArticle: WorldArticles = {
      world: worldArticle.world,
      articles: articlesMap,
    };

    worldArticleMap.set(worldArticle.world.id, newWorldArticle);
  });

  return worldArticleMap;
};

export const migrateDetailArraysToMaps = (
  detailArray: WorldArticleDetailState[]
) => {
  const detailMap: Map<string, WorldArticleDetailState> = new Map();
  detailArray.forEach((detailState) => {
    const newWorldDetailState: WorldArticleDetailState = {
      world: detailState.world,
      isFullDetail: detailState.isFullDetail,
    };

    detailMap.set(detailState.world.id, newWorldDetailState);
  });

  return detailMap;
};
