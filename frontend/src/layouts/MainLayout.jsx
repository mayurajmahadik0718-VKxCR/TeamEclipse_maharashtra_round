import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const MainLayout = ({ creator, onSelectCreator, currentCreatorId }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="main-content">
        <Navbar
          creator={creator}
          onSelectCreator={onSelectCreator}
          currentCreatorId={currentCreatorId}
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
        />
        <main className="page-body">
          <div key={location.pathname} className="page-transition-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
