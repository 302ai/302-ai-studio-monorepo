#!/usr/bin/env node

/**
 * Modern wait script for Electron using wait-on library
 * Waits for SvelteKit dev server then starts Electron
 */

import waitOn from "wait-on";
import { spawn } from "child_process";

const SVELTE_SERVER_URL = "http://localhost:5173";

async function main() {
	console.log("⏳ Waiting for SvelteKit dev server...");

	try {
		// Use wait-on library with modern configuration
		await waitOn({
			resources: [SVELTE_SERVER_URL],
			delay: 1000, // Initial delay before first check
			interval: 1000, // Check every 1 second
			timeout: 30000, // Timeout after 30 seconds
			headers: {
				"User-Agent": "Electron-Dev-Starter/1.0",
			},
			verbose: true,
			log: true,
		});

		console.log("✅ SvelteKit server is ready!");
		console.log("🚀 Starting Electron...");

		// Start Electron using electron-vite
		const electron = spawn("electron-vite", ["dev"], {
			stdio: "inherit",
			shell: true,
		});

		// Handle process termination gracefully
		const cleanup = (signal) => {
			console.log(`\n📴 Received ${signal}, shutting down Electron...`);
			electron.kill("SIGTERM");
			process.exit(0);
		};

		process.on("SIGINT", () => cleanup("SIGINT"));
		process.on("SIGTERM", () => cleanup("SIGTERM"));

		electron.on("exit", (code) => {
			console.log(`⚡ Electron exited with code ${code}`);
			process.exit(code);
		});

		electron.on("error", (error) => {
			console.error("❌ Failed to start Electron:", error);
			process.exit(1);
		});
	} catch (error) {
		console.error("❌ Error waiting for SvelteKit server:", error.message);
		console.log("🔄 Starting Electron anyway...");

		// Fallback: start Electron even if wait failed
		const electron = spawn("electron-vite", ["dev"], {
			stdio: "inherit",
			shell: true,
		});

		electron.on("exit", (code) => process.exit(code));
	}
}

main().catch((error) => {
	console.error("💥 Unexpected error:", error);
	process.exit(1);
});
