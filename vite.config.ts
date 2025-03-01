import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [
				client({
					input: ["/app/style.css"],
				}),
			],
		};
	}

	return {
		build: {
			emptyOutDir: false,
		},
		plugins: [
			honox({
				devServer: {
					exclude: [
						...devServerDefaultOptions.exclude,
						/^.*\.webmanifest$/,
						/^\/favicon\.svg$/,
					],
				},
			}),
			ssg({ entry }),
		],
	};
});
