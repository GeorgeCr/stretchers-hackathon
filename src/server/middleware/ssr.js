import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";

import logger from "../utils/logger";

const CWD = process.cwd();

let nodePath = path.resolve(CWD, "build/node/");
let webPath = path.resolve(CWD, "public/dist/web/");

if (process.env.NODE_ENV === "test") {
  nodePath = path.resolve(CWD, "__fixtures__/node/");
  webPath = path.resolve(CWD, "__fixtures__/web/");
}

const nodeStats = path.resolve(nodePath, "loadable-stats.json");
const webStats = path.resolve(webPath, "loadable-stats.json");

export default (template) => async (_req, res, next) => {
  try {
    const nodeExtractor = new ChunkExtractor({
      statsFile: nodeStats,
      outputPath: nodePath,
    });

    const { default: App } = nodeExtractor.requireEntrypoint();

    const webExtractor = new ChunkExtractor({
      statsFile: webStats,
      outputPath: webPath,
    });

    const state = {};
    const jsx = webExtractor.collectChunks(<App {...state} />);

    // It's not nice, but testing renderToString is difficult with nodeExtractor / webExtractor
    // These ideally would be mocked and passed into a separate function, that can return
    // HTML in a mocked state. For now, let's catch the error so it doesn't fail each time

    let html;

    try {
      html = renderToString(jsx);
    } catch (e) {
      logger.error(e);
    }

    const page = await template({
      locals: res.locals,
      linkTags: webExtractor.getLinkTags(),
      styleTags: webExtractor.getStyleTags(),
      scriptTags: webExtractor.getScriptTags(),
      webapp: html,
      state,
    });

    res.set("content-type", "text/html").send(page);
  } catch (ex) {
    logger.error(`ssr middleware > ${ex}`);
    next(ex);
  }
};
