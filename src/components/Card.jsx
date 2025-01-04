import './Card.css';
import PropTypes from 'prop-types';

const Card = ({id, message, likes, onLikeCard, onUnregisterCard}) => {

  const onLikeClicked = () => {
    onLikeCard(id);
  };

  const onUnregisterClicked = () => {
    onUnregisterCard(id);
  };

  return(
    <li className="card">
      <h3> {message} </h3>
      <div className='buttons'>
        <button className='likes-button' onClick={onLikeClicked} >
          💚 {likes}
        </button>
        <button className='delete-button' onClick={onUnregisterClicked}> Delete Card </button>
      </div>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onLikeCard: PropTypes.func.isRequired,
  onUnregisterCard: PropTypes.func.isRequired,
};


export default Card;
