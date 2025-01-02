import { useState } from 'react';
import './App.css'
import BoardList from './components/BoardList';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';

const cards_data = [
  {id: 1, message: "Go to Japan", likes: 0, board_id: 1},
  {id: 2, message: "Go to Italy", likes: 0, board_id: 1},
  {id: 3, message: "Go to Greece", likes: 0, board_id: 1},
  {id: 4, message: "You are loved", likes: 0, board_id: 2},
  {id: 5, message: "You are amazing", likes: 0, board_id: 2},
  {id: 6, message: "You are beautiful", likes: 0, board_id: 2},
]

const board_data = [
  {id: 1, title: "Travel", owner: "Alice", cards: [cards_data[0], cards_data[1], cards_data[2]]},
  {id: 2, title: "Pick-Me-Up Quotes", owner: "Alice", cards: [cards_data[3], cards_data[4], cards_data[5]]},
]

function App() {
  const [boards, setBoards] = useState(board_data);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  

  const addBoard = (newBoard) => {
    const nextId = boards.length + 1; // Generate new ID
    setBoards([...boards, { id: nextId, ...newBoard, cards: [] }]);
  };
  
  const deleteBoard = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
    if (selectedBoardId === id) {
      setSelectedBoardId(null); // Deselect the board if it's being deleted
    }
  };

  const addCard = (newCard) => {
    const nextCardId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    
    setBoards(boards.map(board => {
      if (board.id === selectedBoardId) {
      return {
        ...board,
        cards: [...board.cards, { id: nextCardId, ...newCard, likes: 0, board_id: selectedBoardId }]
      };
      } else {
      return board;
      }
    }));

  };

  const handleBoardClick = (id) => {
    console.log(`Board clicked: ${id}`);
    setSelectedBoardId(id);
  };
  
  const selectedBoard = boards.find(board => board.id === selectedBoardId);

  const handleLikeCard = (id) => {
    setBoards(boards.map(board => {
      if (board.id === selectedBoardId) {
        return {
          ...board,
          cards: board.cards.map(card => {
            if (card.id === id) {
              return { ...card, likes: card.likes + 1 };
            } else {
              return card;
            }
          })
        };
      } else {
        return board;
      }
    }));
  }

  const handleUnregisterCard = (id) => {
    setBoards(boards.map(board => {
      if (board.id === selectedBoardId) {
        return {
          ...board,
          cards: board.cards.filter(card => card.id !== id)
        };
      } else {
        return board;
      }
    }));
  }

  
  return (
    <>
      <header className="App-header">
        <h1>InspoForagers</h1>
      </header>
      <main>
          <BoardList boards={boards} onBoardClick={handleBoardClick} onDeleteBoard={deleteBoard} />
          <NewBoardForm addBoard={addBoard}/>
          {selectedBoard && <CardsList
          cards={selectedBoard.cards} 
          title={selectedBoard.title} 
          owner={selectedBoard.owner}
          onLikeCard={handleLikeCard}
          onUnregisterCard={handleUnregisterCard}
          />}
          {selectedBoard && <NewCardForm addCard={addCard} />}
      </main>
    </>
  )
  }


export default App;
