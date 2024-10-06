import React from 'react';
import { Outlet } from 'react-router-dom'; // To render child routes

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        {/* Your Navbar or Header */}
        <h1>Educational Bot</h1>
      </header>
      <main>
        <Outlet /> {/* This renders the matching child route */}
      </main>
    </div>
  );
};

export default Layout;
