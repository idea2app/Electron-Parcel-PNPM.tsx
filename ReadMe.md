# Electron-Parcel-PNPM.tsx

**Web native-app** project scaffold based on [TypeScript][1], [React][2] & [Electron][3], which is inspired by [WebCell scaffold][4].

[![CI & CD](https://github.com/idea2app/Electron-Parcel-PNPM.tsx/actions/workflows/main.yml/badge.svg)][5]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][6]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][7]

## Technology stack

- Language: [TypeScript v5][1]
- Component engine: [React v18][2]
- App framework: [Electron v30][3]
- Package bundler: [Parcel v2][8]
- Package manager: [PNPM v9][9]
- CI / CD: GitHub [Actions][10] + [Pages][11]

## Quick start

```shell
cd ~/Desktop
git clone https://github.com/idea2app/Electron-Parcel-PNPM.tsx
cd Electron-Parcel-PNPM.tsx

npm i pnpm -g
pnpm i
npm start
```

## Building

### to a folder

```shell
pnpm package
```

it'll generate a folder with Electron runtime & compiled code in `out/{name}-{OS}-{CPU}/`.

### to an executable file

```shell
pnpm make
```

it'll generate an executable file for setup in `out/make`.

## Releasing

```shell
git tag v2.0.0  # same with `package.json#version`
git push origin --tags
```

GitHub actions will build & publish to [repository releases][12], then you need to edit & submit the draft release.

[1]: https://www.typescriptlang.org/
[2]: https://react.dev/
[3]: https://www.electronjs.org/
[4]: https://github.com/EasyWebApp/scaffold
[5]: https://github.com/idea2app/Electron-Parcel-PNPM.tsx/actions/workflows/main.yml
[6]: https://codespaces.new/idea2app/Electron-Parcel-PNPM.tsx
[7]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Electron-Parcel-PNPM.tsx
[8]: https://parceljs.org/
[9]: https://pnpm.io/
[10]: https://github.com/features/actions
[11]: https://pages.github.com/
[12]: https://github.com/idea2app/Electron-Parcel-PNPM.tsx/releases
