import React from "react";
import ReactDOM from "react-dom";
import { createServer } from "miragejs";

import { App } from "./App";

createServer({
  routes() {
    this.namespace = 'api';

    this.get("transaction", () => {
      return [
        {
          id: 1,
          title: "aksjhidas",
          type: "asjd",
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
