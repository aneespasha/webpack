'use strict';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {

  entry: './src/app.js',

  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [

    // Specify the resulting CSS filename
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/app.min.css',
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: './index.html' //relative to root of the application
    }),

    // Stylelint plugin
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: '',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
      quiet: false
    }),

  ],

  module: {

    rules: [

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/'
          //the fonts will be emmited to public/assets/fonts/ folder
          //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
        }
      },
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },

      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          publicPath: "../"
        })
      },

      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 80000, // Convert images < 8kb to base64 strings
            name: '[hash]-[name].[ext]',
            outputPath: 'images'
          }
        }]
      }
    ],

    loaders: [
      {test: /\.(png|jpg|jpeg|gif|svg)$/, loader: "url-loader?limit=100000"},

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file-loader'
      },

      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      },

      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'postcss.config.js',
          }
        }
      }
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
