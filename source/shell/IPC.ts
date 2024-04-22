import { BrowserWindow, dialog, ipcMain } from 'electron';
import { appendFile, writeFile } from 'fs/promises';
import open from 'open';

export default () => {
  ipcMain.handle('window-shell-minimize', () => {
    const window = BrowserWindow.getFocusedWindow();

    window?.minimize();
  });

  ipcMain.handle('window-shell-hide', () => {
    const window = BrowserWindow.getFocusedWindow();

    window?.hide();
  });

  ipcMain.handle('window-shell-close', () => {
    const window = BrowserWindow.getFocusedWindow();

    window?.close();
  });

  ipcMain.handle(
    'show-save-file-picker',
    async (event, { suggestedName }: { suggestedName?: string }) => {
      const { filePath } = await dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(),
        { defaultPath: suggestedName }
      );
      if (!filePath) throw new ReferenceError('User canceled file picking');

      return { filePath };
    }
  );
  ipcMain.handle(
    'write-file',
    (event, filePath: string, buffer: ArrayBuffer, overwrite = false) =>
      overwrite
        ? writeFile(filePath, Buffer.from(buffer))
        : appendFile(filePath, Buffer.from(buffer))
  );

  ipcMain.handle('open-URI', async (event, target: string) => {
    const process = await open(target);

    return new Promise<number>((resolve, reject) => {
      process.on('close', resolve);
      process.on('error', reject);
    });
  });
};
