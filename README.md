# YohDev Gutenberg Blocks

A collection of custom [Gutenberg](https://developer.wordpress.org/block-editor/) blocks for WordPress, authored by **YohDev**. The plugin adds a set of reusable layout and content blocks (hero sections, cards, CTAs, buttons, and more) under their own **"YohDev Blocks"** category in the block editor.

Blocks are written in ESNext/JSX with SCSS and compiled with [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

---

## Overview

- Every folder inside `includes/block-editor/blocks/` is **registered automatically** on the WordPress `init` hook — there's no manual list of blocks to maintain in PHP (see `yohdev-blocks.php`).
- A custom block category, **YohDev Blocks** (`yohdev-blocks-category`), is added so the plugin's blocks group together in the inserter.
- `myguten.js` is compiled through the build pipeline and enqueued in the editor; it uses `@wordpress/hooks` `addFilter` to attach helper classes (e.g. a `container` class on core columns, a `btn` class on the YohDev button).
- Shared design tokens (colors, typography, responsive breakpoints, mixins) live in `includes/base/`.

## Requirements

- WordPress **6.7+** (built and tested against **7.0**, Block API v3)
- PHP **7.4+**
- Node.js **20+** and npm for building assets
- [Docker](https://www.docker.com/) (optional) for the containerized local environment via `@wordpress/env`

## Installation

```bash
# 1. Clone into your WordPress plugins directory
cd wp-content/plugins
git clone <repo-url> yohdev-blocks
cd yohdev-blocks

# 2. Install dependencies
npm install

# 3. Build the compiled assets
npm run build
```

Then activate **YohDev Gutenberg Blocks** from the WordPress admin under **Plugins**. The blocks appear in the editor under the **YohDev Blocks** category.

## Local development

The fastest way to get a WordPress site running with this plugin is the
containerized environment provided by [`@wordpress/env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
(requires Docker):

```bash
npm install          # Install dependencies
npm run env:start    # Boot a WordPress 7.0 container with the plugin active
npm start            # Watch mode — rebuilds blocks on change
```

The site is available at **http://localhost:8888** (admin: `admin` / `password`).
The plugin is mapped into the container, so edits rebuilt by `npm start` are
picked up immediately.

```bash
npm run env:stop     # Stop the containers
npm run env:clean    # Reset the environment
```

Other useful scripts:

```bash
npm run build      # Production build into build/
npm run plugin:zip # Build and package a distributable plugin zip
npm run format     # Format source files
npm run lint       # Lint JavaScript and styles
npm run lint:js    # Lint JavaScript only (WordPress ESLint config)
npm run lint:css   # Lint SCSS/CSS only
npm run packages-update  # Update @wordpress/* dependencies
```

The compiled output in `build/` is generated from the source — it is **not**
committed to the repository (it's in `.gitignore`). Run `npm run build` (or
`npm start`) before activating the plugin from a fresh checkout, or ship the
zip produced by `npm run plugin:zip`. CI builds the plugin on every push.

## Project structure

```
yohdev-blocks/
├── yohdev-blocks.php            # Plugin entry — auto-registers blocks + adds the category
├── myguten.js                   # Editor-side block filters (adds helper classes)
├── webpack.config.js            # Build entries (extends @wordpress/scripts config)
├── package.json
├── includes/
│   ├── base/                    # Shared SCSS: variables, mixins, breakpoints, utilities
│   └── block-editor/
│       └── blocks/              # One folder per block (see table below)
├── assets/                      # Block config + Mustache templates for scaffolding blocks
├── build/                       # Compiled JS/CSS (generated — gitignored, do not edit)
├── .wp-env.json                 # Containerized WordPress dev environment config
└── readme.txt                   # WordPress.org-style plugin readme
```

Each block folder follows the standard Gutenberg layout:

```
<block>/
├── block.json     # Metadata (name, title, attributes, scripts/styles)
├── index.js       # Registers the block type
├── edit.js        # Editor UI (React component)
├── save.js        # Saved/front-end markup
├── style.scss     # Front-end styles
└── editor.scss    # Editor-only styles
```

## Included blocks

| Block | Name | Description |
|-------|------|-------------|
| Hero | `yohdev/hero` | Full-width hero with background image, color/opacity overlay, and nested inner blocks |
| Header | `yohdev/header` | Header section |
| Button | `yohdev/button` | Link/button element (receives a `btn` class via `myguten.js`) |
| Image With Text | `yohdev/image-with-text` | Image paired with a text column |
| CTA | `yohdev/cta` | Call-to-action section |
| Capable Card | `yohdev/capable-card` | Capability card with configurable colors and font sizes |
| Single Card | `yohdev/single-card` | A single reusable card |
| Card Repeater | `yohdev/card-repeater` | Section that repeats cards in a grid layout |
| Repeater Card | `yohdev/repeater-card` | Card-repeater variant |
| CPT Selection | `yohdev/cpt-selection` | Dynamic block that lists recent posts as a card grid (server-rendered via `render.php`) |
| Block Two | `yohdev/block-two` | Starter/example block |

## Adding a new block

1. Create a new folder under `includes/block-editor/blocks/` with the standard files (`block.json`, `index.js`, `edit.js`, `save.js`, `style.scss`, `editor.scss`). The `assets/templates/` directory contains scaffolding templates you can copy from.
2. Run `npm start` (or `npm run build`). Both the webpack entries **and** the PHP registration are derived automatically from the blocks directory, so no `webpack.config.js` or PHP changes are needed.

## License

[GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html) © YohDev
