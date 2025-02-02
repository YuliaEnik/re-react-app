import React from 'react';
import { Search } from '../../Components/Search';
import { IData, IDataApi } from '../../Data/data';
import { Card } from '../../Components/Card';
import { getURL } from '../../Api';
import './homepage.scss';
import ErrorButton from '../../Components/ErrorButton';
import ErrorBoundary from '../../Components/ErrorBoundary';

class HomePage extends React.Component<unknown, IDataApi> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      repos: null,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.getApi().catch((error: unknown) => {
      console.error('API Call failed', error);
    });
  }

  getApi = async () => {
    this.setState({ isLoading: true });
    try {
      const repos = await getURL();
      this.setState({
        isLoading: false,
        repos: repos.data,
      });
      console.log(repos.data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <Search />
          <main className="main">
            <ul className="cards-wrapper">
              {this.state.isLoading && <p className="loading">Loading...</p>}
              {this.state.repos &&
                this.state.repos.map((cardData: IData) => (
                  <Card {...cardData} key={cardData.image_id} />
                ))}
            </ul>
            <ErrorButton />
          </main>
        </ErrorBoundary>
      </>
    );
  }
}
export { HomePage };
