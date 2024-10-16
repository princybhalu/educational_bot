import React from 'react';
import { Outlet } from 'react-router-dom'; // To render child routes

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    <div>
      <header>
        {/* Your Navbar or Header */}
        <h1>Educational Bot</h1>
      </header>
      <main>
        {children} {/* This renders the matching child route */}
      </main>
    </div>
  );
};

export default Layout;
