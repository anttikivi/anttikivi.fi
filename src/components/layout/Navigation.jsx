// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';

import LocalizedLink from '../link/LocalizedLink';

const Nav = styled.nav`
  margin: 0 auto;
`;

const Toggle = styled.div`
  clear: both;
  display: block;
  margin: 1rem auto;
  width: 40px;
  height: 32px;
  cursor: pointer;
  user-select: none;

  @media screen and ${(props) => props.theme.devices.tablet} {
    display: none;
  }
`;

const ToggleBar = styled.div`
  display: block;
  width: 33px;
  height: 4px;
  margin: 0 auto 5px;
  border-radius: 3px;
  transform-origin: 4px 0;
  z-index: 1;
  background: var(--color-text);

  ${(props) => {
    if (props.toggled) {
      return 'opacity: 1;';
    }
  }}
  ${(props) => {
    if (props.toggled) {
      return 'transform: translate(4px) translate(4px, -1px) rotate(45deg) translate(-2px, -1px);';
    }
  }}

    &:first-child {
    transform-origin: 0% 0%;
  }

  &:nth-child(2) {
    transform-origin: 0% 100%;

    ${(props) => {
      if (props.toggled) {
        return 'opacity: 0;';
      }
    }}
    ${(props) => {
      if (props.toggled) {
        return 'transform: translate(4px) rotate(0deg) scale(0.2, 0.2);';
      }
    }}
  }

  &:last-child {
    ${(props) => {
      if (props.toggled) {
        return 'transform: translate(4px) rotate(-45deg) translate(0, -1px);';
      }
    }}
  }
`;

const Ul = styled.ul`
  overflow: hidden;
  display: block;
  max-height: 0;
  margin: 0;
  padding-left: 0;
  list-style: none;
  text-align: center;

  ${(props) =>
    props.toggled &&
    css`
      overflow: visible;
      max-height: none;
    `};

  @media screen and ${(props) => props.theme.devices.tablet} {
    overflow: visible;
    display: flex;
    justify-content: center;
    max-height: none;
  }
`;

const Li = styled.li`
  margin: 2rem 1em;

  @media screen and ${(props) => props.theme.devices.tablet} {
    margin: 1em;
  }
`;

const Link = styled(LocalizedLink)`
  position: relative;
  margin: 1rem auto 0;
  border-radius: ${(props) => props.theme.borders.commonRadius};
  padding: 0.7rem 1rem;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  color: var(--color-text);

  &:visited {
    color: var(--color-text);
  }

  &:hover,
  &:focus,
  &:active {
    background: var(--color-background-hover);
    color: var(--color-text);
  }
`;

export default (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulMenu(filter: { contentful_id: { eq: "12OH6cgaTcp4TUDvpqslYc" } }) {
          edges {
            node {
              node_locale
              links {
                ... on ContentfulIndexPage {
                  contentful_id
                  title
                  internal {
                    type
                  }
                }
              }
            }
          }
        }
      }
    `,
  );

  const [toggled, setToggled] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setToggled(!toggled);
  };

  return (
    <Nav>
      <Toggle aria-controls="primary-menu" aria-expanded={toggled.toString()} onClick={handleClick}>
        <ToggleBar toggled={toggled} />
        <ToggleBar toggled={toggled} />
        <ToggleBar toggled={toggled} />
      </Toggle>
      {/* TODO Consider getting the page titles and link values by query from Contentful */}
      <Ul id="primary-menu" toggled={toggled}>
        {data.allContentfulMenu.edges
          .filter(({ node }) => node.node_locale === props.locale)[0]
          .node.links.map((link) => {
            switch (link.internal.type) {
              case 'ContentfulIndexPage':
                return (
                  <Li key={link.contentful_id}>
                    <Link to={link.contentful_id} locale={props.locale}>
                      {link.title}
                    </Link>
                  </Li>
                );
              case 'ContentfulPath':
                return (
                  <Li key={link.contentful_id}>
                    <Link to={link.contentful_id} locale={props.locale}>
                      {link.title}
                    </Link>
                  </Li>
                );
              default:
                return null;
            }
          })}
      </Ul>
    </Nav>
  );
};