const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 本番環境ではproductionに設定
  mode: 'development',
  // Entry Point
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
  },

  // ルールの設定
  // 1. babel
  // 2. postcss
  // 3. sasss
  // 4. image loader
  module: {
    rules: [
      // JavaScriptに関する設定
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      // css/sassに関する設定
      {
        test: /\.(css|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // image loader
      {
        test: /\.(png|jpe?g|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style/style.css' }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'templates/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: 'dist/templates',
    open: true,
  },
}
