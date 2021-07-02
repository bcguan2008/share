const path = require('path');

module.exports = {
    mode:"development",
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'lib')
    },
    module:{
        rules:[
        {
            test:/\.js$/,
            exclude: __dirname + 'node_modules',
            use:{
                loader:'babel-loader',
                options:{
                }
            }
        }
        ]
    }
};