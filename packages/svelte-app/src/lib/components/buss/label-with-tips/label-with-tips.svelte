<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { cn } from "@/utils";
	import { CircleQuestionMark } from "@lucide/svelte";

	interface Props {
		label: string;
		tips: string;
		tooltipPlacement?: "top" | "bottom" | "left" | "right";
		class?: string;
	}

	let { label, tips, tooltipPlacement = "right", class: className }: Props = $props();
</script>

<div class="flex flex-row items-center gap-x-1" data-slot="label">
	<Label class="text-label-fg">{label}</Label>
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<CircleQuestionMark class="text-label-fg h-3 w-3" />
			</Tooltip.Trigger>

			<Tooltip.Content
				class={cn(
					"bg-overlay text-overlay-foreground rounded-[10px] border p-0 text-sm/6",
					className,
				)}
				side={tooltipPlacement}
				arrowClasses="hidden"
				sideOffset={5}
			>
				<div class="min-w-[200px] max-w-[300px] hyphens-auto break-all px-2.5 py-1.5 text-justify">
					{tips}
				</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
