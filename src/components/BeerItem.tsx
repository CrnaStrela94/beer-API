import React, { useState } from 'react';
import { Beer, Hop, Malt } from './types/Beer';

interface BeerItemProps {
    beer: Beer;
    onBeerClick: (beer: Beer) => void;
}

const BeerItem: React.FC<BeerItemProps> = ({ beer, onBeerClick }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const handleImageClick = (event: React.MouseEvent) => {
        onBeerClick(beer);
        setShowPopup(true);
        setPopupPosition({ top: event.clientY, left: event.clientX });
    };

    const listIngredients = (ingredients: Array<Malt | Hop>): React.ReactNode => {
        return ingredients.map((ingredient) => {
            return (
                <div>
                    <p>{ingredient.name}</p>
                    <p>{ingredient.amount.value} {ingredient.amount.unit}</p>
                    {"add" in ingredient ? <p>{ingredient.add}</p> : null}
                    {"attribute" in ingredient ? <p>{ingredient.attribute}</p> : null}
                </div>
            )
        })
    }

    return (<>
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '40rem', height: '28rem', overflow: 'hidden' }}>
            <img src={beer.image_url} alt={beer.name} onClick={handleImageClick} style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
            <p>First Brewed: {beer.first_brewed}</p>
            <p>Description: {beer.description}</p>
            <p>ABV: {beer.abv}</p>
            <p>IBU: {beer.ibu}</p>
            {/* Display other beer properties here */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: popupPosition.top,
                    left: popupPosition.left,
                    background: '#fff',
                    padding: '10px',
                    border: '1px solid black',
                    width: '30rem',
                    height: '25rem',
                    overflow: 'auto'
                }}>
                    <button onClick={() => setShowPopup(false)} style={{ position: 'absolute', right: 0, top: 0 }}>X</button>
                    <h2>{beer.name}</h2>
                    <p>{beer.tagline}</p>
                    <p>First Brewed: {beer.first_brewed}</p>
                    <p>Description: {beer.description}</p>
                    <p>ABV: {beer.abv}</p>
                    <p>IBU: {beer.ibu}</p>
                    <p>Target FG: {beer.target_fg}</p>
                    <p>Target OG: {beer.target_og}</p>
                    <p>EBC: {beer.ebc}</p>
                    <p>SRM: {beer.srm}</p>
                    <p>pH: {beer.ph}</p>
                    <p>Attenuation Level: {beer.attenuation_level}</p>
                    <p>Volume: {beer.volume.value} {beer.volume.unit}</p>
                    <p>Boil Volume: {beer.boil_volume.value} {beer.boil_volume.unit}</p>
                    <p>Method: </p>
                    <p>Ingredients: <pre><p>Malt:</p>{listIngredients(beer.ingredients.malt)}</pre><p>Hops:</p><pre>{listIngredients(beer.ingredients.hops)}</pre></p>
                    <p>Food Pairing: {beer.food_pairing.join(', ')}</p>
                    <p>Brewers Tips: {beer.brewers_tips}</p>
                    <p>Contributed By: {beer.contributed_by}</p>
                </div>
            )}
        </div>
    </>

    );
};

export default BeerItem;