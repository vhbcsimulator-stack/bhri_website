import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PropertiesPage from './pages/PropertiesPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import CareerPage from './pages/CareerPage';
import JobDetailsPage from './pages/JobDetailsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import SitemapPage from './pages/SitemapPage';
import BlogsPage from './pages/BlogsPage';
import { scrollToIdWhenReady } from './utils/scrollToSection';
import { FloatingBackToTopButton } from './components/FloatingBackToTopButton';

// UX Helper to handle scrolling behavior on route changes and hash navigation
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  // `key` is in the deps so navigating to the hash you are already on still
  // re-scrolls instead of silently doing nothing.
  useEffect(() => {
    if (hash) {
      // The target section may not exist yet while page content is loading,
      // so keep trying for a short while instead of guessing a fixed delay.
      return scrollToIdWhenReady(decodeURIComponent(hash.slice(1)));
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/careers/:jobId" element={<JobDetailsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/news" element={<Navigate to="/blogs" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingBackToTopButton />
    </BrowserRouter>
  );
}

export default App;
