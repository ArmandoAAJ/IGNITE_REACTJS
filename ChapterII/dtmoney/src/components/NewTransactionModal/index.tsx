import { FormEvent, useState } from "react";
import ReactModal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [catgeory, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
  }

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
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Título"
        />
        <input
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          type="number"
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          value={catgeory}
          onChange={(event) => setCategory(event.target.value)}
          type="text"
          placeholder="Título"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
