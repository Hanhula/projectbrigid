import { Article, ArticleTypes, CreateArticle } from "@/types/article";
import { World } from "@/types/world";
import { createArticle, getArticle } from "@/utils/apiUtils";
import { generateArticleBlock, generateMention } from "@/utils/articleUtils";
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

export const QuickCreate = () => {
  const [form, setForm] = useState({
    title: "",
    type: Object.keys(ArticleTypes)[0],
    body: "",
    fullfooter: "",
    excerpt: "",
    tags: "",
    privacy: "public",
    draft: "true",
    cssClasses: "",
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
      cssClasses: "",
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

  const onSubmit = async (event: React.FormEvent) => {
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

    const world: World | null = await storage.getItem("local:selectedWorld");
    console.log(world);
    if (world) {
      const article: CreateArticle = {
        title: form.title,
        templateType: selectedTypeTrimmed,
        content: form.body,
        tags: form.tags,
        fullfooter: form.fullfooter,
        excerpt: form.excerpt,
        state: form.privacy,
        isDraft: form.draft === "true",
        cssClasses: form.cssClasses,
        world: {
          id: world.id,
        },
      };

      createArticle(article)
        .then((data) => {
          setRenderDetails(true);
          setArticleData(data);
          getArticle(data.id).then((articleData) => {
            setArticleData(articleData);
            setIsSubmitting(false);
          });
        })
        .catch((err) => {
          setError(err.message);
          setIsSubmitting(false);
        });
    } else {
      setError("No world selected");
    }
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
        <Row>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="formFooter" className="form-section">
            <Form.Label>Full Footer</Form.Label>
            <Form.Control
              as="textarea"
              name="fullfooter"
              rows={1}
              onChange={handleInputChange}
              value={form.fullfooter}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formExcerpt" className="form-section">
            <Form.Label>Excerpt</Form.Label>
            <Form.Control
              name="excerpt"
              onChange={handleInputChange}
              value={form.excerpt}
              maxLength={255}
            />
          </Form.Group>
        </Row>
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
          <Col md="3">
            <Form.Group controlId="formCSSClasses" className="form-section">
              <Form.Label>CSS Classes</Form.Label>
              <Form.Control
                type="text"
                name="cssClasses"
                placeholder="Enter CSS classes"
                onChange={handleInputChange}
                value={form.cssClasses}
              />
              <Form.Text>
                CSS classes should be entered as a comma-separated list.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
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
          <Col>
            <Form.Group controlId="formDraft" className="form-section">
              <Form.Label>Publication</Form.Label>
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
        <Row>
          <Col>
            <Container className="submit-container m-2">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="create-button"
              >
                Submit
              </Button>
              {isSubmitting && <Spinner animation="border" size="sm" />}
              {isSubmitting && (
                <span>
                  Creating & updating logic... If this is still here but it says
                  it's done, it's still updating so the Edit URL button works!
                </span>
              )}
            </Container>
          </Col>
        </Row>
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
                  View
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
                  Edit
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
