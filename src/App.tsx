import { Layout } from './Components/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.css';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
