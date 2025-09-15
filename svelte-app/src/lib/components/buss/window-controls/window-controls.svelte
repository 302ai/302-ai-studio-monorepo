<script lang="ts" module>
	interface Props {
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import { Minus, Square, X, Copy } from "@lucide/svelte";
	import { onMount } from "svelte";

	let { class: className }: Props = $props();

	let platform = $state<string>("");
	let isMaximized = $state(false);

	onMount(async () => {
		if (typeof window !== "undefined" && window.api) {
			platform = await window.api.platform();
			isMaximized = await window.api.window.isMaximized();
		}
	});

	async function handleMinimize() {
		if (window.api) {
			await window.api.window.minimize();
		}
	}

	async function handleMaximize() {
		if (window.api) {
			await window.api.window.maximize();
			isMaximized = await window.api.window.isMaximized();
		}
	}

	async function handleClose() {
		if (window.api) {
			await window.api.window.close();
		}
	}

	// Don't show window controls on macOS (they're handled by the OS)
	let shouldShowControls = $derived(platform !== "darwin");
</script>

{#if shouldShowControls}
	<div class={cn("flex items-center", className)} style="-webkit-app-region: no-drag">
		<!-- Windows/Linux style controls on the right -->
		<div class="flex items-center">
			<!-- Minimize button -->
			<button
				class="flex h-8 w-12 items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
				onclick={handleMinimize}
				title="Minimize"
			>
				<Minus class="h-3 w-3" />
			</button>

			<!-- Maximize/Restore button -->
			<button
				class="flex h-8 w-12 items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
				onclick={handleMaximize}
				title={isMaximized ? "Restore" : "Maximize"}
			>
				{#if isMaximized}
					<Copy class="h-3 w-3" />
				{:else}
					<Square class="h-3 w-3" />
				{/if}
			</button>

			<!-- Close button -->
			<button
				class="flex h-8 w-12 items-center justify-center transition-colors hover:bg-red-500 hover:text-white"
				onclick={handleClose}
				title="Close"
			>
				<X class="h-3 w-3" />
			</button>
		</div>
	</div>
{/if}
