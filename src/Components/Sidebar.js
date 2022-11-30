import '../index.css';
const Sidebar = ({openHome, openMap}) => {
    return (
        <div className="sidebar">
            <div className="title">
                <div className="food">Food</div>
                <div className="mark">Mark</div>
            </div>
            <div className="Home">
                <a onClick={() => openHome()}>Home</a>
            </div>
            <div className="Map">
                <a onClick={() => openMap()}>Map</a>
            </div>
            <div className="Favourites">
                <a>Favourites</a>
            </div>
            <div className="Visited">
                <a>Visited</a>
            </div>
            <div className="Interested">
                <a>Interested</a>
            </div>
            
            <div className="Rating">
                <a>Rating</a>
            </div>
            <div className="Friends">
                <a>Friends</a>
            </div>
        </div>
    )
}
export default Sidebar