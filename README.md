# SabersProps

![License](https://img.shields.io/github/license/ocleos/sabersprops?label=License&color=10b981)
![Version](https://img.shields.io/github/package-json/version/ocleos/sabersprops?label=Version&color=10b981)

[![Expo](https://img.shields.io/badge/Build_with-Expo-000020?&logo=expo)](https://expo.dev/)
[![Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?&logo=biome)](https://biomejs.dev)
[![Supabase](https://img.shields.io/badge/Connected_with-Supabase-3FCF8E?&logo=supabase)](https://supabase.com/)

---

Application to manage collection of lightsaber and props movies replica.

## Features

- Authentication
- List of props
- Detail of a prop
- List of props' pieces
- Stats :
  - Category
  - Prices
  - Expenses
- Notes management
- Tools :
  - Aurebesh translator
- Light / Black theme
- Translation :
  - English
  - French

## Requirements

- [NodeJS](https://nodejs.org/fr) : **recommended LTS (v20.15.1)**, minimum v18.18.0
- [Yarn](https://yarnpkg.com/) v4+
- IDE ([VSCode](https://code.visualstudio.com/) recommanded)
- [Android Studio](https://developer.android.com/studio?hl=fr) and / or [xCode](https://developer.apple.com/xcode/)
- **Corepack** activated :

```bash
corepack enable
```

Monorepo with [TurboRepo](https://turbo.build/) and [Yarn Workspaces](https://yarnpkg.com/features/workspaces)

## Environment Variables

To run this project, you will need to add the following environment variables to your **.env.local** file

- `supabaseApiKey` : Key for supabase account

## Installation & Run

- Clone the project

```bash
git clone git@github.com:Ocleos/SabersProps.git
```

- Install dependencies

```bash
yarn install
```

- Start the project

```bash
yarn dev:mobile
```

## Librairies & Tech

### Framework

- [React Native](https://reactnative.dev/) / [React](https://fr.react.dev/)
- [Expo](https://expo.dev/)
- [Typescript](https://www.typescriptlang.org/)

### UI & Graphical

- [NativeWind](https://www.nativewind.dev/) / [TailwindCSS](https://tailwindcss.com/)
- [React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/)
- [Lucide Icons](https://lucide.dev/icons/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Flashlist](https://shopify.github.io/flash-list/)
- [Bottom-Sheet](https://ui.gorhom.dev/components/bottom-sheet)
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Font Exo2](https://github.com/expo/google-fonts/tree/master/font-packages/exo-2#readme)
- [Illustrations](https://storyset.com/)

### Database, Store & API

- [Supabase](https://supabase.com/)
- [SWR](https://swr.vercel.app/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Forms

- [React Hook Forms](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

### Charts

- [ECharts](https://echarts.apache.org/en/index.html)
- [React Native ECharts](https://wuba.github.io/react-native-echarts/)

### Lint

- [BiomeJS](https://biomejs.dev/)
- [Husky](https://typicode.github.io/husky/)
- [Commitlint](https://commitlint.js.org/)

### Tools

- [DayJS](https://day.js.org/)
- [Radash](https://radash-docs.vercel.app/docs/getting-started)
- [i18next](https://www.i18next.com/)
- [Dotenv](https://www.dotenv.org/)

### Deployment

- [EAS](https://github.com/expo/eas-cli)
- [Release-It](https://github.com/release-it/release-it)
- [Auto-changelog](https://github.com/cookpete/auto-changelog)

## Build

- Build development :

```bash
yarn build:dev
```

- Build Testing :

```bash
yarn build:preview
```

- Build Production / Store :

```bash
yarn build:prod
```

## Lint

Lint and format is done with the lib [BiomeJS](https://biomejs.dev/).

To check if there is a warning or an error :

```bash
yarn biome ci .
```

To format the files :

```bash
yarn format
```

To correct lint errors :

```bash
yarn lint
```

## CI / CD

The version management is done with [Release-It](https://github.com/release-it/release-it).

To increase the version :

```bash
yarn release
```

A tag will be created automatically.

The accounts Github and Expo are linked.
So if a new tag is created on git, a build pipeline is automatically launched.

## Roadmap

- Automatics tests (Unit & E2E)
- Authentication / Profile
  - User avatar
  - Change password
  - Update User
  - Password forgotten
- Collection
  - Props' detail
    - Pictures gallery
- List of accessories to do
- Disposition
  - Group
  - Drag & Drop
- Export / Import
- Sync on cloud

## License

[MIT](https://choosealicense.com/licenses/mit/)
