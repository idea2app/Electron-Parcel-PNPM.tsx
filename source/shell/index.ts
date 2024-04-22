import { BrowserWindow, app } from 'electron';
import { join } from 'path';

import registerIPC from './IPC.js';
import { logError } from './utility.js';

async function createWindow() {
  const appRoot = join(app.getAppPath(), 'dist');

  const window = new BrowserWindow({
    webPreferences: {
      devTools: true,
      preload: join(appRoot, 'bridge/preload.js')
    }
  });

  if (app.isPackaged)
    await window.loadFile(join(appRoot, 'renderer/index.html'));
  else await window.loadURL('http://localhost:1234');

  window.maximize();

  if (!app.isPackaged) window.webContents.openDevTools();
}

(async () => {
  await app.whenReady();

  registerIPC();

  app
    .on('activate', () => BrowserWindow.getAllWindows()[0] || createWindow())
    .on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
    .on('render-process-gone', (event, webContents, details) =>
      logError('render-process-gone', details)
    )
    .on('child-process-gone', (event, details) =>
      logError('child-process-gone', details)
    );
  await createWindow();
})();

process.on('unhandledRejection', logError).on('uncaughtException', logError);
