// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import GlobalStyle from './GlobalStyle';
import Head from './Head';
import Header from './Header';

import listenColorScheme from '../../util/listenColorScheme';

export default (props) => {
  listenColorScheme();

  const PageTitle = styled.h1`
    margin: 2em ${(props) => props.theme.layout.marginMobile};
    font-size: 2rem;
    text-align: center;

    @media screen and ${(props) => props.theme.devices.mobileL} {
      margin: 2em ${(props) => props.theme.layout.marginTablet};
      font-size: 3rem;
    }

    @media screen and ${(props) => props.theme.devices.tablet} {
      margin: 2em ${(props) => props.theme.layout.marginTablet};
      font-size: 3rem;
    }
  `;

  return (
    <>
      <GlobalStyle />
      <Head {...props} />
      <Header {...props} />
      <main>
        <section>
          <header>
            <PageTitle>{props.title}</PageTitle>
          </header>
          <div>{props.children}</div>
        </section>
      </main>
      <Footer {...props} />
    </>
  );
};