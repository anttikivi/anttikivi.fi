# My website

[![Main workflow](https://github.com/anttikivi/website/actions/workflows/main.yml/badge.svg)](https://github.com/anttikivi/website/actions/workflows/main.yml)

This is my personal website available at
[anttikivi.fi](https://www.anttikivi.fi).

## Requirements

This repository requires [Node.js](https://nodejs.org) 20 or newer. It uses
[`npm`](https://www.npmjs.com) as a package manager. `npm` comes bundled with
Node.js.

## Getting started

To get started with the website, you need to clone the repository. You can do so
by either using HTTPS, SSH, or the GitHub CLI.

```sh
git clone git@github.com:anttikivi/anttikivi.github.io.git # SSH
git clone https://github.com/anttikivi/anttikivi.github.io.git # HTTPS
gh repo clone anttikivi/anttikivi.github.io # GitHub CLI
```

After cloning the repository, you need to install the dependencies. First change
to the cloned repository.

```sh
cd anttikivi.github.io
```

Then install the dependencies with `npm`.

```sh
npm install
```

### Running the website locally

To run the website locally, you should use the scripts in
[`package.json`](/package.json).

```sh
npm run dev
```

### Building

To build the website, you should, as expected, use the scripts in
[`package.json`](/package.json).

```sh
npm run build
```

### Linting and formatting

[`package.json`](/package.json) includes scripts for linting and formatting the
code. To lint the codebase, use `npm run lint`. Formatting is done with
`npm run format`.

## Licence

The source code in this project is licensed under the Apache-2.0 licence. See
the [`LICENSE`](LICENSE) file for more information.

All rights are reserved for the non-code contents in this project and for the
SVG files and SVG code in
[`src/_includes/layouts/base.njk`](src/_includes/layouts/base.njk) and
[`src/assets/favicon.svg`](src/assets/favicon.svg). This includes documentation,
images, texts that are shown on the website and any other non-code materials.
These materials may not be reproduced or distributed in derivative works without
explicit permission from the copyright holder.

The Instagram and Threads logos included within the project belong to Meta
Platforms, Inc. or its subsidiaries and are not licensed under the Apache-2.0
license. Instagram and Threads are registered trademarks of Meta Platforms, Inc.
or its subsidiaries.

The GitHub logo included within the project belongs to GitHub, Inc. or its
subsidiaries and is not licensed under the Apache-2.0 license.
