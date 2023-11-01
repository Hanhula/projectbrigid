import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";

import ArticleView from "@/components/ui/ArticleView/article-view";

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  return <ArticleView article={article} />;
};

export default ArticlePage;
