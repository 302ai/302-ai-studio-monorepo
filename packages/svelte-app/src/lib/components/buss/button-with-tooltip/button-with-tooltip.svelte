<script lang="ts" module>
	import type { ButtonSize, ButtonVariant } from "$lib/components/ui/button/index.js";
	import type { Snippet } from "svelte";

	export interface ButtonWithTooltipProps {
		tooltip: string;
		tooltipSide?: "top" | "right" | "bottom" | "left";
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { cn } from "$lib/utils.js";

	let {
		tooltip,
		tooltipSide = "top",
		variant = "ghost",
		size = "icon",
		class: className,
		disabled,
		onclick,
		children,
	}: ButtonWithTooltipProps = $props();

	const buttonClass = $derived(cn(buttonVariants({ variant, size }), className));
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={cn(buttonClass, "group rounded-[10px]")} {disabled} {onclick}>
			{@render children?.()}
		</Tooltip.Trigger>
		<Tooltip.Content
			side={tooltipSide}
			class="rounded-[10px] border bg-overlay px-2.5 py-1.5 text-sm/6 text-overlay-foreground"
			arrowClasses="hidden"
			sideOffset={5}
		>
			{tooltip}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
