const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'assets')
    },
    module:{
        rules:[
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename:'app.bundle.css'})
    ]
};