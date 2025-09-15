#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, rmSync, mkdirSync, cpSync } from "fs";
import { join } from "path";

const SVELTE_APP_DIR = "packages/svelte-app";
const SVELTE_BUILD_DIR = join(SVELTE_APP_DIR, "build");
const ELECTRON_OUT_DIR = join("app", "electron", "out", "renderer");

console.log("🔨 Building SvelteKit application...");

try {
	// Step 1: Build SvelteKit app
	console.log("📦 Building SvelteKit...");
	execSync("pnpm --filter @302-ai-studio/svelte-app build", { stdio: "inherit" });

	// Step 2: Verify build output
	console.log("🔧 Verifying build output...");
	const indexHtmlPath = join(SVELTE_BUILD_DIR, "index.html");

	if (!existsSync(indexHtmlPath)) {
		throw new Error(`Build output not found at ${indexHtmlPath}`);
	}

	console.log("✅ Build output verified");

	// Step 3: Clean and create electron renderer directory
	console.log("🗑️  Cleaning electron renderer directory...");
	if (existsSync(ELECTRON_OUT_DIR)) {
		rmSync(ELECTRON_OUT_DIR, { recursive: true, force: true });
	}
	mkdirSync(ELECTRON_OUT_DIR, { recursive: true });

	// Step 4: Copy built files to electron renderer
	console.log("📁 Copying files to electron renderer...");
	cpSync(SVELTE_BUILD_DIR, ELECTRON_OUT_DIR, { recursive: true });

	// Note: SvelteKit now generates relative paths natively with paths.relative: true
	// No path fixing needed since build output already uses ./_app/ paths

	console.log("🎉 SvelteKit build and integration completed successfully!");
} catch (error) {
	console.error("❌ Build failed:", error.message);
	process.exit(1);
}
