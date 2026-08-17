import { selectWorld } from "@/components/store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEditByID,
  selectCurrentArticles,
  selectEditedArticlesByWorld,
  setEditedArticle,
} from "@/components/store/articlesSlice";
import { addNotification } from "@/components/store/notificationsSlice";
import {
  ArticleEditorBackup,
  articleBackupFilename,
  createArticleEditorBackup,
  parseArticleEditorBackup,
} from "@/components/ui/ArticleEdit/EditComponents/article-edit-backup";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { useMemo, useRef, useState } from "react";

import "./edit.scss";
import Head from "next/head";
import { articleEditPageRegistry } from "@/components/ui/ArticleEdit/ArticleComponents/article-edit-page-registry";
import ArticleEditToolbar from "@/components/ui/ArticleEdit/EditComponents/article-edit-toolbar";

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
  const [importedBackup, setImportedBackup] =
    useState<ArticleEditorBackup | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

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
    ? articleEditPageRegistry[article.entityClass]?.Component
    : undefined;
  const currentEditedFields = article
    ? (
        editedArticles.find(
          (editedArticle) => editedArticle.articleID === article.id,
        )?.fieldsChanged ?? []
      ).reduce<Record<string, unknown>>((fields, field) => {
        fields[field.fieldIdentifier] = field.editedContent;
        return fields;
      }, {})
    : {};

  const resetContent = () => {
    if (!article) {
      return;
    }

    dispatch(removeEditByID({ worldID: world.id, articleID: article.id }));
    setResetSignal((value) => Math.abs(value) + 1);
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

  const handleExportBackup = () => {
    if (!article) {
      return;
    }

    try {
      const backup = createArticleEditorBackup({
        article,
        worldId: world.id,
        editedFields: currentEditedFields,
      });
      const downloadUrl = URL.createObjectURL(
        new Blob([JSON.stringify(backup, null, 2)], {
          type: "application/json",
        }),
      );
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = articleBackupFilename(article);
      downloadLink.click();
      URL.revokeObjectURL(downloadUrl);
      dispatch(addNotification("Article backup exported.", "success"));
    } catch (error) {
      console.error("Error exporting article backup:", error);
      dispatch(addNotification("Unable to export article backup.", "danger"));
    }
  };

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !article) {
      return;
    }

    try {
      const backup = parseArticleEditorBackup(JSON.parse(await file.text()));
      if (
        backup.worldId !== world.id ||
        backup.articleId !== article.id ||
        backup.entityClass !== article.entityClass
      ) {
        throw new Error("This backup belongs to a different article.");
      }
      setImportedBackup(backup);
    } catch (error) {
      console.error("Error importing article backup:", error);
      dispatch(
        addNotification(
          error instanceof Error
            ? error.message
            : "Unable to read article backup.",
          "danger",
        ),
      );
    }
  };

  const restoreBackupFields = (
    fields: Record<string, unknown>,
    message: string,
  ) => {
    if (!article) {
      return;
    }

    const fieldsChanged = Object.entries(fields).map(
      ([fieldIdentifier, editedContent]) => ({
        fieldIdentifier,
        editedContent,
      }),
    );

    if (fieldsChanged.length === 0) {
      dispatch(removeEditByID({ worldID: world.id, articleID: article.id }));
    } else {
      dispatch(
        setEditedArticle({
          world,
          articleID: article.id,
          fieldsChanged,
        }),
      );
    }

    setResetSignal((value) => -(Math.abs(value) + 1));
    setImportedBackup(null);
    dispatch(addNotification(message, "success"));
  };

  return (
    <div className="editpage">
      <Head>
        <title>
          {article?.title
            ? `Editing ${article.title} | Brigid's Anvil`
            : "Edit Article | Brigid's Anvil"}
        </title>
      </Head>
      <Container fluid="md" className="edit-container">
        <Row className="edit-row">
          <Col className="editor-col">
            <ArticleEditToolbar
              article={article}
              isRefreshing={isRefreshing}
              importInputRef={importInputRef}
              onReset={handleResetContent}
              onRefresh={handleRefreshContent}
              onSave={handleSaveContent}
              onExportBackup={handleExportBackup}
              onImportBackup={() => importInputRef.current?.click()}
              onImportFile={handleImportFile}
            />
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
      <Modal
        show={importedBackup !== null}
        onHide={() => setImportedBackup(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Restore article backup?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This backup was exported for {importedBackup?.articleTitle}. Choose
            whether to restore only its Brigid draft edits or all editor fields
            captured from WorldAnvil at export time.
          </p>
          {importedBackup?.sourceUpdateDate &&
            article?.updateDate?.date !== importedBackup.sourceUpdateDate && (
              <p className="text-warning mb-0">
                The currently loaded article has a different WorldAnvil update
                date than this backup.
              </p>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setImportedBackup(null)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              restoreBackupFields(
                importedBackup?.editedFields ?? {},
                "Draft edits restored from backup.",
              )
            }
          >
            Restore Draft Edits
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              restoreBackupFields(
                importedBackup?.sourceFields ?? {},
                "Exported field values restored from backup.",
              )
            }
          >
            Restore Exported Fields
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
