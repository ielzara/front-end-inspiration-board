import PropTypes from 'prop-types';
import './Board.css';

const Board = ({ id, title, owner }) => {
	return (
    <li className="boardList">
      <button
        className={'boardName'}
        // onClick={onTaskClicked}
      >
        {title}
      </button>
      <button
      className="deleteBoard"
				// onClick={onUnregisterClicked}
				>
      Delete Board</button>
    </li>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default Board;
