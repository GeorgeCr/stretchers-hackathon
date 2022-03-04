import React from "react";
import ClientApp from "../client/App";

export default function ReactApp(props) {
  // This is where we can do server logic to contain our cient.
  // I.E Redux/Router etc...
  return <ClientApp {...props} />;
}
