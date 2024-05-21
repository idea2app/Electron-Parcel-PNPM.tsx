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

## Best practice

1. Install GitHub apps in your organization or account:

   1. [Probot settings][12]: set up Issue labels & Pull Request rules
   2. [PR badge][13]: set up Online [VS Code][14] editor entries in Pull Request description

2. Click the **[Use this template][15] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3. Recommend to add a [Notification step in GitHub actions][16] for your Team IM app

4. Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][17] instead of IM messages or Mobile Phone calls

5. Collect all these issues into [Project kanbans][18], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Quick start

```shell
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
git tag v1.0.0  # same with `package.json#version`
git push origin --tags
```

GitHub actions will build & publish to [repository releases][19], then you need to edit & submit the draft release.

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
[12]: https://probot.github.io/apps/settings/
[13]: https://pullrequestbadge.com/
[14]: https://code.visualstudio.com/
[15]: https://github.com/new?template_name=Electron-Parcel-PNPM.tsx&template_owner=idea2app
[16]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[17]: https://github.com/idea2app/Electron-Parcel-PNPM.tsx/issues/new/choose
[18]: https://github.com/idea2app/Electron-Parcel-PNPM.tsx/projects
[19]: https://github.com/idea2app/Electron-Parcel-PNPM.tsx/releases
