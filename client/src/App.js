import { useState } from "react";
import './App.css';

//components
import Card from "./components/Card";
import Favourites from "./components/Favourites";
import Notification from "./components/Notification";


export default function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState({
    query: "",
    entity:"",
  });
  const [loading, setLoading] = useState(false);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Gets the user selecton from the select element
  function handleSelect(e){
    setUserSearch({...userSearch, entity: e.target.value});
  }

  // Fetches data from the back-end
  async function getData(e){
    // prevent page refresh because it wipes out fetched results
    e.preventDefault();

    // Show loading screen to user
    setLoading(true);
    
    // Programatically sends a json object to the server containing relevant user request data
    const options = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userSearch)
    }
    
    const fetchedData = await (await fetch("/", options)).json();

    // Add back-end data to data state
    setData(fetchedData);

    // Remove loading screen
    setLoading(false);
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
            <input 
              type="text" 
              placeholder="search" 
              onInput={(e) => setUserSearch({...userSearch, query: e.target.value})}
            />
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
          (!loading && data.length !== 0) &&
            data.map(result => {
              // Destructure properites 
              const {collectionId, artistId, collectionArtistId } = result;
              return (
                <Card 
                  {...result} 
                  key={collectionId || artistId || collectionArtistId} 
                  id={collectionId || artistId || collectionArtistId}
                  favouritesList={favouritesList}
                  setFavouritesList={setFavouritesList}
                  setNotificationMessage={setNotificationMessage}
                />
              )
            })
        }
        {(data.length === 0 && !loading) && <h3>Either you have not searched for anything or it's not found</h3>}
        {loading && <h3>...Loading</h3>}
      </main>
      {/* Add 'favourite-ed'(liked items) results to the favourites components */}
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
