import { BuildOptions } from "config/types/types";
import { removeDataTestBabelPlugin } from "./removeDataTestBabelPlugin";

export function buildBabelLoader({mode}: BuildOptions) {
    const isDev   = mode === 'development';
    const isProd  = mode === 'production';
    const plugins = [];

    if(isProd) {
      plugins.push([
        removeDataTestBabelPlugin,
        {
          props: ['data-testid']
        }
      ])
    }
    
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                '@babel/preset-env',
                "@babel/preset-typescript",
                ["@babel/preset-react", {
                    runtime: isDev ? 'automatic' : 'classic'
                }],
            ],

            plugins: plugins.length ? plugins : undefined,
          }
        }
    }
}