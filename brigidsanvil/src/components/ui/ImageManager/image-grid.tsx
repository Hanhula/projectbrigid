import { Button, Card, Col, Row } from "react-bootstrap";
import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Image } from "@/components/types/image";
import { copyImageId, getImageWaUrl } from "./image-actions";

type ImageGridProps = {
  images: Image[];
  selectedImageId?: string | null;
  onSelect: (image: Image) => void;
  onRequestDelete: (image: Image) => void;
};

export default function ImageGrid({
  images,
  selectedImageId,
  onSelect,
  onRequestDelete,
}: ImageGridProps) {
  const dispatch = useDispatch();

  if (images.length === 0) {
    return <p className="text-muted">No images in this folder.</p>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {images.map((image) => (
        <Col key={image.id}>
          <Card
            className={
              selectedImageId === image.id ? "border-primary" : undefined
            }
          >
            <button
              type="button"
              className="image-grid-thumb-button p-0 border-0 bg-transparent"
              title={`View ${image.title}`}
              aria-label={`View ${image.title}`}
              onClick={() => onSelect(image)}
            >
              <Card.Img
                variant="top"
                src={image.url}
                alt={image.alt || image.title}
                style={{ height: 160, objectFit: "cover" }}
              />
            </button>
            <Card.Body>
              <Card.Title
                className="text-truncate"
                title={image.title}
                style={{ fontSize: "1rem" }}
              >
                {image.title}
              </Card.Title>
              {image.tags && (
                <Card.Text className="text-muted small text-truncate">
                  {image.tags}
                </Card.Text>
              )}
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  size="sm"
                  title={`View/edit ${image.title}`}
                  aria-label={`View and edit ${image.title}`}
                  onClick={() => onSelect(image)}
                >
                  <Pencil size={14} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  title="Copy image id"
                  aria-label={`Copy id for ${image.title}`}
                  onClick={() => void copyImageId(image, dispatch)}
                >
                  <Copy size={14} aria-hidden="true" />
                </Button>
                <Button
                  as="a"
                  href={getImageWaUrl(image)}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-secondary"
                  size="sm"
                  title="See on WorldAnvil"
                  aria-label={`See ${image.title} on WorldAnvil`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  title={`Delete ${image.title}`}
                  aria-label={`Delete ${image.title}`}
                  onClick={() => onRequestDelete(image)}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
