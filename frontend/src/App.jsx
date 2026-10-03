import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useCreator } from './hooks/useCreator';

// Layout
import MainLayout from './layouts/MainLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Protected Pages
import Dashboard from './pages/Dashboard';
import DigitalTwinPage from './pages/DigitalTwinPage';
import ContentAnalyzerPage from './pages/ContentAnalyzerPage';
import ContentOpportunitiesPage from './pages/ContentOpportunitiesPage';
import ContentStudioPage from './pages/ContentStudioPage';
import ContentCriticPage from './pages/ContentCriticPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LearningCenterPage from './pages/LearningCenterPage';
import VideoStudioPage from './pages/VideoStudioPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const { creatorId, setCreatorId, creator, digitalTwin, refreshCreator } = useCreator('creator_001');

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected App Routes */}
      <Route
        element={
          <MainLayout
            creator={creator}
            onSelectCreator={setCreatorId}
            currentCreatorId={creatorId}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard creator={creator} digitalTwin={digitalTwin} />} />
        <Route
          path="/digital-twin"
          element={
            <DigitalTwinPage
              digitalTwin={digitalTwin}
              creator={creator}
              onRefresh={refreshCreator}
            />
          }
        />
        <Route path="/analyzer" element={<ContentAnalyzerPage creator={creator} />} />
        <Route path="/opportunities" element={<ContentOpportunitiesPage creator={creator} />} />
        <Route
          path="/content-studio"
          element={<ContentStudioPage creator={creator} digitalTwin={digitalTwin} />}
        />
        <Route path="/critic" element={<ContentCriticPage creator={creator} />} />
        <Route path="/analytics" element={<AnalyticsPage creator={creator} />} />
        <Route path="/learning" element={<LearningCenterPage creator={creator} />} />
        <Route path="/video-studio" element={<VideoStudioPage creator={creator} />} />
        <Route
          path="/settings"
          element={
            <SettingsPage
              creator={creator}
              digitalTwin={digitalTwin}
              onRefresh={refreshCreator}
            />
          }
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
