const path = require("path");
const nodeExternals = require("webpack-node-externals");

const production = process.env.NODE_ENV === "production";
const mode = production ? "production" : "development";

module.exports = {
  entry: {
    server: path.resolve(process.cwd(), "src/server/index.js"),
  },
  externals: [
    nodeExternals({
      whitelist: [/^@boots/],
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!@boots).*/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  target: "node",
  output: {
    path: path.resolve(process.cwd(), "build"),
  },
  plugins: [],
};
