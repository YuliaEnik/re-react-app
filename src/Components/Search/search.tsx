import React from 'react';
import './style.scss';

export interface SearchProps {
  search?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({ search, onChange, onSubmit }) => {

  return (
      <div className="search-wrap">
        <form className="search" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            className="search-form_input"
            placeholder="Search by name..."
            onChange={onChange}
            value={search}
          />
        </form>
      </div>
  );
};

export { Search };
