import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const MainLayout = ({ creator, onSelectCreator, currentCreatorId }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar
          creator={creator}
          onSelectCreator={onSelectCreator}
          currentCreatorId={currentCreatorId}
        />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
