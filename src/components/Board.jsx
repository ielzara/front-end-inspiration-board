import PropTypes from 'prop-types';
import './Board.css';
// import deleteIcon from './assets/delete';

const Board = ({ id, title, owner, onBoardClick, onDeleteBoard }) => {
	return (
    <li>
      <div className="boardList">
        <button className='board-title' onClick={() => onBoardClick(id)}>
          {title}
        </button>

        <button className="delete-board" onClick={() => onDeleteBoard(id)}>
          delete
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
