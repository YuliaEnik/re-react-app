import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomePage } from '../../view/HomePage';
import './style.scss';

export const Layout: React.FC = () => (
  <>
    <header className="header"></header>
    <main className="main">
      <HomePage />
      <Outlet />
    </main>
  </>
);
