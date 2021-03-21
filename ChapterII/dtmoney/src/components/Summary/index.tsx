import React from "react";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

const Summary: React.FC = () => {
  const { transactions } = useTransactions();

  const sumary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.totals += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.totals -= transaction.amount;
      }
      return acc;
    },
    {
      income: 0,
      totals: 0,
      outcome: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$ {sumary.income}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>R$ -{sumary.outcome}</strong>
      </div>
      <div className="total">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$ {sumary.totals}</strong>
      </div>
    </Container>
  );
};

export default Summary;
