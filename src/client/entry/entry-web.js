import "regenerator-runtime/runtime";
import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import App from "../App";

loadableReady(() => {
  // eslint-disable-next-line no-undef
  const root = document.getElementById("main");
  // eslint-disable-next-line react/jsx-filename-extension
  hydrate(<App />, root);
});
