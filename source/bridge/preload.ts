import { contextBridge, ipcRenderer } from 'electron';

const createFileHandle = (meta: any) =>
  ({
    ...meta,
    createWritable: async ({
      keepExistingData
    }: {
      keepExistingData?: boolean;
    }) => ({
      write: (buffer: BufferSource) =>
        ipcRenderer.invoke(
          'write-file',
          meta.filePath,
          buffer,
          !keepExistingData
        ),
      close: async () => {}
    }),
    toJSON: () => meta
  }) as FileSystemFileHandle;

const openURI = (target: string) => ipcRenderer.invoke('open-URI', target);

contextBridge.exposeInMainWorld('windowShell', {
  minimize: () => ipcRenderer.invoke('window-shell-minimize'),
  hide: () => ipcRenderer.invoke('window-shell-hide'),
  close: () => ipcRenderer.invoke('window-shell-close'),
  createFileHandle,
  showSaveFilePicker: async (options: { suggestedName?: string }) => {
    const meta = await ipcRenderer.invoke('show-save-file-picker', options);

    return createFileHandle(meta);
  },
  openURI
});

window.addEventListener('click', event => {
  const { target } = event;

  if (target instanceof HTMLAnchorElement && target.target === '_blank') {
    event.preventDefault();

    openURI(target.href);
  }
});
