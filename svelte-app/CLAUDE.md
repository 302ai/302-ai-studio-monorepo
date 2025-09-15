# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager.

**Core Development:**

- `pnpm dev` - Start development server with Vite
- `pnpm build` - Build production version
- `pnpm preview` - Preview production build

**Code Quality:**

- `pnpm check` - Run Svelte type checking and sync
- `pnpm check:watch` - Run type checking in watch mode
- `pnpm lint` - Run Prettier formatting check and ESLint
- `pnpm format` - Format code with Prettier

## Architecture Overview

This is a **SvelteKit 5** application using the modern `$props()` and `{@render}` syntax. The project is configured as a static site using `@sveltejs/adapter-static`.

### Key Technologies:

- **Svelte 5** with new runes syntax (`$props()`, `$bindable()`, etc.)
- **TailwindCSS 4.0** with the new Vite plugin
- **TypeScript** for type safety
- **Paraglide JS** for internationalization (i18n) with generated messages in `src/lib/paraglide/`
- **@lucide/svelte** for icons
- **bits-ui** and custom UI components for the design system

### Project Structure:

**Route Architecture:**

- `src/routes/(with-sidebar)/` - Pages with sidebar layout (dashboard, etc.)
- `src/routes/(full-width)/` - Pages without sidebar (full-width layouts)

**Component System:**

- `src/lib/components/ui/` - Reusable UI components (button, sidebar, alert, etc.)
- `src/lib/components/buss/` - Business logic components organized by feature
- Components follow the shadcn/ui pattern with index.ts barrel exports
- Sidebar components use context pattern with `useSidebar()` hook

**Internationalization:**

- Messages are defined in `messages/en.json`, `messages/zh.json` (source files)
- Auto-generated code in `src/lib/paraglide/messages/` (DO NOT edit manually)
- Import pattern: `import { m } from '$lib/paraglide/messages.js'`
- Usage: `m.message_key({ param: 'value' })` for parameterized messages
- Locale switching: `import { setLocale } from '$lib/paraglide/runtime'`

**Styling:**

- **TailwindCSS 4.0** with `@theme` directive
- New Design System token layer: `src/lib/theme/ds.css`
  - Exposed tokens: `--ui-*` (user-safe, minimal and precise)
  - Derived tokens + @theme bridge → utility classes (e.g., `bg-tab-active`, `h-tab-h`)
- Users can customize styles by overriding `--ui-*` variables (supports settings page injection)
- Theme switching via `theme-switcher.svelte` component
- Uses `mode-watcher` for dark/light mode detection

**TailwindCSS 4 Theme Variables (Design System):**

- Component style variables are uniformly defined in `src/lib/theme/ds.css`. Don't put business component variables in `app.css` anymore.
- Layered approach:
  - Exposed (`--ui-*`): A small number of user-facing safe variables (surface, primary color, radius, density, etc.)
  - Derived: Component-level variables calculated based on `--ui-*` (e.g., tab hover, spacing)
  - @theme bridge: Maps variables to Tailwind v4 utility classes (e.g., `bg-*`, `h-*`, `size-*`, `rounded-*`)
- Naming conventions:
  - Colors `--color-*`, spacing `--spacing-*`, sizes `--size-*`, border-radius `--radius-*` generate corresponding utility classes via @theme
  - External exposure should use `--ui-*` as much as possible, avoiding exposing too many detail variables
  - See existing examples in `src/lib/theme/ds.css` and `src/lib/theme/README.md`

### Naming Simplification

- New, shorter aliases are provided to reduce verbosity while keeping backward compatibility.
- Prefer simplified utilities in new code; legacy names remain supported.
- Examples:
  - Tabs: `max-w-tab-title` (alias of `max-w-tab-title-max-w`), `h-tab` (alias of `h-tab-h`)
  - Settings: `h-settings-item`, `px-settings-item-x`, `py-settings-item-y`
  - Segmented: `h-seg`, `h-seg-thumb`, `px-seg-x`
  - Chat: `size-chat-icon` (alias of `size-chat-icon-size`)

### Key Patterns:

**Svelte 5 Component Pattern with Module Script:**

```svelte
<script lang="ts" module>
	// Type definitions and exports (shared across instances)
	export type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
	};

	interface Props {
		tab: Tab;
		isActive: boolean;
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
	}
</script>

<script lang="ts">
	// Component logic (instance-specific)
	import { X } from "@lucide/svelte";
	import { cn } from "$lib/utils";

	let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>
```

**Icon Usage:**

```svelte
<script lang="ts">
	import { X, Menu, Home } from "@lucide/svelte";
</script>

<!-- Standard fixed sizes -->
<X class="h-4 w-4" />

<!-- Using DS token-generated utilities -->
<X class="size-tab-close-icon" />
<Plus class="size-tab-icon" />
```

**Component Organization:**

- Business components in `src/lib/components/buss/feature-name/`
- Each component folder contains:
  - Component files (e.g., `tab-item.svelte`)
  - `index.ts` for exports following this pattern:

```ts
import Root from "./accordion.svelte";
import Content from "./accordion-content.svelte";
import Item from "./accordion-item.svelte";
import Trigger from "./accordion-trigger.svelte";

export {
	Root,
	Content,
	Item,
	Trigger,
	//
	Root as Accordion,
	Content as AccordionContent,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
};
```

**Internationalization Pattern:**

```svelte
<script lang="ts">
	import { setLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages.js";
</script>

<h1>{m.hello_world({ name: "User" })}</h1>
<button onclick={() => setLocale("zh")}>中文</button>
```

**Customizable Component Pattern (Tab Bar Example):**

```svelte
<!-- tab-item.svelte -->
<script lang="ts" module>
	export type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
	};
</script>

<script lang="ts">
	import { X } from "@lucide/svelte";
	import { cn } from "$lib/utils";

	let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>

<div
	class={cn(
		"relative flex h-tab-h w-tab-w items-center gap-tab-gap rounded-tab px-tab-pad-x text-sm",
		isActive
			? "bg-tab-active text-tab-fg-active shadow-sm"
			: "bg-tab-inactive text-tab-fg-inactive hover:bg-tab-hover",
	)}
	onclick={() => onTabClick(tab)}
>
	<span class="max-w-tab-title-max-w truncate">{tab.title}</span>
	{#if tab.closable !== false}
		<button
			class="rounded p-tab-close-pad hover:bg-tab-btn-hover-inactive"
			onclick={(e) => {
				e.stopPropagation();
				onTabClose(tab);
			}}
		>
			<X class="size-tab-close-icon" />
		</button>
	{/if}
</div>
```

**Path Aliases:**

- `@/*` maps to `./src/lib/*` (configured in svelte.config.js)

## Component Customization Guidelines

### Creating Customizable Components

**Best Practices:**

1. Prioritize using `src/lib/theme/ds.css` to define/extend tokens (don't put business tokens in `app.css`)
2. Expose as few and semantically clear `--ui-*` variables as possible, with the rest as derived internal variables
3. Use @theme to expose tokens as utility classes (`bg-*`, `h-*`, `px-*`, `size-*`, `rounded-*`)
4. Replace hardcoded/arbitrary values with these utility classes in components to reduce style fragmentation
5. Use consistent naming for the same semantics to facilitate large-scale maintenance

**Token Definition Example (in ds.css):**

```css
/* Exposed */
:root {
	--ui-accent: var(--accent);
	--ui-accent-fg: var(--accent-foreground);
	--ui-radius: 0.375rem;
}

/* Bridge */
@theme {
	--color-tab-active: var(--ui-accent);
	--color-tab-fg-active: var(--ui-accent-fg);
	--spacing-tab-h: 2rem;
	--radius-tab: var(--ui-radius);
}
```

**Component Implementation:**

```svelte
<!-- Instead of hardcoded classes -->
<div class="h-8 w-32 bg-background text-foreground">

<!-- Use DS token classes -->
<div class="h-tab-h w-tab-w bg-tab-active text-tab-fg-active rounded-tab">
```

**User Customization (Safe):**
Only allow overriding `--ui-*` variables to avoid arbitrary CSS injection:

```css
/* e.g. via Settings raw textarea */
--ui-accent: oklch(65% 0.16 280);
--ui-accent-fg: #fff;
--ui-radius: 0.5rem;
```

Or inject via code:

```ts
import { applyUserVars, applyRawUserCss } from "$lib/theme/user-theme";

applyUserVars({ "--ui-accent": "#9b59b6", "--ui-radius": "8px" });
// or
applyRawUserCss("--ui-accent: oklch(65% 0.16 280);\n--ui-radius: 8px;");
```

> Note: Old tab-related @theme keys and variables have been removed from `app.css`; new business tokens should be uniformly placed in `src/lib/theme/ds.css`.
