import './App.css';
import AllCharacters from './AllCharacters';
import { Routes,Route, Link } from 'react-router-dom';
import Home from './Home';
import CreateCharacter from './CreateCharacter';
import OneCharacter from './OneCharacter';


function App() {
 

  return (  
    <div className='App'>
      <h1>This is an MCU app, see what year each hero debuted</h1>
      <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mcu">See all character</Link>
          </li>
          <li>
            <Link to="/mcu/create">Create a new MCU character</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mcu' element={<AllCharacters />} />
        <Route path='/mcu/create' element={<CreateCharacter />} />
        <Route path='/mcu/:name' element={<OneCharacter />} />
      </Routes>
    </div>
  );
}

export default App;