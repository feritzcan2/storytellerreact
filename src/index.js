import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import CombinedContextProviders from "./context/CombinedContextProviders";
import { GlobalProvider } from "./context/GlobalProvider";

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./screens/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <CombinedContextProviders>
        <HashRouter>
          <Component />
        </HashRouter>
      </CombinedContextProviders>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept("./screens/Main", () => {
    const NextApp = require("./screens/Main").default;
    renderApp(NextApp);
  });
}
serviceWorker.unregister();
