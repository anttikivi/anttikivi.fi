// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import LocalizedLink from './LocalizedLink';

const Link = styled(LocalizedLink)`
  text-decoration: none;
`;

const LocalizedLinkButton = (props) => (
  <Link to={props.to} locale={props.locale}>
    <Button>{props.children}</Button>
  </Link>
);

export default LocalizedLinkButton;