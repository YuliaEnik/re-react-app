import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '.';
import '@testing-library/jest-dom/vitest';

describe('Search Component', () => {
  it('renders the search input and form', () => {
    const mockOnSubmit = vi.fn(); // Моковая функция для onSubmit
    const mockOnChange = vi.fn(); // Моковая функция для onChange

    render(
      <Search search="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Проверяем, что поле ввода и форма отображаются
    const input = screen.getByPlaceholderText('Search...');
    const form = screen.getByTestId('search-form');

    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const mockOnSubmit = vi.fn();
    const mockOnChange = vi.fn();

    render(
      <Search search="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Находим поле ввода и симулируем изменение значения
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    // Проверяем, что onChange был вызван
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
    const mockOnChange = vi.fn();

    render(
      <Search search="" onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Находим форму по data-testid и симулируем её отправку
    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    // Проверяем, что onSubmit был вызван
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays the initial search value', () => {
    const mockOnSubmit = vi.fn();
    const mockOnChange = vi.fn();

    render(
      <Search
        search="initial value"
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    // Проверяем, что поле ввода содержит начальное значение
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('initial value');
  });
});
