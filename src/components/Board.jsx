import PropTypes from 'prop-types';
import './Board.css';

const Board = ({ id, title, owner, onBoardClick, onDeleteBoard }) => {
	return (
    <li>
      <div className="boardList">
        <button className={'boardName'} onClick={() => onBoardClick(id)}>
          {title}
        </button>

        <button className="deleteBoard" onClick={() => onDeleteBoard(id)}>
          Delete Board
        </button>
      </div>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onBoardClick: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired,
};

export default Board;
