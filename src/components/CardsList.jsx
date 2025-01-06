import './CardsList.css';
import PropTypes from 'prop-types';
import Card from './Card';
import { useState } from 'react';
import { useEffect } from 'react';


const CardsList = ({cards, title, owner, onLikeCard, onUnregisterCard}) => {
  const [sortedCards, setSortedCards] = useState([...cards]);

  const handleSelected = (event) => {
    console.log(event.target.value);
    let sorted = [...sortedCards];
  
    if (event.target.value === 'id') {
      sorted = [...sortedCards.sort((a, b) => a.id - b.id)];
    }
    else if (event.target.value === 'alphabetically') {
      sorted =[...sortedCards.sort((a, b) => a.message.localeCompare(b.message))];
    }
    else if (event.target.value === 'likes') {
      sorted = [...sortedCards.sort((a, b) => b.likes - a.likes)];
    }
    console.log(sorted);
    setSortedCards(sorted);

  };

  const getCardData = () => {
    return sortedCards.map((card) => {
      return (
        <Card
        key={card.id}
        id={card.id}
        message={card.message}
        likes={card.likes}
        onLikeCard={onLikeCard}
        onUnregisterCard={onUnregisterCard}
        />
      );
    });
  };

  useEffect(() => {
    setSortedCards([...cards]);
    const selectElement = document.getElementById('sort');
    if (selectElement) {
      selectElement.value = 'id';
    }
  }, [cards]);
  ;


  return(
    <div className="card-display">
      <h2>Board Selected: <span className='italic'>{title}</span></h2>
      <h2>Owner: <span className='italic'>{owner}</span></h2>
      {cards.length === 0 ? (
        <p>No Cards to Display. Please Add a Card using the Form ----{" > "}</p>
      ) : (
        <ul className='card-list'> {getCardData(cards)}</ul>
      )}
      <div className="sort-options">
        <label htmlFor="sort">Sort Cards by: </label>
        <select id='sort' defaultValue="id" onChange={handleSelected}> 
          <option value="id">By ID</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="likes">By Likes</option>
        </select>
      </div>
    </div>
  );
};

CardsList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    })).isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onLikeCard: PropTypes.func.isRequired,
  onUnregisterCard: PropTypes.func.isRequired,
};

export default CardsList;
