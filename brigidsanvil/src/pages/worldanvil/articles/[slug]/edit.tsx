import { selectWorld } from "@/components/store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEditByID,
  selectCurrentArticles,
  selectEditedArticlesByWorld,
} from "@/components/store/articlesSlice";
import { addNotification } from "@/components/store/notificationsSlice";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import ArticleEdit from "@/components/ui/ArticleEdit/ArticleComponents/article-edit";
import CharacterEdit from "@/components/ui/ArticleEdit/ArticleComponents/character-edit";
import ConditionEdit from "@/components/ui/ArticleEdit/ArticleComponents/condition-edit";
import DocumentEdit from "@/components/ui/ArticleEdit/ArticleComponents/document-edit";
import EthnicityEdit from "@/components/ui/ArticleEdit/ArticleComponents/ethnicity-edit";
import FormationEdit from "@/components/ui/ArticleEdit/ArticleComponents/formation-edit";
import ItemEdit from "@/components/ui/ArticleEdit/ArticleComponents/item-edit";
import MaterialEdit from "@/components/ui/ArticleEdit/ArticleComponents/material-edit";
import RitualEdit from "@/components/ui/ArticleEdit/ArticleComponents/ritual-edit";
import VehicleEdit from "@/components/ui/ArticleEdit/ArticleComponents/vehicle-edit";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { useMemo, useState } from "react";

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
  Ethnicity: EthnicityEdit as ArticleEditPageComponent,
  Formation: FormationEdit as ArticleEditPageComponent,
  Item: ItemEdit as ArticleEditPageComponent,
  Person: CharacterEdit as ArticleEditPageComponent,
  Material: MaterialEdit as ArticleEditPageComponent,
  Ritual: RitualEdit as ArticleEditPageComponent,
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
  const [discardAction, setDiscardAction] = useState<
    "reset" | "refresh" | null
  >(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();

  const world = useSelector(selectWorld);
  const currentArticles = useSelector(selectCurrentArticles);
  const selectEditedArticles = useMemo(
    () => selectEditedArticlesByWorld(world.id),
    [world.id],
  );
  const editedArticles = useSelector(selectEditedArticles);

  const worldAnvilAPI = useWorldAnvilAPI();

  const article = currentArticles.find((article) => article.id === slug);
  const hasPendingEdits = article
    ? editedArticles.some(
        (editedArticle) => editedArticle.articleID === article.id,
      )
    : false;
  const EditPageComponent = article
    ? articleEditPageRegistry[
        article.entityClass as keyof typeof articleEditPageRegistry
      ]
    : undefined;

  const resetContent = () => {
    if (!article) {
      return;
    }

    dispatch(removeEditByID({ worldID: world.id, articleID: article.id }));
    setResetSignal((value) => value + 1);
  };

  const handleResetContent = () => {
    if (hasPendingEdits) {
      setDiscardAction("reset");
      return;
    }

    resetContent();
  };

  const handleSaveContent = async () => {
    try {
      await worldAnvilAPI.updateEditedArticleByFields(article!.id);
      console.info("Article updated successfully");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const refreshContent = async () => {
    if (!article) {
      return;
    }

    setIsRefreshing(true);
    resetContent();

    try {
      await worldAnvilAPI.getArticle(article.id, true);
      dispatch(
        addNotification("Content refreshed from WorldAnvil.", "success"),
      );
    } catch (error) {
      console.error("Error refreshing article:", error);
      dispatch(
        addNotification("Unable to refresh content from WorldAnvil.", "danger"),
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshContent = () => {
    if (hasPendingEdits) {
      setDiscardAction("refresh");
      return;
    }

    void refreshContent();
  };

  const confirmDiscardAction = () => {
    const confirmedAction = discardAction;
    setDiscardAction(null);

    if (confirmedAction === "refresh") {
      void refreshContent();
    } else if (confirmedAction === "reset") {
      resetContent();
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
              <Button
                onClick={handleRefreshContent}
                className="m-2"
                disabled={isRefreshing || !article}
              >
                {isRefreshing ? (
                  <>
                    <Spinner animation="border" size="sm" /> Refreshing...
                  </>
                ) : (
                  "Refresh Content"
                )}
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
      <Modal
        show={discardAction !== null}
        onHide={() => setDiscardAction(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {discardAction === "refresh"
              ? "Discard local edits and refresh?"
              : "Discard local edits?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {discardAction === "refresh"
            ? "Refreshing replaces this page's local edits with the latest full article content from WorldAnvil. This cannot be undone."
            : "Resetting discards this page's local edits and restores the currently loaded article content. This cannot be undone."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDiscardAction(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDiscardAction}>
            {discardAction === "refresh" ? "Refresh Content" : "Reset Content"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
