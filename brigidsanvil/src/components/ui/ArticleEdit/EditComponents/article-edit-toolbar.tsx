import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { WorldAnvilDate } from "@/components/types/date";
import { getFormattedDate } from "../../Table/table-helpers";
import { computeArticleWordCounts } from "./utils/word-count";

export type ArticleEditToolbarProps = {
  article?: {
    id: string;
    title?: string;
    url?: string;
    editURL?: string;
    entityClass?: string;
    wordcount?: number;
    creationDate?: WorldAnvilDate | null;
    updateDate?: WorldAnvilDate | null;
    publicationDate?: WorldAnvilDate | null;
    [fieldIdentifier: string]: unknown;
  } | null;
  editedFields?: Record<string, unknown>;
  isRefreshing?: boolean;
  onReset: () => void;
  onRefresh: () => void;
  onSave: () => void;
  onExportBackup: () => void;
  onImportBackup: () => void;
  importInputRef?: React.RefObject<HTMLInputElement>;
  onImportFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const formatWorldAnvilDate = (date?: WorldAnvilDate | null) =>
  date?.date ? getFormattedDate(String(date.date)) || "Unknown" : "Unknown";

type ToolbarButtonProps = {
  label: string;
  title: string;
  onClick: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
  isDanger?: boolean;
  loading?: boolean;
  tooltipText?: string;
  tooltipId?: string;
};

function ToolbarButton({
  label,
  title,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  isDanger = false,
  loading = false,
  tooltipText,
  tooltipId,
}: ToolbarButtonProps) {
  const buttonVariant = isDanger ? "danger" : variant;

  const button = (
    <Button
      type="button"
      onClick={onClick}
      variant={buttonVariant}
      className={className}
      disabled={disabled}
      aria-label={label}
      title={title}
    >
      {loading ? (
        <>
          <span className="visually-hidden">{label}</span>
          <span aria-hidden="true">Refreshing...</span>
        </>
      ) : (
        label
      )}
    </Button>
  );

  if (!tooltipText) {
    return button;
  }

  return (
    <OverlayTrigger overlay={<Tooltip id={tooltipId}>{tooltipText}</Tooltip>}>
      {button}
    </OverlayTrigger>
  );
}

export default function ArticleEditToolbar({
  article,
  editedFields = {},
  isRefreshing = false,
  onReset,
  onRefresh,
  onSave,
  onExportBackup,
  onImportBackup,
  importInputRef,
  onImportFile,
}: ArticleEditToolbarProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const viewWorldUrl = article?.url;
  const editWorldUrl = article?.editURL;
  const viewBrigidUrl = article
    ? `/worldanvil/articles/${article.id}/view`
    : "#";
  const toggleLabel = isExpanded ? "Hide options" : "Show options";
  const ToggleIcon = isExpanded ? PanelRightClose : PanelRightOpen;

  const wordCounts = useMemo(
    () =>
      article
        ? computeArticleWordCounts(article, editedFields)
        : { accurate: 0, waApprox: 0 },
    [article, editedFields],
  );

  return (
    <div
      className={`editpage-toolbar ${
        isExpanded ? "is-expanded" : "is-collapsed"
      }`}
      role="toolbar"
      aria-label="Article editing actions"
    >
      <Button
        type="button"
        variant="options"
        className="editpage-toolbar-toggle d-md-none"
        onClick={() => setIsExpanded((current) => !current)}
        aria-label={toggleLabel}
        aria-expanded={isExpanded}
        aria-controls="article-edit-toolbar-actions"
        title={toggleLabel}
      >
        <ToggleIcon size={16} aria-hidden="true" />
        <span className="editpage-toolbar-toggle-label">{toggleLabel}</span>
      </Button>

      <Collapse in={isExpanded}>
        <div className="article-edit-toolbar-collapse-wrapper">
          <div
            id="article-edit-toolbar-actions"
            className="editpage-toolbar-actions"
          >
            <div className="editpage-toolbar-actions-buttons d-flex flex-wrap gap-2">
              <ToolbarButton
                label="Reset content"
                title="Reset content"
                onClick={onReset}
                variant="danger"
                className="editpage-toolbar-button flex-grow-1"
                isDanger
                tooltipId="tooltip-reset-content"
                tooltipText="Resets content to what's present in your loaded state"
              />
              <ToolbarButton
                label="Refresh content"
                title="Refresh content"
                onClick={onRefresh}
                variant="danger"
                className="editpage-toolbar-button flex-grow-1"
                isDanger
                disabled={isRefreshing || !article}
                loading={isRefreshing}
                tooltipId="tooltip-refresh-content"
                tooltipText="Resets content to what's present on WorldAnvil"
              />
              <ToolbarButton
                label="Save to WorldAnvil"
                title="Save to WorldAnvil"
                onClick={onSave}
                variant="primary"
                className="editpage-toolbar-button flex-grow-1"
                disabled={!article}
                tooltipId="tooltip-save-content"
                tooltipText="Saves content to WorldAnvil"
              />
              <ToolbarButton
                label="Export backup"
                title="Export backup"
                onClick={onExportBackup}
                variant="secondary"
                className="editpage-toolbar-button flex-grow-1"
                disabled={!article}
                tooltipId="tooltip-export-content"
                tooltipText="Exports your currently edited work to a JSON file"
              />
              <ToolbarButton
                label="Import backup"
                title="Import backup"
                onClick={onImportBackup}
                variant="secondary"
                className="editpage-toolbar-button flex-grow-1"
                disabled={!article}
                tooltipId="tooltip-import-content"
                tooltipText="Imports your currently edited work from a JSON file; import either your edited fields, or their originals."
              />
              {onImportFile && (
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={onImportFile}
                  className="d-none"
                  aria-label="Import article backup file"
                />
              )}
              {viewWorldUrl ? (
                <Link
                  href={viewWorldUrl}
                  className="btn btn-tertiary editpage-toolbar-button flex-grow-1"
                  title="View on WorldAnvil"
                  aria-label="View on WorldAnvil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on WorldAnvil
                </Link>
              ) : null}
              {editWorldUrl ? (
                <Link
                  href={editWorldUrl}
                  className="btn btn-tertiary editpage-toolbar-button flex-grow-1"
                  title="Edit on WorldAnvil"
                  aria-label="Edit on WorldAnvil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit on WorldAnvil
                </Link>
              ) : null}
              <Link
                href={viewBrigidUrl}
                className="btn btn-tertiary editpage-toolbar-button flex-grow-1"
                title="View on Brigid"
                aria-label="View on Brigid"
              >
                View on Brigid
              </Link>
            </div>

            {article && (
              <div className="editpage-toolbar-metadata">
                <div
                  id="article-edit-toolbar-metadata-row"
                  className="editpage-toolbar-metadata-row d-flex flex-wrap"
                >
                  <div className="editpage-toolbar-metadata-item metadata-item-wordcount">
                    <span className="editpage-toolbar-metadata-label">
                      Word Count:
                    </span>
                    <span className="editpage-toolbar-metadata-value">
                      {wordCounts.accurate}
                    </span>
                  </div>
                  <div className="editpage-toolbar-metadata-item metadata-item-estimated-wa-wordcount">
                    <span className="editpage-toolbar-metadata-label">
                      Estimated WA WordCount:
                    </span>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-wa-wordcount">
                          WorldAnvil&apos;s own wordcounter isn&apos;t precise
                          around punctuation, so this is only an approximation.
                        </Tooltip>
                      }
                    >
                      <span className="editpage-toolbar-metadata-value">
                        {wordCounts.waApprox}
                      </span>
                    </OverlayTrigger>
                  </div>
                  <div className="editpage-toolbar-metadata-item metadata-item-created">
                    <span className="editpage-toolbar-metadata-label">
                      Created:
                    </span>
                    <span className="editpage-toolbar-metadata-value">
                      {formatWorldAnvilDate(article.creationDate)}
                    </span>
                  </div>
                  <div className="editpage-toolbar-metadata-item metadata-item-last-updated">
                    <span className="editpage-toolbar-metadata-label">
                      Last Updated on WA:
                    </span>
                    <span className="editpage-toolbar-metadata-value">
                      {formatWorldAnvilDate(article.updateDate)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
}
