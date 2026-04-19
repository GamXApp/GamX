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
}
 
export default App;