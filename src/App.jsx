import { Board } from './components/Board';
import { Header } from './components/Header';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Board />
      </main>
    </div>
  );
}

export default App;
