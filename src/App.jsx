import { useState, useEffect } from 'react';
import './App.css'
import BoardList from './components/BoardList';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import axios from 'axios';

// const cards_data = [
//   {id: 1, message: "Go to Japan", likes: 0, board_id: 1},
//   {id: 2, message: "Go to Italy", likes: 0, board_id: 1},
//   {id: 3, message: "Go to Greece", likes: 0, board_id: 1},
//   {id: 4, message: "You are loved", likes: 0, board_id: 2},
//   {id: 5, message: "You are amazing", likes: 0, board_id: 2},
//   {id: 6, message: "You are beautiful", likes: 0, board_id: 2},
// ]

// const board_data = [
//   {id: 1, title: "Travel", owner: "Alice", cards: [cards_data[0], cards_data[1], cards_data[2]]},
//   {id: 2, title: "Pick-Me-Up Quotes", owner: "Alice", cards: [cards_data[3], cards_data[4], cards_data[5]]},
// ]

const kBaseUrl = 'http://127.0.0.1:5000';

const getBoardsAsync = () => {
  return axios.get(`${kBaseUrl}/boards`)
    .then(response => response.data.boards)
    .catch(err => {
      console.log(err);
      throw new Error('error fetching boards');
    });
};

const addBoardAsync = (newBoard) => {
  return axios.post(`${kBaseUrl}/boards`, newBoard)
    .then(response => response.data.board)
    .catch(err => {
      console.log(err);
      throw new Error('Error adding board');
    });
};

const deleteBoardAsync = (id) => {
  return axios.delete(`${kBaseUrl}/boards/${id}`)
    .catch(err => {
      console.log(err);
      throw new Error(`error deleting task ${id}`);
    });
};

const addCardAsync = (board_id, newCard) => {
  return axios.post(`${kBaseUrl}/boards/${board_id}/cards`, newCard)
    .then(response => response.data.card)
    .catch(err => {
      console.log(err);
      throw new Error('Error adding card');
    });
};

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  
  useEffect(() => {
    getBoardsAsync()
    .then((fetchedBoards) => setBoards(fetchedBoards))
    .catch((err) => console.log(err.message));
}, []);

  const addBoard = (newBoard) => {
    addBoardAsync(newBoard)
    .then(addedBoard => {
      setBoards(prevBoards => {
        const updatedBoards = [...prevBoards, addedBoard];
        return updatedBoards;
      });
    })
    .catch(err => {
      console.log('Error adding board:', err.message);
    });
};
  
  const deleteBoard = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
    if (selectedBoardId === id) {
      setSelectedBoardId(null); // Deselect the board if it's being deleted
    }
    deleteBoardAsync(id)
    .catch(err => {
      console.log('Error deleting board:', err.message);
    })
  };

  const addCard = (newCard) => {
  const cardWithLikes = { ...newCard, likes: 0 };
  addCardAsync(selectedBoardId, cardWithLikes)
    .then(addedCard => {
      setBoards(boards.map(board => {
        if (board.id === selectedBoardId) {
          return {
            ...board,
            cards: [...board.cards, addedCard]
          };
        } else {
          return board;
        }
      }));
    })
    .catch(err => {
      console.log('Error adding card:', err.message);
    });
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
    <div className='App'>
      <header className="App-header">
        <h1>InspoForagers</h1>
      </header>
      <main>
          <BoardList boards={boards} onBoardClick={handleBoardClick} onDeleteBoard={deleteBoard} />
          {boards.length === 0 && <p>No boards available. Try adding one!</p>}
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
    </div>
  )
  }


export default App;
