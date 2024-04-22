import { dialog } from 'electron';
import log from 'electron-log/main.js';

export function logError(...data: any[]) {
  log.error(...data);

  dialog.showErrorBox(
    'Error',
    data
      .map(item => (typeof item === 'object' ? JSON.stringify(item) : item))
      .join('\n\n')
  );
}
