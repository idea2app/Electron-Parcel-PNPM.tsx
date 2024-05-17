declare interface FileSystemHandle {
  realPath: string;
  remove: (options: { recursive?: boolean }) => Promise<void>;
  toJSON: () => object;
}

declare const windowShell: {
  maximize: () => boolean;
  minimize: () => void;
  hide: () => void;
  close: () => void;
  createFileSystemHandle: (meta: FileSystemHandle) => FileSystemHandle;
  showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
  createFileHandle: (meta: FileSystemFileHandle) => FileSystemFileHandle;
  showOpenFilePicker: (options?: {
    multiple?: boolean;
  }) => Promise<FileSystemFileHandle[]>;
  showSaveFilePicker: (options?: {
    suggestedName?: string;
  }) => Promise<FileSystemFileHandle>;
  openURI: (target: string, parameters?: string[]) => Promise<number>;
  zip: (source: string, target: string) => Promise<void>;
  unzip: (source: string, target: string) => Promise<void>;
};

declare interface Window {
  windowShell: typeof windowShell;
}
