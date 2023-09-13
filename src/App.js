import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<><Banner /> <Movies /></>}/>
        <Route path='/favourites' exact element={<><Favourites/></>} />
      </Routes>
    </Router>
  );
}

export default App;
