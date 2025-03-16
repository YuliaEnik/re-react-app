import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.scss';

export const Layout: React.FC = () => (
  <>
    <main className="main">
      <Outlet />
    </main>
  </>
);
