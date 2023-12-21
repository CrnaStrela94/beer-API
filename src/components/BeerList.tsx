import React from 'react';
import BeerItem from './BeerItem'; // Replace './BeerItem' with the actual path to the BeerItem component
import { Beer } from './types/Beer';



interface BeerListProps {
    beers: Beer[];
    onPageChange: (newPage: number) => void;
    currentPage: number;
    onBeerClick: (beer: Beer) => void;
}

const BeerList: React.FC<BeerListProps> = ({ beers, onPageChange, currentPage, onBeerClick }) => {
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div>
            {/* Render beer items here */}
            {beers.map(beer => (
                <BeerItem key={beer.id} beer={beer} onBeerClick={onBeerClick} />
            ))}

            {/* Pagination controls */}
            <button onClick={handlePreviousClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default BeerList;