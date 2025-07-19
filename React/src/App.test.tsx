import React from "react";
import { render } from "@testing-library/react";
import { Dashboard } from "./pages/Admin";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux_toolkit/redux_store/store";

test("renders the App component", () => {
  render(
    <BrowserRouter basename="/">
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </BrowserRouter>
  );
  // Add assertions to verify the expected behavior of the component
});
