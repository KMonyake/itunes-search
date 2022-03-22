
export default function SmallCard({ id, name, art, collectionName, favouritesList, setFavouritesList }){
    // Removes deleted result from the entire favourites collection
    function removeFromFavourites(){
        // newList is a clone of the favouritesList
        const newList = [...favouritesList];
        // finalList is a list that will not include the deleted item
        const finalList = [];
        // Only push items without the matching id to the finalList array 
        for(let i = 0; i < newList.length; i++){
            if(newList[i].id !== id){
                finalList.push(newList[i]);
            }
        }

        // Save finalList as the new favouritesList
        setFavouritesList(finalList);
    }

    return (
        <div className="small-card">
            <img src={art} alt="album art"/>
            <div className="details">
                <h3>{name}</h3>
                <h4>{collectionName}</h4>
            </div>
            <button className="toggle-fav-btn" onClick={removeFromFavourites}>X</button>
        </div>
    )
}