const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: ['./ui/index.jsx'],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options/presets stuff is covered in .babelrc
        },
      }, {
        test: /.html?$/,
        use: {
          loader: 'html-loader', // allows you to require an html file as a string, in this case used by html-webpack-plugin to grab its template
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // the template to draw from, could be hbs but we just happen to be using html
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // required so that you can import jsx modules without needing to put '.jsx' on the end
  },
};
