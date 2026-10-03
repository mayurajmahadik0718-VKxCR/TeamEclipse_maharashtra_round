import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import DigitalTwinPage from './pages/DigitalTwinPage';
import ContentStudioPage from './pages/ContentStudioPage';
import VideoStudioPage from './pages/VideoStudioPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { useCreator } from './hooks/useCreator';

export function App() {
  const { creatorId, setCreatorId, creator, digitalTwin, loading } = useCreator('creator_001');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              creator={creator}
              onSelectCreator={setCreatorId}
              currentCreatorId={creatorId}
            />
          }
        >
          <Route index element={<Dashboard creator={creator} digitalTwin={digitalTwin} />} />
          <Route path="digital-twin" element={<DigitalTwinPage digitalTwin={digitalTwin} creator={creator} />} />
          <Route path="content-studio" element={<ContentStudioPage creator={creator} digitalTwin={digitalTwin} />} />
          <Route path="video-studio" element={<VideoStudioPage creator={creator} />} />
          <Route path="analytics" element={<AnalyticsPage creator={creator} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
