<script lang="ts">
	import { cn } from "@/utils";
	import { X } from "@lucide/svelte";
	import type { Snippet } from "svelte";

	interface Props {
		open: boolean;
		onClose: () => void;
		title: string;
		children: Snippet;
	}

	let { open, onClose, title, children }: Props = $props();
	let isClosing = $state(false);
	let shouldRender = $state(false);

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			},
		};
	}

	function handleOverlayClick() {
		onClose();
	}

	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClose();
		}
	}

	function handleDialogKeydown(event: KeyboardEvent) {
		// Allow Escape key to bubble up for closing the overlay
		if (event.key === "Escape") {
			return;
		}
		// Prevent other keyboard events from bubbling up to overlay
		event.stopPropagation();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			onClose();
		}
	}

	// Handle opening animation
	$effect(() => {
		if (open) {
			shouldRender = true;
			isClosing = false;
		}
	});

	// Handle closing animation
	$effect(() => {
		let timer: number;
		if (!open && shouldRender) {
			isClosing = true;
			// Wait for animation to complete before removing from DOM
			timer = window.setTimeout(() => {
				shouldRender = false;
				isClosing = false;
			}, 100);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	});

	$effect(() => {
		if (shouldRender) {
			document.addEventListener("keydown", handleKeydown);
			return () => {
				document.removeEventListener("keydown", handleKeydown);
			};
		}
	});
</script>

{#if shouldRender}
	<div
		use:portal
		class={cn(
			"fixed inset-0 z-50 flex items-center justify-center bg-black/50 duration-200",
			!isClosing ? "animate-in fade-in-0" : "animate-out fade-out-0",
		)}
		onclick={handleOverlayClick}
		onkeydown={handleOverlayKeydown}
		role="presentation"
		tabindex="-1"
	>
		<div
			class={cn(
				"bg-overlay relative w-fit max-w-[calc(100vw-2rem)] rounded-lg border p-4 shadow-lg duration-200",
				!isClosing ? "animate-in fade-in-0 zoom-in-95" : "animate-out fade-out-0 zoom-out-95",
			)}
			onclick={(e) => e.stopPropagation()}
			onkeydown={handleDialogKeydown}
			role="dialog"
			aria-modal="true"
			tabindex="0"
		>
			<button
				class="rounded-xs absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100"
				onclick={onClose}
			>
				<X class="h-4 w-4" />
			</button>

			<div class="mb-4">
				<h2 class="text-lg font-semibold leading-none tracking-tight">
					{title}
				</h2>
			</div>

			{@render children()}
		</div>
	</div>
{/if}
