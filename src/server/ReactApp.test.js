/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import ReactApp from "./ReactApp";

test("shows the children when the checkbox is checked", () => {
  const app = render(<ReactApp />);
  expect(app.queryByText("Hello Client Hydrated")).toBeTruthy();
});
