import Link from "next/link";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Collapse,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

export type ArticleEditToolbarProps = {
  article?: {
    id: string;
    title?: string;
    url?: string;
  } | null;
  isRefreshing?: boolean;
  onReset: () => void;
  onRefresh: () => void;
  onSave: () => void;
  onExportBackup: () => void;
  onImportBackup: () => void;
  importInputRef?: React.RefObject<HTMLInputElement>;
  onImportFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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
  const viewBrigidUrl = article
    ? `/worldanvil/articles/${article.id}/view`
    : "#";
  const toggleLabel = isExpanded ? "Hide options" : "Show options";
  const ToggleIcon = isExpanded ? PanelRightClose : PanelRightOpen;

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
            <Link
              href={viewBrigidUrl}
              className="btn btn-tertiary editpage-toolbar-button flex-grow-1"
              title="View on Brigid"
              aria-label="View on Brigid"
            >
              View on Brigid
            </Link>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
