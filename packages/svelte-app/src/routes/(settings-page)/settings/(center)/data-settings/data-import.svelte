<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import SettingInfoItem from "@/components/buss/settings/setting-info-item.svelte";
	import Button from "@/components/ui/button/button.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { Upload } from "@lucide/svelte";

	function handleImport() {
		console.log("Importing data...");
	}
</script>

{#snippet importButton()}
	<Button
		size="sm"
		onclick={handleImport}
		variant="outline"
		class="border-border text-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring dark:border-border dark:text-foreground dark:hover:bg-muted dark:hover:text-foreground border bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
	>
		<Upload className="size-4" />
		{m.settings_importLabel()}
	</Button>
{/snippet}

<div class="gap-settings-gap flex flex-col">
	<Label class="text-label-fg">{m.settings_importData()}</Label>
	<SettingInfoItem label={m.settings_importFromBackup()} action={importButton} />
</div>
