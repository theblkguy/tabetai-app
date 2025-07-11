// webpack.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config({ path: './client/.env' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID || ''),
      'process.env.REACT_APP_SPOONACULAR_KEY': JSON.stringify(process.env.REACT_APP_SPOONACULAR_API_KEY || '')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client', 'dist'), 
    },
    port: 3000,
    hot: true,
    open: true, 
    historyApiFallback: true, 
  },
};
