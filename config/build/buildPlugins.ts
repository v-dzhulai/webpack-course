import path from "path";
import webpack, { DefinePlugin } from "webpack";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "../types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
    const isDev  = mode === 'development';
    const isProd = mode === 'production';
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
        new DefinePlugin({ __PLATFORM__: JSON.stringify(platform) })
    ];

    if(isDev) {
        plugins.push(
            new ForkTsCheckerWebpackPlugin(),
            new ReactRefreshPlugin()
            // new webpack.ProgressPlugin()
        )
    }

    if(isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),

            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(paths.public, 'locales'),
                        to:   path.resolve(paths.output, 'locales')
                    }
                ]
            })
        );
    }

    if(analyzer) plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}