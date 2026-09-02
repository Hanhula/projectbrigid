import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { selectWorld } from "@/components/store/apiSlice";
import { addArticleToWorld } from "@/components/store/articlesSlice";
import { addNotification } from "@/components/store/notificationsSlice";
import { ArticleTypes, CreateArticle } from "@/components/types/article";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FullCreate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const world = useSelector(selectWorld);
  const { createArticle, getArticle } = useWorldAnvilAPI();
  const [title, setTitle] = useState("");
  const [type, setType] = useState(Object.keys(ArticleTypes)[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasSelectedWorld = typeof world?.id === "string" && world.id.length > 0;

  const getSelectedType = () => {
    const selectedType = ArticleTypes[type as keyof typeof ArticleTypes];
    if (!selectedType) {
      setError("Article type is required.");
      return null;
    }

    return selectedType;
  };

  const getDraftArticle = (draftId: string, selectedType: string) => ({
    id: draftId,
    slug: draftId,
    title: title.trim(),
    entityClass: selectedType,
    templateType: selectedType.charAt(0).toLowerCase() + selectedType.slice(1),
    state: "public",
    isWip: false,
    isDraft: true,
    isLocalDraft: true,
    icon: null,
    url: "",
    subscribergroups: [],
    folderId: "",
    tags: "",
    updateDate: {
      date: "",
      timezone_type: 0,
      timezone: "",
    },
    content: "",
    excerpt: "",
    fullfooter: "",
    cssClasses: "",
  });

  const validateForm = () => {
    if (!hasSelectedWorld) {
      const message = "Select a world before creating an article.";
      setError(message);
      dispatch(addNotification(message, "danger"));
      return null;
    }

    if (!title.trim()) {
      setError("Title is required.");
      return null;
    }

    return getSelectedType();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }

    const selectedType = validateForm();
    if (!selectedType) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const article: CreateArticle = {
      title: trimmedTitle,
      templateType:
        selectedType.charAt(0).toLowerCase() + selectedType.slice(1),
      content: "",
      tags: "",
      fullfooter: "",
      excerpt: "",
      state: "public",
      isDraft: true,
      cssClasses: "",
      world: { id: world.id },
    };

    try {
      const createdArticle = await createArticle(article);
      await getArticle(createdArticle.id, true);
      dispatch(
        addNotification("Article created. Opening full editor.", "success"),
      );
      await router.push(`/worldanvil/articles/${createdArticle.id}/edit`);
    } catch (createError) {
      console.error("Error creating article:", createError);
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create article.",
      );
      dispatch(addNotification("Unable to create article.", "danger"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateLocally = async () => {
    const selectedType = validateForm();
    if (!selectedType) {
      return;
    }

    const draftId = `local-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`;
    dispatch(
      addArticleToWorld({
        world,
        article: getDraftArticle(draftId, selectedType),
      }),
    );
    dispatch(
      addNotification(
        "Local article created. You can save it to World Anvil later.",
        "success",
      ),
    );
    await router.push(`/worldanvil/articles/${draftId}/edit`);
  };

  return (
    <>
      <Head>
        <title>Full Create | Brigid&apos;s Anvil</title>
      </Head>
      <Container className="py-4 full-create-container">
        <Row>
          <Col md={8} lg={6}>
            <h1>Full Create</h1>
            <p className="text-muted">
              Create your article! Either let Brigid create it on WorldAnvil for
              you, or create it locally and save it to WorldAnvil later. We aim
              to save local drafts, but can't guarantee their safety!
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="full-create-title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  autoFocus
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="full-create-type">
                <Form.Label>Article type</Form.Label>
                <Form.Select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  {Object.entries(ArticleTypes).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {error && <div className="alert alert-danger">{error}</div>}
              {!hasSelectedWorld && (
                <div className="alert alert-warning">
                  Select a world before creating an article.
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || !hasSelectedWorld}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Creating...
                  </>
                ) : (
                  "Create and open editor"
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="ms-2"
                onClick={() => void handleCreateLocally()}
                disabled={isSubmitting || !hasSelectedWorld}
              >
                Create locally and save to World Anvil later
              </Button>
              <p className="text-muted">
                Please remember that this is a beta feature, and all data is
                stored locally on your machine!
              </p>
              <p className="text-muted">
                We autosave all changes locally, but will NEVER update
                WorldAnvil without permission. If you need to navigate away from
                Brigid and aren't sure if your device will save your data,
                remember you can always export your changes and import them
                later!
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
