const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    // publicPath: '/build/'  
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new Dotenv()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/build/',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/api/email' : {
        target: 'http://localhost:3000',
        secure: false,
      }
    },
  },

}