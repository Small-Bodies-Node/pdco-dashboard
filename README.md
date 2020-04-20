# README

## What's This?

Code for PDCO Dashboard.

## Dev Notes

### Quick Start

1. Install `node` using one of these methods:

   1. Easiest: Go [here](https://nodejs.org/en/download/), download, etc.
   2. Better: use your system's package manager (e.g. `brew install node`, `sudo apt install node`)
   3. Recommended: install `nvm` first via instructions [here](https://github.com/nvm-sh/nvm/blob/master/README.md), then `nvm install 10; nvm use 10`.

2. Download code, install packages:

   1. `git clone https://github.com/Small-Bodies-Node/pdco-dashboard.git`
   2. `cd pdco-dashboard`
   3. `npm install`

3. Run development server and follow instructions: `npm run start`

### Building & Deploying

This repo comes with bash scripts for building/deploying on unix-like systems. All such scripts begin `_`. These scripts wrap around the `create-react-app` script launched with `npm run build` and then deploy using `rsync`, etc.

### Styling & MaterialUI

Global SCSS is available. However, on a per-component basis we're using MaterialUI again, both for its ready theming and for its encapsulate-able scss-like css-in-js stylings.

For layout, we're heavily using css grid. If you haven't used css-grid before then see the talk ["CSS Grid Changes Everything"](https://www.youtube.com/watch?v=txZq7Laz7_4).

### Code Tools

- Typescript: if you aren't using typescript, then behold my works and despair!
- Code formatting: VSCode settings, as well as more generic `.editorconfig` settings are provided to encourage consistent code formatting. Husky/Lint-Staged are integrated with the git/package.json setup to force `.prettierrc` code-formatting rules at commit time.
