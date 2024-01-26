import webpack            from "webpack";
import { BuildOptions }   from './../types/types';
import { buildServer }    from "./buildDevServer";
import { buildLoader }    from "./buildLoaders";
import { buildPlugins }   from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options
    const isDev         = mode === 'development';
    
    return {
        mode:  mode ?? 'development',
        entry: paths.entry,

        output: {
            path:     paths.output,
            filename: '[name].[contenthash].js',
            clean:    true,
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoader(options)
        },

        resolve: buildResolvers(options),

        devtool:   isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildServer(options) : undefined,
    };
}