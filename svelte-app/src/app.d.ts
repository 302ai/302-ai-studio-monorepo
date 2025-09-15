declare global {
	namespace App {}

	interface Window {
		api?: {
			ping: () => Promise<string>;
			window: {
				minimize: () => Promise<void>;
				maximize: () => Promise<void>;
				close: () => Promise<void>;
				isMaximized: () => Promise<boolean>;
			};
			platform: () => Promise<string>;
		};
	}
}

export {};
