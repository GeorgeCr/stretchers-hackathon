import React, { useEffect, useState } from "react";
import "./styles/base.scss";

export default function App() {
  const [status, setStatus] = useState("Server Rendered");

  useEffect(() => {
    setStatus("Client Hydrated");
  }, []);

  return (
    <section>
      <h1>{`Hello ${status}`}</h1>
    </section>
  );
}
