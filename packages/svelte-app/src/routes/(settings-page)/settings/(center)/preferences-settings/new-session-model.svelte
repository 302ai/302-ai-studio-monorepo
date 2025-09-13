<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";
	import { ModelSelect } from "@/components/buss/model-select";
	import type { Model } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";

	let selectedModel = $state<Model | null>(null);
	function handleModelSelect(model: Model) {
		selectedModel = model;
	}
</script>

{#snippet trigger({ onclick }: { onclick: () => void })}
	<button
		class={cn(
			"flex h-settings-item w-full items-center justify-between rounded-settings-item bg-settings-item-bg px-settings-item-x py-settings-item-y text-settings-shortcut-size",
		)}
		{onclick}
	>
		{selectedModel?.name || m.settings_newSessionModelPlaceholder()}
	</button>
{/snippet}

<div class="flex flex-col gap-settings-gap">
	<Label class="text-label-fg">{m.settings_newSessionModel()}</Label>

	<ModelSelect {selectedModel} {trigger} onModelSelect={handleModelSelect} />
</div>
