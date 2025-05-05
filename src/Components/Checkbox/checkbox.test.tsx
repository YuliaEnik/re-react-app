import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  const mockProps = {
    id: 1,
    checked: false,
    onChange: vi.fn(),
  };

  it('renders the checkbox with correct props', () => {
    render(<Checkbox {...mockProps} />);

    const checkboxContainer = screen.getByTestId('checkbox');
    expect(checkboxContainer).toBeInTheDocument();

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();

    expect(checkboxInput).toHaveAttribute('id', String(mockProps.id));

    expect(checkboxInput).not.toBeChecked();
  });

  it('renders the checkbox as checked when checked prop is true', () => {
    const checkedProps = { ...mockProps, checked: true };
    render(<Checkbox {...checkedProps} />);
    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeChecked();
  });

  it('calls onChange when the checkbox is clicked', () => {
    render(<Checkbox {...mockProps} />);

    const checkboxInput = screen.getByRole('checkbox');
    fireEvent.click(checkboxInput);

    expect(mockProps.onChange).toHaveBeenCalled();
  });
});
