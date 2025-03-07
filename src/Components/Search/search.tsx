import styles from './style.module.scss';
import { useState } from 'react';

export interface SearchProps {
  onSubmit: (searchValue: string) => void;
  initialQuery?: string;
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const [input, setInput] = useState(props.initialQuery || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit(input);
  };
  return (
    <div className={styles.search}>
      <form
        className={styles.search_form}
        data-testid="search-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          className={styles.search_form_input}
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export { Search };
