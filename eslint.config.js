import prettier from "eslint-config-prettier";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	// TypeScript files in all packages
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	// Svelte specific configuration for packages/svelte-app
	...svelte.configs.recommended,
	...svelte.configs.prettier,
	{
		files: ["packages/svelte-app/**/*.svelte", "packages/svelte-app/**/*.svelte.ts", "packages/svelte-app/**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				svelteConfig: "./packages/svelte-app/svelte.config.js",
			},
		},
	},
	// Electron specific configuration
	{
		files: ["app/electron/**/*.ts", "app/electron/**/*.js"],
		languageOptions: {
			globals: { ...globals.node },
		},
		rules: {
			// Electron specific rules can be added here
		},
	},
	// Scripts and configuration files
	{
		files: ["scripts/**/*.js", "scripts/**/*.ts", "*.config.js", "*.config.ts"],
		languageOptions: {
			globals: { ...globals.node },
		},
	},
);