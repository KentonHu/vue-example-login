const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "production",
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"), // 输出路径指向 dist 目录
    filename: "[name].[contenthash].js", // 添加哈希值
    chunkFilename: "[name].[contenthash].chunk.js", // 添加 chunk 哈希值
    clean: true, // Webpack 5 新增的清理构建目录功能
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js", // ✅ Vue 3 必要配置
    },
  }, // 添加缺失的逗号
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 指定模板文件
      filename: "index.html", // 输出文件名
      inject: "body", // 注入资源到 body 底部
    }),
  ],
  optimization: {
    // 注意冒号
    minimize: true,
    splitChunks: {
      chunks: "all",
    }, // 注意结尾的逗号（如果后面还有其他配置项）
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
    },
    extensions: [".js", ".vue"],
  },
};
