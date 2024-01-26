import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "../types/types";

export function buildServer(options: BuildOptions): DevServerConfiguration {
    return {
        port:               options.port ?? 5500,
        open:               true,
        historyApiFallback: true,
        hot:                true
    } 
}