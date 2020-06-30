const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../app/'),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(less|css)$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000',
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ WEATHER_KEY: JSON.stringify(process.env.WEATHER_KEY) }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../app'),
    historyApiFallback: {
      rewrites: [
        { from: /.index.html/, to: '/index.html' },
        { from: /.bundle.js/, to: '/bundle.js' },
        {
          from: /.+\/assets\/.+/,
          to(context) {
            const url = `/assets/${context.parsedUrl.pathname.replace(/.+\/assets/, '')}`;
            return url;
          },
        },
      ],
    },
  },
};