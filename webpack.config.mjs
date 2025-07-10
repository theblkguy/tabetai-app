// webpack.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config({ path: './client/.env' });

<<<<<<< HEAD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

=======
const __dirname = path.dirname(fileURLToPath(import.meta.url));
>>>>>>> e153d52c80b96dac39016bccaee38857f311b8ca
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
      'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID)
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
