import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const ServerUri =
  process.env.NODE_ENV === "production"
    ? "https://filex-database.herokuapp.com/"
    : "http://localhost:5000/";

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
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
