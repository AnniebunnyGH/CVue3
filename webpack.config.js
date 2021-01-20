
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')


module.exports = {
  mode: 'development',
  entry: "./src/ts/app.js",
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: '/mode_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            },
          }
        ] 
      },
      {
        test: /\.ts$/,
        exclude: '/mode_modules/',
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          /*
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },*/
          'css-loader'
        ]
      },
        {
        test: /\.s[ac]ss$/,
        use: [
          'vue-style-loader',
          /*{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },*/
          'css-loader',
          {
            loader: 'sass-loader',
            options: {  
              additionalData: path.resolve(__dirname,'./src/styles/variables.scss')
            }
          },
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
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin()
  ],
}