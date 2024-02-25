const path = require('path'); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals'); // Add this

module.exports = (env) => ({ // Accept an 'env' argument 
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    static: { 
      directory: path.join(__dirname, 'dist'), // Or the folder where your client bundles are output
    },
    port: 8080,
    open: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  module: {
    rules: [ 
      //  ... your existing rules 
    ]
  },
  ...(env.production ? { // Target the correct environment
      target: 'web', // Default for client-side builds
    } : {
      target: 'node', // Target Node.js for server-side builds
      externals: [nodeExternals()] // Exclude Node modules from server-side bundle
    }) 
});
