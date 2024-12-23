
import './App.css'
import BoardList from './components/BoardList';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';


const cards_data = [
  {id: 1, message: "Go to Japan", likes: 0},
  {id: 2, message: "Go to Italy", likes: 0},
  {id: 3, message: "Go to Greece", likes: 0},
]

const board_data = [
  {id: 1, title: "Travel", owner: "Alice", cards: {cards_data}},
  {id: 2, title: "Pick-Me-Up Quotes", owner: "Alice"},
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
    </main>
    </>
  )
}

export default App;
