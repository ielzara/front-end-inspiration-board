import { useState, useEffect } from 'react';
import './App.css'
import BoardList from './components/BoardList';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';
import axios from 'axios';
import process from 'process';


const kBaseUrl = process.env.VITE_APP_BACKEND_URL;

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
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      throw new Error('Error adding card');
    });
};

const unregisterCardAsync = (card_id) => {
  return axios.delete(`${kBaseUrl}/cards/${card_id}`)
    .catch(err => {
      console.log(err);
      throw new Error(`error deleting card ${card_id}`);
    });
};

const addLikeAsync = (card_id) => {
  return axios.patch(`${kBaseUrl}/cards/${card_id}/like`)
    .catch(err => {
      console.log(err);
      throw new Error(`error liking card ${card_id}`);
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
            cards: [...(board.cards || []), addedCard]
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
    addLikeAsync(id)
    .then(() => {
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
  });
  };

  const handleUnregisterCard = (id) => {
    unregisterCardAsync(id)
      .then(() => {
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
  });
  };
  
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
