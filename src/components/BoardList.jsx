import './BoardList.css';
import PropTypes from 'prop-types';
import Board from './Board';


const BoardList = ({boards, onBoardClick, onDeleteBoard }) => {
  const getBoardData = (boards) => {
    return boards.map((board) => {
      return (
        <Board
        key={board.id}
        id={board.id}
        title={board.title}
        owner={board.owner}
        onBoardClick={onBoardClick}
        onDeleteBoard={onDeleteBoard}
        />
      );
    });
  };
  
  return(
  <div className='board-display'>
  <h2>Boards</h2>
    <ol className='board-list'>{getBoardData(boards)}</ol>
    </div>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string,
    })).isRequired,
  onBoardClick: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired,
};

export default BoardList;
