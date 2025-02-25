import { describe, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './search';
import '@testing-library/jest-dom/vitest';

describe('Search Component', () => {
  test('renders the search input with initial value', () => {
    const initialQuery = 'initial value';
    render(<Search onSubmit={() => {}} initialQuery={initialQuery} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialQuery);
  });

  test('updates input value when typing', () => {
    render(<Search onSubmit={() => {}} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(inputElement).toHaveValue('new value');
  });

  test('renders the search input with empty value if no initialQuery', () => {
    render(<Search onSubmit={() => {}} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });
});
