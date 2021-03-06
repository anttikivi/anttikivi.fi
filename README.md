# Antti Kivi’s website

![Main workflow](https://github.com/anttikivi/anttikivi-website/workflows/Main%20workflow/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/3d60edc0-609d-4b8d-b3c1-66d7d05c7342/deploy-status)](https://app.netlify.com/sites/anttikivi/deploys)

This is the source code for [Antti Kivi’s](https://github.com/anttikivi) website-in-progress.

## Install

The released versions of the website are available on the [Releases page](https://github.com/anttikivi/anttikivi-website/releases).

### Build

Before building the website, please ensure that you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed. Please note that this project uses the [Yarn Classic](https://classic.yarnpkg.com).

First, clone the GitHub repository of the website.

**Via HTTPS:** If you’re checking out sources as read-only, HTTPS works best.

    git clone https://github.com/anttikivi/anttikivi-website.git

**Via SSH:** If you’re planning on regularly making direct commits, cloning over SSH may provide a better experience (it requires [uploading SSH keys to GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/))

    git clone git@github.com:anttikivi/anttikivi-website.git

**Via GitHub CLI:** If you work chiefly with GitHub, using the official [GitHub CLI](https://cli.github.com) may provide the best experience.

    gh repo clone anttikivi/anttikivi-website

After cloning the source, make sure to change to the cloned directory.

    cd anttikivi-website

Then install the dependencies for the build.

    yarn install

Finally, build the project.

    yarn build

The built site is in the `public` directory.

## Contributing

Contributions to the website are welcome and encouraged! There are many ways to [contribute](https://github.com/anttikivi/.github/blob/main/CONTRIBUTING.md#how-can-i-contribute) to it. You can find the guidelines for contributing in [CONTRIBUTING](CONTRIBUTING.md).

This project adheres to the Contributor Covenant [Code of Conduct](https://github.com/anttikivi/.github/blob/main/CODE_OF_CONDUCT.md). By participating, you’re expected to uphold this code. Please report unacceptable behaviour to antti.kivi@visiosto.fi.

## Licence

The website’s source code is licensed under the [MIT License](LICENCE).
