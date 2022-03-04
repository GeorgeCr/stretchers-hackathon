/* eslint-disable import/no-extraneous-dependencies */
const loadableBabelPlugin = require("@loadable/babel-plugin");

function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === "babel-loader");
}

function isTest(caller) {
  return Boolean(caller && caller.target === "test");
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);
  const test = api.caller(isTest);
  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          debug: false, // Toggle this for more information on what is being bundled
          targets: !web || test ? { node: "current" } : undefined,
          modules: webpack ? false : "commonjs", // If running through cli or scripts, we need commonjs
        },
      ],
    ],
    parserOpts: {
      allowReturnOutsideFunction: true,
    },
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      [
        "react-css-modules",
        {
          generateScopedName: "[local]___[hash:base64:5]",
          removeImport: !web,
        },
      ],
      loadableBabelPlugin,
    ],
  };
};
