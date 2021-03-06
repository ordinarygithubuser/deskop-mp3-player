const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: '#eval-source-map',
    debug: true,
    context: path.resolve(__dirname, 'src'),
    entry: './entry.js',
    target: 'atom',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: 'http://localhost:8080/build/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [ 'babel' ]
        }, {
            test: /\.scss|\.css/,
            loaders: [ 'style', 'css', 'sass' ]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    }
};