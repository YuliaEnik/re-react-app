import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import  HomePage  from './../pages/index';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import { renderWithProviders } from './test-utils';

const mockArtworks = {
  data: [
    {
      id: 1,
      title: 'Artwork 1',
      artist_title: 'Artist 1',
      image_id: 'image1',
      date_display: '2023',
      artwork_type_title: 'Painting',
      artist_display: 'Artist 1',
    },
    {
      id: 2,
      title: 'Artwork 2',
      artist_title: 'Artist 2',
      image_id: 'image2',
      date_display: '2023',
      artwork_type_title: 'Sculpture',
      artist_display: 'Artist 2',
    },
  ],
  pagination: {
    total_pages: 2,
  },
};

const mockArtworkDetails = {
  data: {
    id: 1,
    title: 'Artwork 1',
    artist_title: 'Artist 1',
    image_id: 'image1',
    date_display: '2023',
    artwork_type_title: 'Painting',
    artist_display: 'Artist 1',
  },
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('HomePage Component', () => {
  it('renders the home page', () => {
    renderWithProviders(
      <HomePage
        allArtworks={mockArtworks}
        searchResults={null}
        query=""
        page={1}
        artwork={null}
      />
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('displays the cards list when artworks are available', () => {
    renderWithProviders(
      <HomePage
        allArtworks={mockArtworks}
        searchResults={null}
        query=""
        page={1}
        artwork={null}
      />
    );

    expect(screen.getByTestId('cards-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('cards-list-header')).toBeInTheDocument();
  });

  it('displays the pagination component when there are multiple pages', () => {
    renderWithProviders(
      <HomePage
        allArtworks={mockArtworks}
        searchResults={null}
        query=""
        page={1}
        artwork={null}
      />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('displays the artwork modal when artwork details are available', () => {
    renderWithProviders(
      <HomePage
        allArtworks={mockArtworks}
        searchResults={null}
        query=""
        page={1}
        artwork={mockArtworkDetails}
      />
    );

    expect(screen.getByTestId('artwork-modal')).toBeInTheDocument();
  });
});
