// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import { useStaticQuery } from 'gatsby';

import Footer from '../Footer';

import footerQuery from '../../../../test/data/footerQuery';
import renderWithProviders from '../../../../test/renderWithProviders';

describe('Header component', () => {
  beforeAll(() => useStaticQuery.mockReturnValue(footerQuery));

  it('renders correctly', () => {
    const { container, getByAltText, getByText } = renderWithProviders(
      <Footer locale="fi" pageID="6JksITICuGCEYUIVHlWl5U" />,
      'fi',
    );

    expect(container).toMatchSnapshot();

    expect(getByText('Tämä sivusto on tehty', { exact: false })).toBeInTheDocument();
    expect(getByText('Visioston', { exact: false })).toBeInTheDocument();
    expect(getByText('linssin läpi', { exact: false })).toBeInTheDocument();
    expect(getByText('In English')).toBeInTheDocument();

    expect(getByAltText('Instagramin logo')).toBeInTheDocument();
    expect(getByAltText('Linkedinin logo')).toBeInTheDocument();
    expect(getByAltText('Twitterin logo')).toBeInTheDocument();
  });
});