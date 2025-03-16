import { CardForm } from '../../Components/CardForm/cardform';
import { Navbar } from '../../Components/Navbar/navbar';
import './style.scss';

export function Home(): JSX.Element {
  return (
    <div className="home-page">
      <div className="header">
        <Navbar />
      </div>
      <div className="cards-page">
        <CardForm />
      </div>
    </div>
  );
}
