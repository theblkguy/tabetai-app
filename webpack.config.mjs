// webpack.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
