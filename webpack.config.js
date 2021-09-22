import url from 'url'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// build時には有効化
// eslint-disable-next-line no-unused-vars
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import autoprefixer from 'autoprefixer'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  // 本番環境ではproductionに設定
  mode: 'development',
  // Entry Point
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js'],
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
                plugins: [autoprefixer({ grid: 'autoplace' })],
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
      title: 'Webpack Test',
      meta: [
        { name: 'description', content: 'Description' },
        {
          name: 'twitter:card',
          content: '',
        },
        {
          name: 'twitter:site',
          content: '',
        },
        {
          property: 'og:title',
          content: '',
        },
        {
          property: 'og:description',
          content: '',
        },
        {
          property: 'og:type',
          content: '',
        },
        {
          property: 'og:url',
          content: '', // 絶対パスを記載
        },
        {
          property: 'og:image',
          content: '', // 絶対パスを記載
        },
        {
          property: 'og:site_name',
          content: '',
        },
      ],
    }),
    // build時には有効化
    // new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: 'dist/templates',
  },
}
