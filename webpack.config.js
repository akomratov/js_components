let webpack = require('webpack');

module.exports = {
    entry: {
      bundle: './components/app/app.js',
      vendors: ['./libs/handlebars.js']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['env']
                }
            }
        }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors')
    ]
};
