// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import { screen } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';

import Header from '../Header';

import headerQuery from '../../../../test/data/headerQuery';
import renderWithProviders from '../../../../test/renderWithProviders';

describe('Header component', () => {
  beforeAll(() => (useStaticQuery as jest.Mock).mockReturnValue(headerQuery));

  it('renders index page header correctly', () => {
    const { container } = renderWithProviders(<Header home locale="fi" />, 'fi');

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('heading')).toHaveTextContent('Antti Kivi');
  });

  it('renders page header correctly', () => {
    const { container } = renderWithProviders(<Header locale="fi" />, 'fi');

    expect(container).toMatchSnapshot();

    expect(screen.getByRole('heading')).toHaveTextContent('Antti Kivi');
  });
});
