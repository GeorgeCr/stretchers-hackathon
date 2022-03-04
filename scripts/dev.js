/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const { default: app } = require("../src/server/app");
const webpackConfig = require("../webpack/app");

const compiler = webpack(webpackConfig);
const [clientCompiler, serverCompiler] = compiler.compilers;

clientCompiler.name = "client";
serverCompiler.name = "server";

const devMiddleware = webpackDevMiddleware(compiler, {
  writeToDisk: true,
  logLevel: "silent",
});

app.use(devMiddleware);
app.use(webpackHotMiddleware(clientCompiler));
app.get("/", webpackHotServerMiddleware(compiler, { chunkName: "ssr" }));

let isBuilt = false;
const PORT = process.env.PORT || 3000;

devMiddleware.waitUntilValid(
  () =>
    !isBuilt &&
    app.listen(PORT, () => {
      isBuilt = true;
      // eslint-disable-next-line no-console
      console.log(`Listening @ http://localhost:${PORT}/`);
    })
);
