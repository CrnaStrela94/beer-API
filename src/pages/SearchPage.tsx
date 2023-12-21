import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import BeerList from '../components/BeerList';
import { Beer } from '../components/types/Beer';



const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [beers, setBeers] = useState<Beer[]>([]);

    const fetchBeers = async (searchTerm: string, page: number) => {
        const response = await fetch(
            `https://api.punkapi.com/v2/beers?page=${page}&beer_name=${searchTerm}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const beers = await response.json();
        return beers;
    };

    useEffect(() => {
        fetchBeers(searchTerm, page).then(setBeers).catch(console.error);
    }, [searchTerm, page]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPage(1); // Reset page number when a new search is made
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleBeerClick = (beer: Beer) => {
        // Display the selected beer's information
        console.log(beer);
    };

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <BeerList beers={beers} onPageChange={handlePageChange} currentPage={page} onBeerClick={handleBeerClick} />
        </div>
    );
};

export default SearchPage;
