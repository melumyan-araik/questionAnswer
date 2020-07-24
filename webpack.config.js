const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HTMLPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
