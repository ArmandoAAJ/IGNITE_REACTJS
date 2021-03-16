import React, { useEffect } from "react";
import api from "../../services/api";

import { Container } from "./styles";

const TransactionsTable: React.FC = () => {
  useEffect(() => {
    api.get("api/transaction").then((response) => console.log(response.data));
  }, []);

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
            <td>Desenvolvimento</td>
            <td>20/02/2012</td>
          </tr>
          <tr>
            <td>Desenvolvimento de websites</td>
            <td>39,0000</td>
            <td className="witdraw">-12,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2012</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TransactionsTable;
