import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

function createWindow(): void {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: join(__dirname, '../preload/index.mjs'),
			sandbox: false,
			contextIsolation: true,
			nodeIntegration: false,
			devTools: true // Enable DevTools in production for debugging
		}
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	// Add context menu for right-click to open DevTools
	mainWindow.webContents.on('context-menu', () => {
		mainWindow.webContents.toggleDevTools()
	})

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	if (is.dev) {
		mainWindow.loadURL('http://localhost:5173')
	} else {
		// In production, files are packaged in the asar and located relative to the app root
		// Use app.getAppPath() to get the correct base path for packaged apps
		const appPath = app.getAppPath()
		const rendererPath = join(appPath, 'out', 'renderer', 'index.html')
		mainWindow.loadFile(rendererPath)
	}
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.302ai.studio')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	ipcMain.handle('ping', () => 'pong')

	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
