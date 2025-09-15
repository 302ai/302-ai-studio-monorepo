<script lang="ts">
	import sendMessageIcon from "$lib/assets/send-message.svg";
	import { m } from "$lib/paraglide/messages.js";
	import { ModelSelect } from "@/components/buss/model-select";
	import { Button } from "@/components/ui/button";
	import { Separator } from "@/components/ui/separator";
	import { Textarea } from "@/components/ui/textarea";
	import { chatState } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import { toast } from "svelte-sonner";
	import { match } from "ts-pattern";
	import { AttachmentThumbnailBar } from "../attachment";
	import ChatActions from "./chat-actions.svelte";

	let openModelSelect = $state<() => void>();

	function handleSendMessage() {
		match({
			isEmpty: chatState.inputValue.trim() === "" && chatState.attachments.length === 0,
			noModel: chatState.selectedModel === null,
		})
			.with({ isEmpty: true }, () => {
				toast.warning(m.toast_empty_message());
			})
			.with({ noModel: true }, () => {
				toast.warning(m.toast_no_model(), {
					action: {
						label: m.text_button_select_model(),
						onClick: () => openModelSelect?.(),
					},
				});
			})
			.otherwise(() => {
				if (chatState.hasMessages) {
					chatState.sendMessage();
				} else {
					document.startViewTransition(() => chatState.sendMessage());
				}
			});
	}
</script>

<div class="max-w-chat-max-w w-full" data-layoutid="chat-input-container">
	<AttachmentThumbnailBar />
	<div
		class={cn(
			"transition-[color,box-shadow]",
			"max-h-chat-max-h min-h-chat-min-h rounded-chat p-chat-pad flex w-full flex-col justify-between border pb-1.5",
			"focus-within:border-ring focus-within:ring-ring/50 focus-within:outline-hidden focus-within:ring-[3px]",
			"bg-input",
		)}
		data-layoutid="chat-input-box"
	>
		<Textarea
			class={cn(
				"w-full resize-none p-0",
				"focus-within:outline-hidden border-none shadow-none focus-within:ring-0 focus-visible:ring-0",
			)}
			bind:value={chatState.inputValue}
			placeholder={m.placeholder_input_chat()}
			onkeydown={(e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					handleSendMessage();
					e.preventDefault();
				}
			}}
		/>

		<div class="mt-1.5 flex flex-row justify-between">
			<ChatActions />

			<div class="flex items-center gap-2">
				<ModelSelect
					selectedModel={chatState.selectedModel}
					onModelSelect={(model) => chatState.handleSelectedModelChange(model)}
				>
					{#snippet trigger({ onclick })}
						{((openModelSelect = onclick), "")}
						<Button
							variant="ghost"
							class="text-foreground/50 hover:!bg-chat-action-hover text-sm"
							{onclick}
						>
							{chatState.selectedModel?.name ?? m.text_button_select_model()}
						</Button>
					{/snippet}
				</ModelSelect>

				<Separator
					orientation="vertical"
					class="rounded-2xl data-[orientation=vertical]:h-1/2 data-[orientation=vertical]:w-0.5"
				/>

				<button
					class={cn(
						"bg-chat-send-message-button text-foreground hover:!bg-chat-send-message-button/80 flex size-9 items-center justify-center rounded-[10px]",
						"disabled:bg-chat-send-message-button/50 disabled:hover:!bg-chat-send-message-button/50 disabled:cursor-not-allowed",
					)}
					onclick={handleSendMessage}
				>
					<img src={sendMessageIcon} alt="plane" class="size-5" />
				</button>
			</div>
		</div>
	</div>
</div>
