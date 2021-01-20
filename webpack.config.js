
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')


module.exports = {
  mode: 'development',
  entry: "./src/ts/app.ts",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js','.tsx'],
    alias: {
      '@components': path.resolve(__dirname,'./src/ts/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/mode_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: '/mode_modules/',
        loader: {
          loader: 'babel-loader',
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: ['file-loader']
      }
      
    ]
  },
  devServer: {
    port: 8001,
    overlay: true,
    open: true
  },
  plugins: [

    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin()
  ],
}