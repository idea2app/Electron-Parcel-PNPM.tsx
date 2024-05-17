import { contextBridge, ipcRenderer } from 'electron';

const createFileSystemHandle = (meta: any) => ({
  ...meta,
  toJSON: () => meta,
  remove: (options: { recursive?: boolean }) =>
    ipcRenderer.invoke('fs-remove', meta.realPath, options)
});

const createFileHandle = (meta: any) =>
  ({
    ...createFileSystemHandle(meta),

    createWritable: async ({
      keepExistingData
    }: {
      keepExistingData?: boolean;
    }) => ({
      write: (data: FileSystemWriteChunkType) => {
        const option =
          typeof data === 'object' && 'type' in data && !(data instanceof Blob)
            ? data
            : ({ data } as WriteParams);

        return ipcRenderer.invoke(
          'write-file',
          meta.realPath,
          option.data,
          option.position ?? (keepExistingData ? null : 0)
        );
      },
      close: () => ipcRenderer.invoke('close-file', meta.realPath)
    })
  }) as FileSystemFileHandle;

const openURI = (target: string, parameters?: string[]) =>
  ipcRenderer.invoke('open-URI', target, parameters);

contextBridge.exposeInMainWorld('windowShell', {
  minimize: () => ipcRenderer.invoke('window-shell-minimize'),
  hide: () => ipcRenderer.invoke('window-shell-hide'),
  close: () => ipcRenderer.invoke('window-shell-close'),
  createFileSystemHandle,
  showDirectoryPicker: async () => {
    const meta = await ipcRenderer.invoke('show-directory-picker');

    return createFileSystemHandle(meta);
  },
  createFileHandle,
  showSaveFilePicker: async (options: { suggestedName?: string }) => {
    const meta = await ipcRenderer.invoke('show-save-file-picker', options);

    return createFileHandle(meta);
  },
  openURI,
  zip: (source: string, target: string) =>
    ipcRenderer.invoke('zip', source, target),
  unzip: (source: string, target: string) =>
    ipcRenderer.invoke('unzip', source, target)
});

window.addEventListener('click', event => {
  const { target } = event;

  if (target instanceof HTMLAnchorElement && target.target === '_blank') {
    event.preventDefault();

    openURI(target.href);
  }
});
