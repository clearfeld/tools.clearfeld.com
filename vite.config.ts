/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import styleX from "vite-plugin-stylex";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		wasm(),
		topLevelAwait(),

		react(),

		styleX({
			libraries: ["@controlkit/ui"],
		}),
	],
	optimizeDeps: {
		exclude: [
			"@ffmpeg/ffmpeg",
			"@ffmpeg/util",
			//
			"mediainfo.js",
		],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: [
						"@controlkit/ui",
						"react",
						"react-dom",
						"react-router",
						"jotai",
						"fuse.js",
						"@stylexjs/stylex",
					],
				},
			},
		},
	},
	resolve: {
		alias: {
			"@src": resolve(__dirname, "src"),
		},
	},
});
