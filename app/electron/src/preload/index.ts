import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

const api = {
	ping: () => ipcRenderer.invoke("ping"),
	window: {
		minimize: () => ipcRenderer.invoke("window:minimize"),
		maximize: () => ipcRenderer.invoke("window:maximize"),
		close: () => ipcRenderer.invoke("window:close"),
		isMaximized: () => ipcRenderer.invoke("window:isMaximized"),
	},
	platform: () => ipcRenderer.invoke("platform"),
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
