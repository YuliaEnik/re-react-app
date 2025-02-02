import React from 'react';
import './search.scss';

type IState = { value: string };

class Search extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (e) {
      const target = e.target as typeof e.target & {
        text: { value: string };
      };
      const value = target.text.value;
      localStorage.setItem('items', value);
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ value: event.currentTarget.value });
  };

  componentDidMount(): void {
    const searchValue: string | null = localStorage.getItem('items');
    if (searchValue) {
      this.setState({
        value: searchValue,
      });
    }
  }

  componentWillUnmount(): void {
    if (this.state.value) {
      localStorage.setItem('items', this.state.value);
    }
  }

  render() {
    return (
      <header className="header">
        <div className="search">
          <form onSubmit={this.handleFormSubmit} className="search-form">
            <label htmlFor="serchInput"></label>
            <input
              type="text"
              name="text"
              className="search-form_input"
              placeholder="Search..."
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </header>
    );
  }
}

export { Search };
