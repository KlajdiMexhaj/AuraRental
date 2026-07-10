import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation, 
  Navigate,
  useParams
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import SocialFloating from './components/SocialFloating';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

// Helper to sync URL language with i18next state
const LanguageHandler = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const supportedLangs = ['en', 'sq', 'it', 'de', 'pl'];
    if (lang && supportedLangs.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Auto-redirect base URL to /en */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* 2. All Localized Routes */}
      <Route path="/:lang" element={<LanguageHandler><Home /></LanguageHandler>} />
      <Route path="/:lang/about" element={<LanguageHandler><Home /></LanguageHandler>} />
      <Route path="/:lang/contact" element={<LanguageHandler><Home /></LanguageHandler>} />
      <Route path="/:lang/cars-rental" element={<LanguageHandler><CarList /></LanguageHandler>} />
      <Route path="/:lang/car-rental/:id" element={<LanguageHandler><CarDetail /></LanguageHandler>} />
      <Route path="/:lang/privacy" element={<LanguageHandler><Privacy /></LanguageHandler>} />
      <Route path="/:lang/terms" element={<LanguageHandler><Terms /></LanguageHandler>} />
      <Route path="/:lang/cookies" element={<LanguageHandler><Cookies /></LanguageHandler>} />

      {/* 3. Fallback for old URLs (Redirect /privacy to /en/privacy) */}
      <Route path="/cars-rental" element={<Navigate to="/en/cars-rental" replace />} />
      <Route path="/car-rental/:id" element={<Navigate to="/en/car-rental/:id" replace />} />
      <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
      <Route path="/terms" element={<Navigate to="/en/terms" replace />} />
      <Route path="/cookies" element={<Navigate to="/en/cookies" replace />} />
      
      {/* 4. Catch-all: 404 redirect to /en */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-[#011111] text-white min-h-screen font-sans selection:bg-[#8ecd24] selection:text-[#011111] relative">
        <ScrollToTop />
        <Navbar />
        <SocialFloating />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;