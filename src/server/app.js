/* eslint-disable react/jsx-filename-extension */
import path from "path";
import express from "express";
import ssr from "./middleware/ssr";
import { mongoDBConnect } from "./utils/mongoDB";
import exampleRouter from "./routes/index";
import categoryRouter from "./routes/categories";
import notesRouter from "./routes/notes";
import NotesModel from "./models/NotesModel";

const app = express();
const CWD = process.cwd();

// eslint-disable-next-line import/no-dynamic-require
app.use(express.static(path.resolve(CWD, "public/dist/web")));
mongoDBConnect();
app.use("/example", exampleRouter);

app.use("/api", categoryRouter, notesRouter);

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

app.get("/notes", async (_req, res) => {
  try {
    console.log("aici!!");
    const notes = await NotesModel.find({});
    console.log("🚀 ~ file: app.js ~ line 32 ~ app.get ~ notes", notes);
    res.send(notes);
  } catch (error) {
    console.log("🚀 ~ file: app.js ~ line 34 ~ app.get ~ error", error);
  }
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
