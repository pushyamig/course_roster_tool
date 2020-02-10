const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'assets/src/index'),
  output: {
    path: path.join(__dirname, 'assets/dist'),
    filename: '[name]-[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(bmp|gif|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: 'webpack-stats.json'
    })
  ]
}
