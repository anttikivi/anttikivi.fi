// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Footer from './Footer';
import GlobalStyle from './GlobalStyle';
import Head from './Head';
import Header from './Header';

import useColorScheme from '../../util/useColorScheme';

const PageTitle = styled.h1`
  margin: 1em 0.5rem 2em;
  font-size: 3rem;
  text-align: center;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;

  @media screen and (${(props) => props.theme.devices.mobileL}) {
    margin: 1em 0.5rem;
    font-size: 4rem;
  }

  @media screen and (${(props) => props.theme.devices.tablet}) {
    margin: 1em ${(props) => props.theme.layout.marginTablet};
    font-size: 4rem;
  }
`;

const propTypes = {
  article: PropTypes.bool,
  author: PropTypes.shape({ twitter: PropTypes.string }),
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object,
  locale: PropTypes.string.isRequired,
  pageID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  article: false,
  author: null,
  description: '',
  image: null,
};

function Layout({ article, author, children, description, image, locale, pageID, title }) {
  useColorScheme();

  return (
    <>
      <GlobalStyle />
      <Head
        article={article}
        author={author}
        description={description}
        image={image}
        locale={locale}
        pageID={pageID}
        title={title}
      />
      <Header locale={locale} />
      <main>
        <article>
          <header>
            <PageTitle>{title}</PageTitle>
          </header>
          {children}
        </article>
      </main>
      <Footer locale={locale} pageID={pageID} />
    </>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
