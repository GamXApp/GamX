import { useState } from 'react';
import ContactPage from './pages/contact/contactPage';
import SearchPage  from './pages/search/searchPage';
// Descomentá las siguientes líneas a medida que crees las páginas:
import HomePage     from './pages/home/homePage';
// import WishlistPage from './pages/wishList/wishListPage';
// import HistoryPage  from './pages/history/historyPage';

function App() {
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
}

export default App;