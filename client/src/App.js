import './App.css';
import { Provider } from 'react-redux';
import store from "./store/store";
import Nav from "./components/Nav/Nav";
import Home from './components/Routes/Home';
import Town from './components/Routes/Town';
import Explore from './components/Routes/Explore';
import Transaction from './components/Transactions/Transaction';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/town" exact element={<Town />} />
          <Route path="/transactions" exact element={<Transaction />} />
          <Route path="/explore" exact element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
