import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import styles from './style.module.scss';
import '@testing-library/jest-dom'; 

describe('Pagination', () => {
  it('cur page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('prev page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={2} totalPages={5} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByTestId('prev-button');
    prevButton.click();

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('prev des 1 page ', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeDisabled();
  });

  it('next but', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={2} totalPages={5} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByTestId('next-button');
    nextButton.click();

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('nexy but des total pages', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={5} totalPages={5} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeDisabled();
  });

  it('styles SCSS', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination page={1} totalPages={5} onPageChange={onPageChange} />
    );

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toHaveClass(styles.pagination);
  });
});
