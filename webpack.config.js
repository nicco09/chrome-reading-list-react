const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

require("@babel/register");
require("@babel/polyfill");

const PAGES_PATH = './src/pages'

function generateHtmlPlugins(items) {
  return items.map(
    name =>
      new HtmlWebpackPlugin({
        title: 'Reading List',
        filename: `./${name}.html`,
        chunks: [name]
      })
  )
}

module.exports = {
  mode: 'development',
  entry: {
    background: ['@babel/polyfill', `${PAGES_PATH}/background`],
    popup: ['@babel/polyfill', `${PAGES_PATH}/popup`],
    tab: ['@babel/polyfill', `${PAGES_PATH}/tab`]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Modules: path.resolve(__dirname, 'src/modules/'),
      Shared: path.resolve(__dirname, 'src/shared')
    }
  },
  output: {
    path: path.resolve('dist/pages'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin([
      {
        from: 'src',
        to: path.resolve('dist'),
        ignore: ['pages/**/*']
      }
    ]),
    ...generateHtmlPlugins(['background', 'popup', 'tab'])
  ]
}
