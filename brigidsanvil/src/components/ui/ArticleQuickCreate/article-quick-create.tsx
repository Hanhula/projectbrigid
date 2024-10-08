import { useWorldAnvilAPI } from "@/components/api/worldanvil";
import { selectIdentity, selectWorld } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
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
import Head from "next/head";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
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
    tags: "",
  });

  const [articleData, setArticleData] = useState<Article | null>(null);
  const [renderDetails, setRenderDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setForm({
      title: "",
      type: Object.keys(ArticleTypes)[0],
      body: "",
      fullfooter: "",
      tags: "",
    });
    setRenderDetails(false);
    setArticleData(null);
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
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const selectedType = Object.entries(ArticleTypes).find(
      ([key, value]) => key === form.type
    );
    if (!selectedType) {
      console.error("Invalid type");
      return;
    }
    const selectedTypeTrimmed =
      selectedType[1].charAt(0).toLowerCase() + selectedType[1].slice(1);

    const article: CreateArticle = {
      title: form.title,
      templateType: selectedTypeTrimmed,
      content: form.body,
      tags: form.tags,
      fullfooter: form.fullfooter,
      world: {
        id: world.id,
      },
    };

    createArticle(article)
      .then((data) => {
        getArticle(data.id, true);
        setRenderDetails(true);
        setArticleData(data);
      })
      .catch((err) => {
        setError(err.message);
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
              />
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

        <Button
          variant="primary"
          type="submit"
          onClick={onSubmit}
          className="create-button"
        >
          Submit
        </Button>
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
        <Alert variant="danger">
          An error has occurred! Please take a screenshot of this page and show
          @hanhula.<br></br>Error message: {error}
        </Alert>
      )}
    </Container>
  );
};
