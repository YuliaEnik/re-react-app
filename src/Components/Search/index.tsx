import React from 'react';
import './search.scss';

type IState = { value: string };
type searchProps = { onSearch: (value: string) => void };

class Search extends React.Component<searchProps, IState> {
  constructor(props: searchProps) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    const value = this.state.value.trim();
    localStorage.setItem('items', value);
    this.props.onSearch(this.state.value.trim());
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ value: event.target.value });
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
          <input
            type="text"
            name="text"
            className="search-form_input"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick} className="search-button"></button>
        </div>
      </header>
    );
  }
}

export { Search };
