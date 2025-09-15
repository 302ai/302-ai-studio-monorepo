#!/usr/bin/env node

/**
 * Script to sort JSON keys in message files alphabetically
 * Usage: node scripts/sort-messages.js [file1] [file2] ...
 * If no files specified, processes all JSON files in messages/ directory
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sortJsonKeys(obj) {
	if (Array.isArray(obj)) {
		return obj.map(sortJsonKeys);
	} else if (obj !== null && typeof obj === "object") {
		const sorted = {};
		Object.keys(obj)
			.sort()
			.forEach((key) => {
				sorted[key] = sortJsonKeys(obj[key]);
			});
		return sorted;
	}
	return obj;
}

function processFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, "utf8");
		const parsed = JSON.parse(content);
		const sorted = sortJsonKeys(parsed);
		const formatted = JSON.stringify(sorted, null, "\t") + "\n";

		if (content !== formatted) {
			fs.writeFileSync(filePath, formatted, "utf8");
			console.log(`✓ Sorted keys in ${filePath}`);
			return true;
		} else {
			console.log(`- No changes needed in ${filePath}`);
			return false;
		}
	} catch (error) {
		console.error(`✗ Error processing ${filePath}:`, error.message);
		return false;
	}
}

function main() {
	const args = process.argv.slice(2);
	let filesToProcess = [];

	if (args.length === 0) {
		const messagesDir = path.join(process.cwd(), "messages");
		try {
			const files = fs.readdirSync(messagesDir);
			filesToProcess = files
				.filter((file) => file.endsWith(".json"))
				.map((file) => path.join(messagesDir, file));
		} catch (error) {
			console.error("Error reading messages directory:", error.message);
			process.exit(1);
		}
	} else {
		filesToProcess = args.map((file) => path.resolve(file));
	}

	if (filesToProcess.length === 0) {
		console.log("No JSON files found to process");
		return;
	}

	console.log(`Processing ${filesToProcess.length} file(s)...`);

	let changedCount = 0;
	for (const file of filesToProcess) {
		if (processFile(file)) {
			changedCount++;
		}
	}

	console.log(`\nProcessed ${filesToProcess.length} files, ${changedCount} changed`);
}

main();

export { sortJsonKeys, processFile };
