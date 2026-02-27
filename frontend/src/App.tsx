import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import SocialFloating from './components/SocialFloating';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-[#011111] text-white min-h-screen font-sans selection:bg-[#8ecd24] selection:text-[#011111] relative">
        <ScrollToTop />
        <Navbar />
        <SocialFloating />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars-rental" element={<CarList />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;