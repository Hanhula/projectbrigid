import { selectWorld } from "@/components/store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEditByID,
  selectCurrentArticles,
} from "@/components/store/articlesSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import ArticleEdit from "@/components/ui/ArticleEdit/ArticleComponents/article-edit";
import CharacterEdit from "@/components/ui/ArticleEdit/ArticleComponents/character-edit";
import MaterialEdit from "@/components/ui/ArticleEdit/ArticleComponents/material-edit";
import ConditionEdit from "@/components/ui/ArticleEdit/ArticleComponents/condition-edit";
import DocumentEdit from "@/components/ui/ArticleEdit/ArticleComponents/document-edit";
import VehicleEdit from "@/components/ui/ArticleEdit/ArticleComponents/vehicle-edit";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { useState } from "react";

import "./edit.scss";
import Link from "next/link";

type ArticleEditPageComponent = (props: {
  article: any;
  resetSignal?: number;
}) => JSX.Element;

const articleEditPageRegistry: Record<string, ArticleEditPageComponent> = {
  Article: ArticleEdit as ArticleEditPageComponent,
  Condition: ConditionEdit as ArticleEditPageComponent,
  Document: DocumentEdit as ArticleEditPageComponent,
  Person: CharacterEdit as ArticleEditPageComponent,
  Material: MaterialEdit as ArticleEditPageComponent,
  Vehicle: VehicleEdit as ArticleEditPageComponent,
};

export async function getServerSideProps(context: any) {
  return {
    props: {},
  };
}

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [resetSignal, setResetSignal] = useState(0);

  const dispatch = useDispatch();

  const world = useSelector(selectWorld);
  const currentArticles = useSelector(selectCurrentArticles);

  const worldAnvilAPI = useWorldAnvilAPI();

  const article = currentArticles.find((article) => article.id === slug);
  const EditPageComponent = article
    ? articleEditPageRegistry[
        article.entityClass as keyof typeof articleEditPageRegistry
      ]
    : undefined;

  const handleResetContent = () => {
    dispatch(removeEditByID({ worldID: world.id, articleID: article!.id }));
    setResetSignal((value) => value + 1);
  };

  const handleSaveContent = async () => {
    try {
      await worldAnvilAPI.updateEditedArticleByFields(article!.id);
      console.info("Article updated successfully");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="editpage">
      <Container>
        <Row>
          <Col className="editor-col">
            <div>
              <Button onClick={handleResetContent} className="m-2">
                Reset Content
              </Button>
              <Button onClick={handleSaveContent} className="mp-2">
                Save to WorldAnvil
              </Button>
              <Link href={article!.url}>
                <Button className="m-2">View on WorldAnvil</Button>
              </Link>
            </div>
            {article && EditPageComponent ? (
              <EditPageComponent article={article} resetSignal={resetSignal} />
            ) : (
              <div className="text-muted m-3">No edit page found!</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
