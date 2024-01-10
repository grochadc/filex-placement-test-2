import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const ServerUri = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : process.env.GQL_URI;

const clientEnviroment =
  process.env.NODE_ENV === "development" ? "dev" : "prod";

const client = new ApolloClient({
  uri: ServerUri,
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "client-enviroment": clientEnviroment,
  },
  //@ts-ignore
  connectToDevtools: true,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
