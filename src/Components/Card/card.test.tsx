import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './';
import type { IData } from './';

describe('Card Component', () => {
  const mockData: IData = {
    id: 43768,
    title: 'E-9: English Drawing Room of the Georgian period, 1770-1800',
    artist_title: 'Narcissa Niblack Thorne',
    date_display: 'c. 1937',
    image_id: '134f4704-90b5-c956-94ed-6548a52f819a',
    isActive: false,
  };

  it('renders the card with correct data', () => {
    render(<Card {...mockData} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      `https://www.artic.edu/iiif/2/${mockData.image_id}/full/843,/0/default.jpg`
    );
    expect(image).toHaveAttribute('alt', mockData.title);
    expect(screen.getByText(mockData.artist_title)).toBeInTheDocument();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    const onClickMock = vi.fn();
    render(<Card {...mockData} onClick={onClickMock} />);

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
