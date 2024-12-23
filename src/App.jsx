
import './App.css'
import Boards from './components/Boards';
import NewBoardForm from './components/NewBoardForm';

function App() {

  return (
    <main>
      <h1>Inspiration Board</h1>
      <div>
        <Boards />
        <NewBoardForm />
      </div>
    </main>
     
  )
}

export default App;
