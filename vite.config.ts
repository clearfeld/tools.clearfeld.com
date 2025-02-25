/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import styleX from "vite-plugin-stylex";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),

		styleX({
			libraries: ["@controlkit/ui"],
		}),
	],

	resolve: {
		alias: {
			"@src": resolve(__dirname, "src"),
		},
	},
});
