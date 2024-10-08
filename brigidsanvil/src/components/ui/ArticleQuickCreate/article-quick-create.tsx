import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { selectWorld } from "@/components/store/apiSlice";
import {
  Article,
  ArticleTypes,
  CreateArticle,
} from "@/components/types/article";
import {
  generateArticleBlock,
  generateMention,
} from "@/components/ui/Table/table-helpers";
import { faFileEdit, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export const ArticleQuickCreate = () => {
  const world = useSelector(selectWorld);
  const { createArticle, getArticle } = useWorldAnvilAPI();

  const [form, setForm] = useState({
    title: "",
    type: Object.keys(ArticleTypes)[0],
    body: "",
    fullfooter: "",
    excerpt: "",
    tags: "",
    privacy: "public",
    draft: "true",
  });

  const [articleData, setArticleData] = useState<Article | null>(null);
  const [renderDetails, setRenderDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkValidity = () => {
    if (form.title.trim() === "") {
      setIsTitleInvalid(true);
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setForm({
      title: "",
      type: Object.keys(ArticleTypes)[0],
      body: "",
      fullfooter: "",
      excerpt: "",
      tags: "",
      privacy: "public",
      draft: "true",
    });
    setRenderDetails(false);
    setError(null);
    setIsTitleInvalid(false);
    setArticleData(null);
  };

  const handleBlur = () => {
    checkValidity();
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "title") {
      setIsTitleInvalid(false);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!checkValidity()) {
      setError("Title is required");
      return;
    }

    const selectedType = Object.entries(ArticleTypes).find(
      ([key, value]) => key === form.type
    );

    if (!selectedType) {
      setError("Invalid article type selected");
      return;
    }

    setIsSubmitting(true);

    const selectedTypeTrimmed =
      selectedType[1].charAt(0).toLowerCase() + selectedType[1].slice(1);

    const article: CreateArticle = {
      title: form.title,
      templateType: selectedTypeTrimmed,
      content: form.body,
      tags: form.tags,
      fullfooter: form.fullfooter,
      excerpt: form.excerpt,
      state: form.privacy,
      isDraft: form.draft === "true",
      world: {
        id: world.id,
      },
    };

    createArticle(article)
      .then((data) => {
        getArticle(data.id, true).then((articleData) => {
          setRenderDetails(true);
          setArticleData(articleData);
          setIsSubmitting(false);
        });
      })
      .catch((err) => {
        setError(err.message);
        setIsSubmitting(false);
      });
  };
  return (
    <Container className="quick-create">
      <h1
        className="text-center"
        style={{ marginTop: "0.3em", padding: "0.2em" }}
      >
        Quick Create
      </h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formTitle" className="form-section">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={form.title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                isInvalid={isTitleInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {"Please input a title! >:("}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formType" className="form-section">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                onChange={handleInputChange}
                value={form.type}
              >
                {Object.entries(ArticleTypes).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBody" className="form-section">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            rows={3}
            onChange={handleInputChange}
            value={form.body}
          />
        </Form.Group>

        <Form.Group controlId="formBody" className="form-section">
          <Form.Label>Full Footer</Form.Label>
          <Form.Control
            as="textarea"
            name="fullfooter"
            rows={1}
            onChange={handleInputChange}
            value={form.fullfooter}
          />
        </Form.Group>

        <Form.Group controlId="formExcerpt" className="form-section">
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            name="excerpt"
            onChange={handleInputChange}
            value={form.excerpt}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="formTags" className="form-section">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                placeholder="Enter tags"
                onChange={handleInputChange}
                value={form.tags}
              />
              <Form.Text>
                Tags should be entered as a comma-separated list.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md="2">
            <Form.Group controlId="formPrivacy" className="form-section">
              <Form.Label>Privacy</Form.Label>
              <Form.Select
                name="privacy"
                onChange={handleInputChange}
                value={form.privacy}
              >
                <option value={"public"}>Public</option>
                <option value={"private"}>Private</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="2">
            <Form.Group controlId="formDraft" className="form-section">
              <Form.Label>Publication Status</Form.Label>
              <Form.Select
                name="draft"
                onChange={handleInputChange}
                value={form.draft}
              >
                <option value={"true"}>Draft</option>
                <option value={"false"}>Published</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="submit-container">
          <Button
            variant="primary"
            type="submit"
            onClick={onSubmit}
            className="create-button"
          >
            Submit
          </Button>
          {isSubmitting && <Spinner animation="border" size="sm" />}
        </div>
      </Form>
      {renderDetails && articleData && (
        <div className="render-details-container">
          <Alert variant="success">
            <Alert.Heading>Article Created</Alert.Heading>
            <p>
              Article '{articleData.title}' has been created successfully with
              ID: {articleData.id}
            </p>
          </Alert>
          <div className="button-container">
            <div className="button-desc">
              Do something with the new article:{" "}
            </div>
            <OverlayTrigger
              key="mention-tooltip"
              placement="top"
              overlay={<Tooltip id={`mention-tooltip`}>Copy Mention</Tooltip>}
            >
              {generateMention(
                articleData.id,
                articleData.entityClass,
                articleData.title
              )}
            </OverlayTrigger>
            <OverlayTrigger
              key="block-tooltip"
              placement="top"
              overlay={
                <Tooltip id={`block-tooltip`}>Copy Article Block</Tooltip>
              }
            >
              {generateArticleBlock(articleData.id)}
            </OverlayTrigger>
            <OverlayTrigger
              key="url-tooltip"
              placement="top"
              overlay={<Tooltip id={`url-tooltip`}>Go to View Page</Tooltip>}
            >
              <a href={articleData.url}>
                <Button className="url" variant="primary">
                  <FontAwesomeIcon icon={faLink} />
                </Button>
              </a>
            </OverlayTrigger>

            <OverlayTrigger
              key="edit-url-tooltip"
              placement="top"
              overlay={
                <Tooltip id={`edit-url-tooltip`}>Go to Edit Page</Tooltip>
              }
            >
              <a href={articleData.editURL}>
                <Button className="edit-url" variant="primary">
                  <FontAwesomeIcon icon={faFileEdit} />
                </Button>
              </a>
            </OverlayTrigger>
          </div>
          <div className="render-utils">
            <div>Create another?</div>
            <Button onClick={resetForm}>Reset Form</Button>
          </div>
        </div>
      )}
      {error && (
        <div className="render-details-container">
          <Alert variant="danger">
            An error has occurred! If it's a server error, please take a
            screenshot of this page and show @hanhula.<br></br>Error message:{" "}
            {error}
          </Alert>
        </div>
      )}
    </Container>
  );
};
