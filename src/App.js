import logo from './logo.svg';
import './App.css';

import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { Stock } from './components/stock';
function App() {
  return (
    <div className="App">
<Stock/>
    </div>
  );
}



export default App;
