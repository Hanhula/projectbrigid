import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import yabbcode from "ya-bbcode";
import React from "react";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";
import { Col, Row } from "react-bootstrap";

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const parser = new yabbcode();

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  let content = article.content ? article.content : "";
  const parsedField = WorldAnvilParser.parseField(content);

  const parsedSidebarTop = article.sidepanelcontenttop
    ? WorldAnvilParser.parseField(article.sidepanelcontenttop)
    : "";

  const parsedSidepanelContent = article.sidepanelcontent
    ? WorldAnvilParser.parseField(article.sidepanelcontent)
    : "";

  const parsedSidebarContent = article.sidebarcontent
    ? WorldAnvilParser.parseField(article.sidebarcontent)
    : "";

  const parsedSidebarBottom = article.sidebarcontentbottom
    ? WorldAnvilParser.parseField(article.sidebarcontentbottom)
    : "";

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <Row>
        <Col md={8}>
          <div>{parsedField}</div>
        </Col>
        <Col md={4}>
          <div>{parsedSidebarTop}</div>
          <div>{parsedSidepanelContent}</div>
          <div>{parsedSidebarContent}</div>
          <div>{parsedSidebarBottom}</div>
        </Col>
      </Row>
    </div>
  );
};

export default ArticlePage;
