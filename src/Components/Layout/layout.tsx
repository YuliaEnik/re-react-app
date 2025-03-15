import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/navbar';
import './style.scss';

export const Layout: React.FC = () => (
  <>
    <header className="header">
      <Navbar />
    </header>
    <main className="main">
      <Outlet />
    </main>
  </>
);
