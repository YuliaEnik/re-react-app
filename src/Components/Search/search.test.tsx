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

  /* test('calls onSubmit with the input value when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<Search onSubmit={handleSubmit} />);

    const inputElement = screen.getByRole('textbox');
    const formElement = screen.getByTestId('search-form');

    fireEvent.change(inputElement, { target: { value: 'test query' } });
    fireEvent.submit(formElement);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('test query');
  });
 */
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
