import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Image, ImageUpdate } from "@/components/types/image";
import { Folder } from "@/components/types/folder";
import { IMAGE_FOLDER_ROOT_ID } from "@/components/store/foldersSlice";
import TagsField from "@/components/ui/Common/tags-field";
import {
  copyImageId,
  copyImageURL,
  getImageEditUrl,
  getImageViewUrl,
  getImageWaUrl,
} from "./image-actions";

type ImageDetailPanelProps = {
  image: Image | null;
  folders: Folder[];
  isSaving: boolean;
  isSyncing: boolean;
  position: { index: number; count: number } | null;
  onSave: (id: string, updateBody: ImageUpdate) => void | Promise<void>;
  onRequestDelete: (image: Image) => void;
  onSync: (image: Image) => void;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
};

const emptyForm: ImageUpdate = {
  title: "",
  tags: "",
  description: "",
  alt: "",
  creditArtistName: "",
  creditArtistWebsite: "",
  creditArtTitle: "",
  creditArtUrl: "",
  isFeatured: false,
  linkUrl: "",
  folderId: IMAGE_FOLDER_ROOT_ID,
};

function formatBytes(size?: number) {
  if (!size) {
    return null;
  }
  return `${(size / 1024).toFixed(1)} KB`;
}

export default function ImageDetailPanel({
  image,
  folders,
  isSaving,
  isSyncing,
  position,
  onSave,
  onRequestDelete,
  onSync,
  onPrev,
  onNext,
  onBack,
}: ImageDetailPanelProps) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<ImageUpdate>(emptyForm);
  const initialFormRef = useRef<ImageUpdate>(emptyForm);

  useEffect(() => {
    if (!image) {
      return;
    }

    const initialForm: ImageUpdate = {
      title: image.title ?? "",
      tags: image.tags ?? "",
      description: image.description ?? "",
      alt: image.alt ?? "",
      creditArtistName: image.creditArtistName ?? "",
      creditArtistWebsite: image.creditArtistWebsite ?? "",
      creditArtTitle: image.creditArtTitle ?? "",
      creditArtUrl: image.creditArtUrl ?? "",
      isFeatured: image.isFeatured ?? false,
      linkUrl: image.linkUrl ?? "",
      folderId: image.folderId ?? IMAGE_FOLDER_ROOT_ID,
    };

    setForm(initialForm);
    initialFormRef.current = initialForm;
  }, [image]);

  if (!image) {
    return (
      <div className="image-detail-panel image-detail-panel-empty">
        <p className="text-muted">
          Select an image from the grid to view and edit its details here.
        </p>
      </div>
    );
  }

  const updateField = <K extends keyof ImageUpdate>(
    field: K,
    value: ImageUpdate[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const initialForm = initialFormRef.current;
    const changedFields = (
      Object.keys(form) as (keyof ImageUpdate)[]
    ).reduce<ImageUpdate>((diff, field) => {
      if (form[field] !== initialForm[field]) {
        (diff as Record<string, unknown>)[field] = form[field];
      }
      return diff;
    }, {});

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    void onSave(image.id, changedFields);
  };

  return (
    <div className="image-detail-panel">
      <Button
        variant="outline-secondary"
        size="sm"
        className="d-lg-none mb-3"
        onClick={onBack}
      >
        <ArrowLeft size={14} aria-hidden="true" className="me-1" />
        Back to grid
      </Button>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={!position || position.count <= 1}
          onClick={onPrev}
        >
          <ChevronLeft size={14} aria-hidden="true" />
        </Button>
        {position && (
          <span className="text-muted small">
            {`${position.index + 1} of ${position.count}`}
          </span>
        )}
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={!position || position.count <= 1}
          onClick={onNext}
        >
          <ChevronRight size={14} aria-hidden="true" />
        </Button>
      </div>

      <img
        className="image-detail-preview"
        src={image.url}
        alt={image.alt || image.title}
      />

      <div className="d-flex gap-2 flex-wrap my-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => void copyImageId(image, dispatch)}
        >
          <Copy size={14} aria-hidden="true" className="me-1" />
          Copy ID
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => void copyImageURL(image, dispatch)}
        >
          <Copy size={14} aria-hidden="true" className="me-1" />
          Copy URL
        </Button>
        <Button
          as="a"
          href={getImageViewUrl(image)}
          target="_blank"
          rel="noreferrer"
          variant="outline-secondary"
          size="sm"
        >
          <ExternalLink size={14} aria-hidden="true" className="me-1" />
          See on WA
        </Button>
        <Button
          as="a"
          href={getImageEditUrl(image)}
          target="_blank"
          rel="noreferrer"
          variant="outline-secondary"
          size="sm"
        >
          <ExternalLink size={14} aria-hidden="true" className="me-1" />
          Edit on WA
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={isSyncing}
          onClick={() => onSync(image)}
        >
          <RefreshCw
            size={14}
            aria-hidden="true"
            className={isSyncing ? "image-sync-spinning me-1" : "me-1"}
          />
          {isSyncing ? "Syncing..." : "Sync to WA"}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onRequestDelete(image)}
        >
          <Trash2 size={14} aria-hidden="true" className="me-1" />
          Delete
        </Button>
      </div>

      <dl className="image-detail-facts">
        <dt>Id</dt>
        <dd>{image.id}</dd>
        {(image.width || image.height) && (
          <>
            <dt>Dimensions</dt>
            <dd>
              {image.width}x{image.height}
            </dd>
          </>
        )}
        {formatBytes(image.size) && (
          <>
            <dt>File size</dt>
            <dd>{formatBytes(image.size)}</dd>
          </>
        )}
        {image.updateDate?.date && (
          <>
            <dt>Last updated</dt>
            <dd>{image.updateDate.date}</dd>
          </>
        )}
      </dl>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <TagsField
            value={form.tags ?? ""}
            onChange={(value) => updateField("tags", value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Folder</Form.Label>
          <Form.Select
            value={form.folderId}
            onChange={(event) => updateField("folderId", event.target.value)}
          >
            <option value={IMAGE_FOLDER_ROOT_ID}>Unsorted / world root</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alt text</Form.Label>
          <Form.Control
            value={form.alt}
            onChange={(event) => updateField("alt", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Link URL</Form.Label>
          <Form.Control
            value={form.linkUrl}
            onChange={(event) => updateField("linkUrl", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="image-is-featured"
            label="Featured"
            checked={form.isFeatured}
            onChange={(event) =>
              updateField("isFeatured", event.target.checked)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Artist name</Form.Label>
          <Form.Control
            value={form.creditArtistName}
            onChange={(event) =>
              updateField("creditArtistName", event.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Artist website</Form.Label>
          <Form.Control
            value={form.creditArtistWebsite}
            onChange={(event) =>
              updateField("creditArtistWebsite", event.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Art title</Form.Label>
          <Form.Control
            value={form.creditArtTitle}
            onChange={(event) =>
              updateField("creditArtTitle", event.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Art source URL</Form.Label>
          <Form.Control
            value={form.creditArtUrl}
            onChange={(event) =>
              updateField("creditArtUrl", event.target.value)
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </Form>
    </div>
  );
}
