import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home/home';
import { FormPage } from './Pages/Forms/forms';
import { Layout } from './Components/Layout/layout';

export function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/forms" element={<FormPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </>
  );
}
