import ReactModal from "react-modal";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>oisasiash</h1>
    </ReactModal>
  );
}
