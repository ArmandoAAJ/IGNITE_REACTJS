import ReactModal from "react-modal";

import closeImg from "../../assets/close.svg";

import { Container } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <ReactModal
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container>
        <h2>Cadastrar transacao</h2>

        <input type="text" placeholder="Título" />
        <input type="number" placeholder="Valor" />

        <input type="text" placeholder="Título" />

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
