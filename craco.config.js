// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const webpack = require('webpack');

// for more details about this craco implementation
// see https://github.com/facebook/create-react-app/issues/11756#issuecomment-1001769356
// https://alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          assert: require.resolve('assert'),
          url: false,
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify'),
          path: require.resolve('path-browserify'),
          fs: false,
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
      ],
      ignoreWarnings: [/Failed to parse source map/],
    },
  },
};
