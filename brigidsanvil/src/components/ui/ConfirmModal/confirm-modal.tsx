import { Button, Modal } from "react-bootstrap";

export type ConfirmModalProps = {
  show: boolean;
  title: string;
  body: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  show,
  title,
  body,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={isConfirming}>
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? "Working..." : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
