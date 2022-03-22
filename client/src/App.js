import { useState } from "react";
import './App.css';

//components
import Card from "./components/Card";
import Favourites from "./components/Favourites";
import Notification from "./components/Notification";


export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [entity, setEntity] = useState("");
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Handles the user's searched term
  function handleInput(e){
    const userInput = e.target.value;
    const wordArr = [];

    // Convert empty spaces into a plus sign (+)
    for(let i = 0; i < userInput.length; i++){
      if(userInput[i] === " "){
        wordArr.push("+");
      }
      else{
        wordArr.push(userInput[i]);
      }
    }

    // Convert array back into a single string concatenated by plus signs (+) , e.g 'sponge+bob'
    setQuery(wordArr.join(""));
  }

  // Handles the user selecton from the select element
  function handleSelect(e){
    const userChoice = e.target.value;
    setEntity(userChoice);
  }

  //fetches data from the back-end
  async function getData(e){
    // prevent page refresh because it wipes out fetched results
    e.preventDefault();
    
    // Programatically sends a json object to the server containing relevant user request data
    const options = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ query, entity })
    }
    
    const fetchedData = await (await fetch("/", options)).json();
    // Add back-end data to data state
    setData(fetchedData);
  }

  return (
    <div className="app">
      <nav>
        <div className="nav-header">
          <button 
            className="favourites-btn" 
            onClick={() => setIsFavouritesOpen(true)}>favourites</button>
        </div>
        <div className="nav-main">
          <form className="search-container" onSubmit={getData}>
            <input type="text" placeholder="search" onInput={handleInput}/>
            <button type="submit" className="search-btn">🔍</button>
          </form>
          <div className="select-section">
            <h3>filter</h3>
            <select className="menu" onChange={handleSelect}>
                <option value="all">all</option>
                <option value="song">song</option>
                <option value="musicArtist">music artist</option>
                <option value="album">album</option>
                <option value="movie">movie</option>
                <option value="podcast">podcast</option>
                <option value="tvSeason">tv season</option>
                <option value="shortFilm">short film</option>
                <option value="software">software</option>
                <option value="audiobook">audio book</option>
                <option value="ebook">e-book</option>
            </select>
          </div>
        </div>
      </nav>
      <main>
        {/* Map out each result to a card component, that shows the image and details or indicate lack of results */}
        {
          data.length !== 0?
            data.map(result => {
              return (
                <Card 
                  {...result} 
                  key={result.trackId} 
                  favouritesList={favouritesList}
                  setFavouritesList={setFavouritesList}
                  setNotificationMessage={setNotificationMessage}
                />
                )
              })
              :
            <h3>It's lonely here. Try searching for something🐶</h3>
        }
      </main>
      {/* Add 'favourited'(liked items) results to the favourites components */}
      {
        isFavouritesOpen && 
          <Favourites 
            favouritesList={favouritesList} 
            setFavouritesList={setFavouritesList}
            setIsFavouritesOpen={setIsFavouritesOpen}
        />
      }
      {/* 
        Show Notifcation to show feedback to user ,only if the component has a message prop which will be toggled accordingly 
      */}
      {
        notificationMessage && 
          <Notification 
            notificationMessage={notificationMessage} 
            setNotificationMessage={setNotificationMessage}
          />
      }
    </div>
  );
}
