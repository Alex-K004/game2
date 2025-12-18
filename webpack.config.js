const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: isProduction ? '/game2/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]',
          publicPath: '/game2/assets/'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      // Добавляем base tag для правильных путей
      templateParameters: {
        baseUrl: isProduction ? '/game2/' : '/'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets'
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9007,
    open: true,
    hot: true,
    historyApiFallback: {
      index: '/game2/index.html'
    },
  },
  devtool: isProduction ? false : 'source-map'
};