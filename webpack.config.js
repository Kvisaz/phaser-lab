const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");
const DIR_NODE = path.join(__dirname, "node_modules");


module.exports = (env, argv) => {
    return {
        context: SRC,
        entry: 'index.ts',
        mode: argv.mode || "development",
        target: "web",
        output: {
            path: DIST,
            filename: `index.[contentHash].js`
        },
        devServer: {
            contentBase: "dist",
            disableHostCheck: true
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                SRC,
                DIR_NODE
            ]
        },
        module: {
            rules: [
                {test: /\.tsx?$/, loader: "ts-loader"},
            ],
        },

        plugins: [
            // копируем файлы в контексте
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets",
                        to: "assets"
                    }
                ]
            }),
            // html шаблончик
            new HtmlPlugin({
                template: path.join(SRC, 'index.html'),
                minify: false
            })
        ],
    };
};
