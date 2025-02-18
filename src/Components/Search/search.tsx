import { useState } from 'react';
import './style.scss';

export interface SearchProps {
  onSubmit: (searchValue: string) => void;
  initialQuery?: string;
}

const Search: React.FC<SearchProps> = ({ onSubmit, initialQuery = '' }) => {
  const [input, setInput] = useState(initialQuery);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(input);
  };
  return (
    <header className="header">
      <div className="search">
        <form
          className="search"
          data-testid="search-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            className="search-form_input"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="search-button" />
        </form>
      </div>
    </header>
  );
};

export { Search };
