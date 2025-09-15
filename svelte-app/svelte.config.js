import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: false,
			strict: true,
		}),
		alias: {
			"@/*": "./src/lib/*",
		},
		paths: {
			base: "",
			relative: true,
		},
		prerender: {
			entries: [],
		},
	},
};

export default config;
