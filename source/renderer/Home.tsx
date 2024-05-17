export const HomePage = () => (
  <>
    <h1>Electron examples</h1>

    <h2>Window maximizing</h2>
    <button onClick={windowShell.maximize}>windowShell.maximize()</button>

    <h2>Window minimizing</h2>
    <button onClick={windowShell.minimize}>windowShell.minimize()</button>

    <h2>Window closing</h2>
    <button onClick={windowShell.close}>windowShell.close()</button>

    <h2>Directory Picker</h2>
    <button
      onClick={async () => {
        const { realPath } = await windowShell.showDirectoryPicker();

        alert(realPath);
      }}
    >
      windowShell.showDirectoryPicker()
    </button>

    <h2>Open File Picker</h2>
    <button
      onClick={async () => {
        const files = await windowShell.showOpenFilePicker({ multiple: true });

        alert(files.map(({ realPath }) => realPath).join('\n'));
      }}
    >
      windowShell.showOpenFilePicker()
    </button>

    <h2>Save File Picker</h2>
    <button
      onClick={async () => {
        const { realPath } = await windowShell.showSaveFilePicker({
          suggestedName: 'example.txt'
        });

        alert(realPath);
      }}
    >
      windowShell.showSaveFilePicker()
    </button>

    <h2>Open URI</h2>
    <a
      target="_blank"
      href="https://github.com/idea2app/Electron-Parcel-PNPM.tsx"
    >
      Source code
    </a>

    <h2>ZIP</h2>
    <button
      onClick={async () => {
        const { realPath } = await windowShell.showDirectoryPicker();

        await windowShell.zip(realPath, `${realPath}.zip`);

        await windowShell.openURI(`${realPath}.zip`);
      }}
    >
      windowShell.zip()
    </button>

    <h2>Unzip</h2>
    <button
      onClick={async () => {
        const [{ realPath }] = await windowShell.showOpenFilePicker();

        const target = realPath.replace(/\.zip$/, '');

        await windowShell.unzip(realPath, target);

        await windowShell.openURI(target);
      }}
    >
      windowShell.unzip()
    </button>
  </>
);
