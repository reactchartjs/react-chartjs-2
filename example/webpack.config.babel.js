import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const inExamples = loc => path.resolve(__dirname, loc);

const env = process.env.NODE_ENV || 'development';
const __DEV__ = env === 'development';

const config = {
  entry: {
    app: [
      inExamples('src/index.js'),
      inExamples('src/example.css')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    alias: {
      'react-chartjs-2': '../../../src'
    }
  },
  output: {
    path: inExamples('dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: __DEV__
    }),
    new HtmlWebpackPlugin({
      template: inExamples('src/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
    stats: {
      cached: false
    }
  }
};

if (__DEV__) {
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}
else {
  config.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  );
}

export default config;
