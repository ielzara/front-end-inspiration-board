
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

  return (
    <>
      <header className="App-header">
        <h1>InspoForagers</h1>
      </header>
      <main>
          <BoardList boards= {board_data}/>
          <NewBoardForm />
          <CardsList cards= {cards_data} />
          <NewCardForm />
      </main>
    </>
  )
}

export default App;
