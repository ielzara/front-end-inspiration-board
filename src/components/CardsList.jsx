import './CardsList.jsx';
import PropTypes from 'prop-types';
import Card from './Card';


const CardsList = ({cards, title, owner, onLikeCard, onUnregisterCard}) => {
  const getCardData = (cards) => {
    return cards.map((card) => {
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
  return(
    <div className='cardDisplay'>
      <h2>Board Selected: {title}</h2>
      <h2>Owner: {owner}</h2>
      {cards.length === 0 ? (
        <p>No Cards to Display. Please Add a Card using the Form ----{" > "}</p>
      ) : (
        <ul className='card-list'> {getCardData(cards)}</ul>
      )}
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
