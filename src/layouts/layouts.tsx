import React from 'react';
import { Outlet } from 'react-router-dom'; // To render child routes
import './layouts.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        {/* Your Navbar or Header */}
        <h1 className="header-logo">Educational Bot</h1>
      </header>
      <main className="main-content">
        {children} {/* This renders the matching child route */}
      </main>
    </div>
  );
};

export default Layout;
