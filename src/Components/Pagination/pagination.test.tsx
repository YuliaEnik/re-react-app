import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';

describe('test pagination component', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it('should navigate to previous page when "Previous" button is clicked', () => {
    render(
      <Pagination totalPages={5} page={3} onPageChange={onPageChangeMock} />
    );

    const prevButton = screen.getByText(/«/i);
    fireEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('should navigate to next page when "Next" button is clicked', () => {
    render(
      <Pagination totalPages={5} page={3} onPageChange={onPageChangeMock} />
    );

    const nextButton = screen.getByText(/»/i);
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
