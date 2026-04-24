import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ContactPage from './pages/contact/contactPage';
import SearchPage  from './pages/search/searchPage';
import HomePage    from './pages/home/homePage';
import GameDetail  from './pages/gameDetail/gameDetail';
// Descomentá las siguientes líneas a medida que crees las páginas:
import WishlistPage from './pages/wishList/wishListPage';
import HistoryPage  from './pages/history/historyPage';
 
function App() {
<<<<<<< HEAD
    // Página activa: 'home' | 'search' | 'wishlist' | 'history' | 'contact'
    const [currentPage, setCurrentPage] = useState('home');

    function renderPage() {
        switch (currentPage) {
            case 'home':     return <HomePage     onNavigate={setCurrentPage} />;
            case 'search':   return <SearchPage    onNavigate={setCurrentPage} />;
            // case 'wishlist': return <WishlistPage  onNavigate={setCurrentPage} />;
            // case 'history':  return <HistoryPage   onNavigate={setCurrentPage} />;
            case 'contact':  return <ContactPage   onNavigate={setCurrentPage} />;
            default:         return <SearchPage    onNavigate={setCurrentPage} />;
        }
    }

    return renderPage();
=======
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Agregar más rutas aquí */}
            </Routes>
        </BrowserRouter>
    );
>>>>>>> 49cee4632571c80ff724fa6c0b1d83f53439312a
}

export default App;