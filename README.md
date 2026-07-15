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
  - Informations
  - Accessories
  - Prices
- List of props' pieces
- Stats :
  - Category
  - Prices
  - Expenses
- Notes management
- Todos :
  - Props
  - Accessories
- Tools :
  - Aurebesh translator
- Light / Black theme
- Translation :
  - English
  - French

## Requirements

- [NodeJS](https://nodejs.org/fr) : **recommended LTS (v24.14)**
- [Bun](https://bun.com/) v1.3+
- IDE ([VSCode](https://code.visualstudio.com/) recommanded)
- [Android Studio](https://developer.android.com/studio?hl=fr) and / or [xCode](https://developer.apple.com/xcode/)

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
bun install
```

- Start the project

```bash
bun start
```

## Librairies & Tech

### Framework

- [React Native](https://reactnative.dev/) / [React](https://fr.react.dev/)
- [Expo](https://expo.dev/)
- [Typescript](https://www.typescriptlang.org/)

### UI & Graphical

- [Uniwind](https://uniwind.dev/) / [TailwindCSS](https://tailwindcss.com/)
- [Hero UI Native](https://heroui.com/en/docs/native/getting-started)
- [Lucide Icons](https://lucide.dev/icons/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [Flashlist](https://shopify.github.io/flash-list/)
- [Bottom-Sheet](https://ui.gorhom.dev/components/bottom-sheet)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native UI DatePicker](https://github.com/farhoudshapouran/react-native-ui-datepicker)
- [Font Exo2](https://github.com/expo/google-fonts/tree/master/font-packages/exo-2#readme)
- [Illustrations](https://storyset.com/)

### Database, Store & API

- [Supabase](https://supabase.com/)
- [TanStack Query](https://tanstack.com/query/latest)
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
- [i18next](https://www.i18next.com/)

### Testing

- [Jest](https://jestjs.io/)
- [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/)

### Deployment

- [EAS](https://github.com/expo/eas-cli)
- [Release-It](https://github.com/release-it/release-it)
- [Auto-changelog](https://github.com/cookpete/auto-changelog)

## Build

- Build development :

```bash
bun build:dev
```

- Build Testing :

```bash
bun build:preview
```

- Build Production / Store :

```bash
bun build:prod
```

## Lint

Lint and format is done with the lib [BiomeJS](https://biomejs.dev/).

To check if there is a warning or an error :

```bash
bun biome ci .
```

To format the files :

```bash
bun format
```

To correct lint errors :

```bash
bun lint
```

## CI / CD

The version management is done with [Release-It](https://github.com/release-it/release-it).

To increase the version :

```bash
bun release
```

A tag will be created automatically.

The accounts Github and Expo are linked.
So if a new tag is created on git, a build pipeline is automatically launched.

## Roadmap

- Automatics tests (E2E)
- Authentication / Profile
  - User avatar
  - Change password
  - Update / Delete User
  - Password forgotten
- Collection
  - Props' detail
    - Pictures gallery
- Disposition
  - Group
  - Drag & Drop
- Export / Import
- Sync on cloud

## Review and improvement plan

A detailed technical review, vulnerability assessment, rendering/state-management review, and prioritized action plan are available in [AUDIT.md](AUDIT.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
