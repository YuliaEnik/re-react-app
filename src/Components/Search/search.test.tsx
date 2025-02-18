import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './search';
import '@testing-library/jest-dom/vitest';

describe('Search Component', () => {
  it('renders the search input and form', () => {
    const mockOnSubmit = vi.fn();

    render(
      <Search onSubmit={mockOnSubmit} />
    );
    const input = screen.getByPlaceholderText('Search...');
    const form = screen.getByTestId('search-form');

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const mockOnSubmit = vi.fn();
    const mockOnChange = vi.fn();

    render(
      <Search  onSubmit={mockOnSubmit} />
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'test',
        }),
      })
    );
  });

  it('calls onSubmit when the form is submitted', () => {
    const mockOnSubmit = vi.fn();

    render(
      <Search onSubmit={mockOnSubmit} />
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays the initial search value', () => {
    const mockOnSubmit = vi.fn();

    render(
      <Search
        onSubmit={mockOnSubmit}
      />
    );
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('initial value');
  });
});
