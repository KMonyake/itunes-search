
export default function Card({
    // Destructuring for easier prop names
    trackId: id,
    artistName: name,
    artworkUrl100: art, 
    collectionName,
    primaryGenreName: genre,
    artistType: type,
    favouritesList,
    setFavouritesList,
    setNotificationMessage
}) 
{
    // Adds results to a favourites collection
    function addToFavourites(){
        const currentItem = {id, name, art, collectionName};

        // Added the item to the favourites collection
        setFavouritesList([...favouritesList, currentItem]);
        // Trigger a notifcaion to show that an item was added to the favourites collection
        setNotificationMessage("Added to favourites.")
    }

    return (
        <div className="card">
            <img src={art} alt="No album art found" />
            <div className="details">
                <h3>{name}</h3>
                <h4>{collectionName || genre}</h4>
                {type && <h5>{type}</h5>}
            </div>
            <button className="toggle-fav-btn" onClick={addToFavourites}>❤</button>
        </div>
    )
}