import { Layout } from './Components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './view/NotFound';
import './App.css';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {' '}
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
