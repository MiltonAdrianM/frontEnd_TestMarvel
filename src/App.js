import './css/App.css'
import Header from './components/Headers';
import CharacterTable from './components/CharacterTable';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Logout from './pages/Logout';

//Reques URL: https://gateway.marvel.com:443/v1/public/characters/01/comics?apikey=69c3ed802eebb10d246b2b2f8b6904e2

const hash = "d858e6f79d77c94863e0344dda45a1db"

function App() {
  const [items, setItems] = useState();
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('')

  useEffect(() =>{
      const fetch = async() => {
        if (query === '') {
          const result = await axios(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=69c3ed802eebb10d246b2b2f8b6904e2&hash=${hash}`)
          console.log(result.data.data.results);
          setItems(result.data.data.results);
          setLoading(false);
        } else {
          const result = await axios(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=69c3ed802eebb10d246b2b2f8b6904e2&hash=${hash}`)
          console.log(result.data.data.results);
          setItems(result.data.data.results);
          setLoading(false);
        }
    }
    fetch()
  },[query]);

  return (
    <div className="container">
      <Logout />
      <Header />
      <Search search={(q)=>setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;
