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
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import FormWizardVar1 from "./screens/CustomerApp/CustomerRegisterPage";

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <CombinedContextProviders>
        <HashRouter>
          <Switch>
            <Route path="/musteri/appointment">
              {/* Render a component specific to the "/some-path" route */}
              <FormWizardVar1 />
            </Route>
            <Route path="/">
              {/* Render the Main component for the default route */}
              <Component />
            </Route>
          </Switch>
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
