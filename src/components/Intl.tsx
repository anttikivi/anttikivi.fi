// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { IntlProvider } from 'react-intl';

const propTypes = { children: PropTypes.node.isRequired, locale: PropTypes.string.isRequired };

function Intl({ children, locale }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultLocale
          }
        }
      }
    `,
  );

  const { defaultLocale } = site.siteMetadata;

  // TODO Don't use dynamic requires

  // eslint-disable-next-line global-require, no-undef, import/no-dynamic-require
  let messages = require(`../locales/${defaultLocale}`).locale;

  try {
    // eslint-disable-next-line global-require, no-undef, import/no-dynamic-require
    messages = require(`../locales/${locale}`).locale;
  } catch (error) {
    // Do nothing and use the default.
  }

  return (
    <IntlProvider locale={locale || defaultLocale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

Intl.propTypes = propTypes;

export default Intl;
