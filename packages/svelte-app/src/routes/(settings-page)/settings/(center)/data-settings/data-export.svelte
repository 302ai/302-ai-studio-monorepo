<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import SettingInfoItem from "@/components/buss/settings/setting-info-item.svelte";
	import Button from "@/components/ui/button/button.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { Download } from "@lucide/svelte";

	function handleExport() {
		console.log("Exporting data...");
	}
</script>

{#snippet exportButton()}
	<Button size="sm" onclick={handleExport}>
		<Download className="size-4" />
		{m.settings_exportLabel()}
	</Button>
{/snippet}

<div class="gap-settings-gap flex flex-col">
	<Label class="text-label-fg">{m.settings_exportData()}</Label>
	<SettingInfoItem label={m.settings_exportAsJson()} action={exportButton} />
</div>
