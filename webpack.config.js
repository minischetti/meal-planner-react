var path = require('path');

module.exports = {
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@meal-planner/store": path.resolve(__dirname, 'src/store/'),
            "@meal-planner/hooks": path.resolve(__dirname, 'src/hooks/'),
            "@meal-planner/context": path.resolve(__dirname, 'src/context/'),
            "@meal-planner/configuration": path.resolve(__dirname, 'src/configuration/'),
            "@meal-planner/components": path.resolve(__dirname, 'src/components/'),
        }
    },

    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    output: {
        filename: 'main.js'
    },

    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: false,
        liveReload: false,
        lazy: true,
        filename: 'main.js'
    }

    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 8080
    //   }
};