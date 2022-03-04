/* eslint-disable react/jsx-filename-extension */
import path from "path";
import express from "express";
import ssr from "./middleware/ssr";

import exampleRouter from "./routes/index";

const app = express();
const CWD = process.cwd();

// eslint-disable-next-line import/no-dynamic-require
app.use(express.static(path.resolve(CWD, "public/dist/web")));

app.use("/example", exampleRouter);

app.get("/ping", (_req, res) => {
  return res.sendStatus(200);
});

app.get("/health", (_req, res) => {
  return res
    .send({
      app: "ok",
    })
    .status(200);
});

app.get(
  "/",
  ssr(
    ({ linkTags, styleTags, scriptTags, webapp, state }) => `<!DOCTYPE html>
  <html>
  <head>
    ${linkTags}
    ${styleTags}
  </head>
  <body>
    <div id="main">${webapp}</div>
    <script>
      __STATE__ = ${JSON.stringify(state)};
    </script>
    ${scriptTags}
  </body>
</html>`
  )
);

export default app;
