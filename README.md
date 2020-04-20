# README

## What's This?

Code for PDCO Dashboard

## Dev Notes

### Quick Start

1. Install `node` using one of these two methods:

   1. Easier: use your system's package manager (e.g. `brew install node`, `sudo apt install node`)
   2. Recommended: install `nvm` first via instructions [here](https://github.com/nvm-sh/nvm/blob/master/README.md), then `nvm install 10; nvm use 10`.

2. Download code, install packages:

   - `git clone https://github.com/Small-Bodies-Node/pdco-dashboard.git`
   - `cd pdco-dashboard`
   - `npm install`

3. Run development server: `npm run start`

### Building & Deploying

This repo comes with bash scripts for building/deploying on unix-like systems. All such scripts begin `_`.

### Styling & MaterialUI

Global SCSS is available. However, on a per-component basis we're using MaterialUI again, both for its ready theming and for its encapsulate-able scss-like css-in-js stylings.
