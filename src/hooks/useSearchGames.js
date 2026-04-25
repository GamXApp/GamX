import { useEffect, useMemo, useState } from "react";
import { filterGames } from '../services/api';
import { useSearchParams } from "react-router-dom";
import { CAT_MAP, PLAT_MAP } from '../components/Search/search';

const PAGE_SIZE = 10;

export function useSearchGames(){
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

    const initialCategory = CAT_MAP[categoryFromUrl] !== undefined ? categoryFromUrl : 'Todos';

    const [allGames, setAllGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [text, setText] = useState('');
    const [category, setCategory] = useState(initialCategory);
    const [platform, setPlatform] = useState('Todas');
    const [page, setPage] = useState(1);
    const [maxVisiblePages, setMaxVisiblePages] = useState(() => {
        if (typeof window === 'undefined') return 10;
        return window.innerWidth <= 480 ? 5 : 10;
    });
    
    async function loadGames(selectedCategory = category, selectedPlatform = platform){
        setLoading(true);
        setError(null);

        try{
            const data = await filterGames({
                category: CAT_MAP[selectedCategory],
                platform: PLAT_MAP[selectedPlatform]
            });

            setAllGames(data);
        } catch{
            setError('No se puedieron cargar los juegos');
            setAllGames([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setPage(1);
        loadGames(category, platform);
    }, [category, platform]);

    const filteredGames = useMemo(() => {
        if(!text.trim()) return allGames;

        const query = text.toLowerCase();

        return allGames.filter((game) => {
            return(
                game.title.toLowerCase().includes(query) ||
                game.genre?.toLowerCase().includes(query) ||
                game.publisher?.toLowerCase().includes(query)
            );
        })
    }, [allGames, text]);

    useEffect(() => {
        setPage(1);
    }, [text]);

    useEffect(() => {
        function handleResize() {
            setMaxVisiblePages(window.innerWidth <= 480 ? 5 : 10);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));

    const pagedGames = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return filteredGames.slice(start, end);
    }, [filteredGames, page]);

    const visiblePages = useMemo(() => {
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );
    }, [maxVisiblePages, page, totalPages]);

    function goToPage(nextPage){
        const safePage = Math.min(Math.max(nextPage, 1), totalPages);
        setPage(safePage);
        window.scrollTo({ top: 0, behavior: 'smooth'})
    }
    
    return{
        text,
        setText,
        category,
        setCategory,
        platform,
        setPlatform,
        games: pagedGames,
        loading,
        error,
        page,
        totalPages,
        visiblePages,
        hasFilters: category !== 'Todos' || platform !== 'Todas',
        resultCount: filteredGames.length,
        clearSearch: () => setText(''),
        clearCategory: () => setCategory('Todos'),
        clearPlatform: () => setPlatform('Todas'),
        retry: () => loadGames(),
        goToPage,
    }
}
