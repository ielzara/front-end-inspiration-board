import PropTypes from 'prop-types';
import './Board.css';
import trash from '../assets/delete.png';

const Board = ({ id, title, owner, onBoardClick, onDeleteBoard }) => {
	return (
    <li>
      <div className="boardList">
        <button className='board-title' onClick={() => onBoardClick(id)}>
          {title}
        </button>

        <button className="delete-board" onClick={() => onDeleteBoard(id)}>
          <img src={trash} alt="trash can icon"/>
        </button>
      </div>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string,
  onBoardClick: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired,
};

export default Board;
