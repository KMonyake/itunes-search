//components
import SmallCard from "./SmallCard";


export default function Favourites({ favouritesList, setFavouritesList, setIsFavouritesOpen }) {
    return (
        <div className="favourites">
            <div className="modal" >
                <header>
                    <h2>My Favourites</h2>
                    <h2 onClick={()=> setIsFavouritesOpen(false)}>❌</h2>
                </header>
                <div>
                    {/* Maps out the favourites collection to the SmallCard components */}
                    {
                        favouritesList.map(result => {
                            return (
                                <SmallCard 
                                    key={result.id} 
                                    {...result} 
                                    // Prop drilling the favouritesList for further use in the SmallCard component
                                    favouritesList={favouritesList} 
                                    setFavouritesList={setFavouritesList}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}