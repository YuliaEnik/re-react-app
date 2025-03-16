import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home/home';
import { FormUseHookPage } from './Pages/Forms/forms';
import { Layout } from './Components/Layout/layout';
import { FormUnControlPage } from './Pages/FormUnControlPage/FormUnControlPage';

export function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/formUseHook" element={<FormUseHookPage />} />
          <Route path="/formUnControl" element={<FormUnControlPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </>
  );
}
