import React, { createRef } from 'react';
import './style.scss';

export interface SearchProps {
  search?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({ search, onChange, onSubmit }) => {
  const inputref = createRef<HTMLInputElement>();

  return (
    <div className="header">
      <div className="search">
        <form className="search" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            className="search-form_input"
            placeholder="Search..."
            onChange={onChange}
            ref={inputref}
            defaultValue={search}
          />
          <button type="submit" className="search-button"></button>
        </form>
      </div>
    </div>
  );
};

export { Search };
