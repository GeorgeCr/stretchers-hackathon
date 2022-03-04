/* eslint-disable import/no-unresolved */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_DIST_PATH = path.resolve("./build/node");
const DIST_PATH = path.resolve("./public/dist");

const production = process.env.NODE_ENV === "production";
const mode = production ? "production" : "development";

const getEntries = (target) => {
  const entries = { main: `./src/client/entry/entry-${target}.js` };

  if (target === "node") {
    entries.ssr = "./src/server/middleware/ssr.js";
  }

  return entries;
};

const getConfig = (target) => ({
  name: target,
  mode,
  target,
  entry: getEntries(target),
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js",
            caller: { target },
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: [
          MiniCssExtractPlugin.loader, // works server side
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
              onlyLocals: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: [
          MiniCssExtractPlugin.loader, // works server side
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".css", ".js", ".jsx"],
  },
  externals:
    target === "node"
      ? [
          "@loadable/component",
          nodeExternals({
            whitelist: [/^@boots/],
          }),
        ]
      : [
          /* { react: "React" }, { "react-dom": "ReactDOM" } */
        ],
  output: {
    path: target === "node" ? NODE_DIST_PATH : path.join(DIST_PATH, target),
    filename: production ? "[name]-bundle-[chunkhash:8].js" : "[name].js",
    publicPath: target === "node" ? "/build/node/" : undefined,
    libraryTarget: target === "node" ? "commonjs2" : undefined,
  },
  plugins: [new MiniCssExtractPlugin(), new LoadablePlugin()],
});

module.exports = [getConfig("web"), getConfig("node")];
