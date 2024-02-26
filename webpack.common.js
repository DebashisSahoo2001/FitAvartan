// /* eslint-disable import/no-extraneous-dependencies */
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/template.html",
//       filename: "index.html",
//     }),
//   ],
//   devServer: {
//     watchFiles: ["./src/*.html"],
//     port: 8080,
//     open: true,
//     hot: true,
//     client: {
//       overlay: {
//         errors: true,
//         warnings: false,
//       },
//     },
//   },
// };
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path'); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => ({ 
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html",
        }),
    ],
    devServer: {
        static: { 
            directory: path.join(__dirname, 'public'), 
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
            // ... your existing rules 
        ]
    },
    ...(env.production ? { 
        target: 'web' 
    } : {
        target: 'node', 
        externals: [nodeExternals()] 
    }) 
});
