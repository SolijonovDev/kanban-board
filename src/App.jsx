import { Board } from './components/Board';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';
import { useTodoContext } from './context/TodoProvider';

import './App.scss';

function App() {
  const { isOpenPopup } = useTodoContext();
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Board />
      </main>
      {isOpenPopup && <AddTodo />}
    </div>
  );
}

export default App;
