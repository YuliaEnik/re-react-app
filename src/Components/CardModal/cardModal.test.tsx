import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardModal } from './cardModal';

describe('CardModal Component', () => {
  const mockData = {
    id: 1,
    title: 'Art Title',
    artist_title: 'Artist Name',
    date_display: '2021',
    image_id: 'abc123',
    artwork_type_title: 'Painting',
    artist_display: 'Artist Info',
  };

  it('renders the component with correct data', () => {
    render(<CardModal {...mockData} />);

    const cardModal = screen.getByTestId('card-modal');
    expect(cardModal).toBeInTheDocument();

    const image = screen.getByTestId('card-modal-image');
    expect(image).toHaveAttribute(
      'src',
      `https://www.artic.edu/iiif/2/${mockData.image_id}/full/843,/0/default.jpg`
    );
    expect(image).toHaveAttribute('alt', mockData.title);

    const artist = screen.getByTestId('card-modal-artist');
    expect(artist).toHaveTextContent(`Author: ${mockData.artist_title}`);

    const title = screen.getByTestId('card-modal-title');
    expect(title).toHaveTextContent(`Name: ${mockData.title}`);

    const date = screen.getByTestId('card-modal-date');
    expect(date).toHaveTextContent(`Year: ${mockData.date_display}`);

    const artworkType = screen.getByTestId('card-modal-artwork-type');
    expect(artworkType).toHaveTextContent(
      `Artwork Type: ${mockData.artwork_type_title}`
    );

    const artistInfo = screen.getByTestId('card-modal-artist-info');
    expect(artistInfo).toHaveTextContent(
      `Artist info: ${mockData.artist_display}`
    );
  });
});
