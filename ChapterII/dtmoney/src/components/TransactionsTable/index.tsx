import React from "react";

import { Container } from "./styles";

const TransactionsTable: React.FC = () => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>categoria</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de websites</td>
            <td>12,00</td>
            <td className="deposit">12,00</td>
            <td>20/02/2012</td>
          </tr>
          <tr>
            <td>Desenvolvimento de websites</td>
            <td className="witdraw">-12,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2012</td>
          </tr>
          <tr>
            <td>Desenvolvimento de websites</td>
            <td>12,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2012</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TransactionsTable;
