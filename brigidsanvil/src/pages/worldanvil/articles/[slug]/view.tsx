import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";

import ArticleView from "@/components/ui/ArticleView/article-view";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import IdentityForm from "@/components/ui/Identity/identity";

export async function getServerSideProps(context: any) {
  return {
    props: {},
  };
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <Head>
        <title>Article Viewer</title>
      </Head>
      {!authToken || (!identity.success && <IdentityForm></IdentityForm>)}
      {authToken && identity.success && <ArticleView article={article} />}
    </div>
  );
};

export default ArticlePage;
