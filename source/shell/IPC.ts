import { spawn } from 'child_process';
import { zip, unzip } from 'cross-zip';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import { statSync, write } from 'fs';
import { FileHandle, open as openFile, rmdir, unlink } from 'fs/promises';
import open from 'open';
import { parse } from 'path';
import { promisify } from 'util';

const writeFile = promisify(write),
  Zip = promisify(zip),
  unZip = promisify(unzip),
  Executable = ['.exe', '.bat', '.cmd', '.ps1', '.run', '.sh'];

export default () => {
  ipcMain.handle('window-shell-maximize', () => {
    const window = BrowserWindow.getFocusedWindow();

    const maximized = window?.isMaximized();

    if (maximized) {
      window?.unmaximize();
      return false;
    } else {
      window?.maximize();
      return true;
    }
  });

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

  ipcMain.handle('show-directory-picker', async () => {
    const {
      filePaths: [realPath]
    } = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
      properties: ['openDirectory']
    });
    if (!realPath) throw new ReferenceError('User canceled directory picking');

    return { realPath };
  });

  ipcMain.handle(
    'show-open-file-picker',
    async (event, { multiple }: { multiple?: boolean } = {}) => {
      const { filePaths } = await dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow(),
        { properties: ['openFile', multiple ? 'multiSelections' : undefined] }
      );
      if (!filePaths[0]) throw new ReferenceError('User canceled file picking');

      return filePaths.map(realPath => ({ realPath }));
    }
  );
  ipcMain.handle(
    'show-save-file-picker',
    async (event, { suggestedName }: { suggestedName?: string } = {}) => {
      const { filePath } = await dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(),
        { defaultPath: suggestedName }
      );
      if (!filePath) throw new ReferenceError('User canceled file picking');

      return { realPath: filePath };
    }
  );
  const fileMap: Record<string, FileHandle> = {};

  async function closeFile(path: string) {
    await fileMap[path]?.close();

    delete fileMap[path];
  }

  ipcMain.handle(
    'write-file',
    async (event, filePath: string, buffer: ArrayBuffer, position = 0) => {
      const data = Buffer.from(buffer),
        file = (fileMap[filePath] ||= await openFile(filePath, 'w+'));

      try {
        await writeFile(file.fd, data, 0, data.length, position);
      } catch (error) {
        closeFile(filePath);
        throw error;
      }
    }
  );
  ipcMain.handle('close-file', (event, filePath: string) =>
    closeFile(filePath)
  );

  ipcMain.handle(
    'fs-remove',
    (event, path: string, { recursive }: { recursive?: boolean } = {}) =>
      statSync(path).isDirectory() ? rmdir(path, { recursive }) : unlink(path)
  );

  ipcMain.handle(
    'open-URI',
    async (event, target: string, parameters?: string[]) => {
      const { dir, ext } = parse(target);

      const process =
        Executable.includes(ext) || parameters?.length
          ? spawn(target, parameters, { cwd: dir })
          : await open(target);

      console.log(`[Open URI] ${target} ${parameters?.join(' ')}`);

      return new Promise<number>((resolve, reject) => {
        process.on('close', resolve);
        process.on('error', reject);
      });
    }
  );
  ipcMain.handle('zip', async (event, source: string, target: string) =>
    Zip(source, target)
  );

  ipcMain.handle('unzip', async (event, source: string, target: string) =>
    unZip(source, target)
  );
};
