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

const PageTitle = styled.h2`
  display: none;
`;

const propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object,
  locale: PropTypes.string.isRequired,
  pageID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = { description: '', image: null };

function LayoutIndex({ children, description, image, locale, pageID, title }) {
  useColorScheme();

  return (
    <>
      <GlobalStyle />
      <Head
        home
        description={description}
        image={image}
        locale={locale}
        pageID={pageID}
        title={title}
      />
      <Header home locale={locale} />
      <main>
        <section>
          <header>
            <PageTitle>{title}</PageTitle>
          </header>
          <div>{children}</div>
        </section>
      </main>
      <Footer locale={locale} pageID={pageID} />
    </>
  );
}

LayoutIndex.propTypes = propTypes;
LayoutIndex.defaultProps = defaultProps;

export default LayoutIndex;
