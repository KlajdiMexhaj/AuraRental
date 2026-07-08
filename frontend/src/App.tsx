import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation 
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import SocialFloating from './components/SocialFloating';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';


const ScrollToTop = () => {

  const { pathname } = useLocation();


  React.useEffect(() => {

    window.scrollTo(0,0);

  },[pathname]);


  return null;
};



const AppRoutes = () => {

  return (

    <Routes>


      {/* Default */}
      <Route path="/" element={<Home />} />


      {/* Language routes */}
      <Route path="/:lang" element={<Home />} />


      <Route path="/:lang/about" element={<Home />} />

      <Route path="/:lang/contact" element={<Home />} />


      <Route 
        path="/:lang/cars-rental" 
        element={<CarList />} 
      />


      <Route 
        path="/:lang/car-rental/:id" 
        element={<CarDetail />} 
      />



      <Route 
        path="/:lang/privacy" 
        element={<Privacy />} 
      />


      <Route 
        path="/:lang/terms" 
        element={<Terms />} 
      />


      <Route 
        path="/:lang/cookies" 
        element={<Cookies />} 
      />



      {/* fallback old urls */}
      <Route 
        path="/cars-rental" 
        element={<CarList />} 
      />


      <Route 
        path="/car-rental/:id" 
        element={<CarDetail />} 
      />


      <Route 
        path="/privacy" 
        element={<Privacy />} 
      />


      <Route 
        path="/terms" 
        element={<Terms />} 
      />


      <Route 
        path="/cookies" 
        element={<Cookies />} 
      />


    </Routes>

  );

};



const App: React.FC = () => {


  return (

    <Router>


      <div 
      className="
      bg-[#011111] 
      text-white 
      min-h-screen 
      font-sans 
      selection:bg-[#8ecd24] 
      selection:text-[#011111] 
      relative
      "
      >


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