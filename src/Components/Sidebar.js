import '../index.css';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="title">
                <div className="food">Food</div>
                <div className="mark">Mark</div>
            </div>
            <div className="Home">
                <a href = "">Home</a>
            </div>
            <div className="Favourites">
                <a href = "">Favourites</a>
            </div>
            <div className="Visited">
                <a href = "">Visited</a>
            </div>
            <div className="Interested">
                <a href = "">Interested</a>
            </div>
            <div className="Map">
                <a href = "">Map</a>
            </div>
            <div className="Rating">
                <a href = "">Rating</a>
            </div>
            <div className="Friends">
                <a href = "">Friends</a>
            </div>
        </div>
    )
}
export default Sidebar