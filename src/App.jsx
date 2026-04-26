import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage     from './pages/home/homePage'
import SearchPage   from './pages/search/searchPage'
import GameDetail   from './pages/gameDetail/gameDetail'
import WishlistPage from './pages/wishList/wishListPage'
import HistoryPage  from './pages/history/historyPage'
import ContactPage  from './pages/contact/contactPage'
import PWAPrompts   from './components/PWAPrompts/PWAPrompts'

export default function App() {
  return (
    <BrowserRouter>
      
      <PWAPrompts />

      <Routes>
        <Route path="/"         element={<HomePage />}     />
        <Route path="/search"   element={<SearchPage />}   />
        <Route path="/game/:id" element={<GameDetail />}   />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/history"  element={<HistoryPage />}  />
        <Route path="/contact"  element={<ContactPage />}  />
      </Routes>
    </BrowserRouter>
  )
}
