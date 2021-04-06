<!-- @format -->

# NextJS boilerplate

| Maintainers    | Technologies                          |
| :------------- | :------------------------------------ |
| [@Chris-Baker] | React (Typescript/NextJS/Bootstrap 4) |

## Structure

```
├── _templates          <-- Hygen code generation templates
├── public              <-- Static files for NextJS to serve
└── src
│   ├── components
│   ├── helpers
│   ├── pages
│   ├── styles          <-- Bootstrap theme and other global styles
│   └── types           <-- Project global types and interfaces
└─── typings            <-- Type overrides and declarations
```

## Local Development

### Requirements

| Tool    | Version      | Notes                                                                                   |
| :------ | :----------- | :-------------------------------------------------------------------------------------- |
| NodeJS  | `lts/erbium` | Easy version management via [nvm]. Version will be auto-selected if using zsh on MacOS.

### Setup

-   Run `nvm use` in order to switch to the defined project version of NodeJS
-   Run `npm ci` from the root of the repository.

### Running locally

Run the dev server `npm run dev` which will start the NextJS application.

### Code Style & Linting

[Prettier] handles code style and is run against staged files in a pre-commit hook. This is complimented by [ESLint] that runs in CI, or by running `npm run lint`.

### Theming Bootstrap

The Bootstrap theme is loaded through Emotion as a single CSS file `./src/styles/bootstrap-theme.css`. Don't edit it manually, go to [Bootstrap Magic] and generate a theme.

Copy the generated CSS theme file and the SCSS variables files into `./src/styles/bootstrap-theme.css` and `./src/styles/bootstrap-variables.scss`. You can then reload and edit your theme on Bootstrap Magic using your variables file.

### Code generation via Hygen

#### Getting started

React components and pages can be generated using [hygen].

Running the following command will create a `Modal` component in `./src/components/molecules`

```bash
$ npx hygen component new --type molecule --name modal
```

All the required component files are generated including styles.

```bash
./src/components/molecules/modal
-- index.tsx
-- modal.styles.ts
```

#### Component types

There are four types of component: `atom`, `molecule`, `organism` and `view` which also have the shorthand aliases `a`, `m` `o`, and `v`.

Atom is the default if the `--type` switch is omitted.

Different kinds of components can be generated like so:

**Atoms**

Atoms live in `./src/components/atoms`

```bash
$ npx hygen component new --type atom --name tab
$ npx hygen component new --type a --name tab
```

**Molecules**

Molecules live in `./src/components/molecules`

```bash
$ npx hygen component new --type molecule --name tab-group
$ npx hygen component new --type m --name tab-group
```

**Organisms**

Organisms live in `./src/components/organisms`

```bash
$ npx hygen component new --type organism --name tabbed-content
$ npx hygen component new --type o --name tabbed-content
```

**Views**

Views live in `./src/components/views`

```bash
$ npx hygen component new --type views --name home
$ npx hygen component new --type v --name home
```

#### Pages

Running the following command will create a `Home` page in `./src/pages`

```bash
$ npx hygen page new --name home
```

```bash
./src/pages
-- home.tsx
```

[nvm]: https://github.com/creationix/nvm
[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[hygen]: https://www.hygen.io
[@chris-baker]: https://github.com/Chris-Baker
[bootstrap magic]: https://pikock.github.io/bootstrap-magic/app/index.html#!/editor
