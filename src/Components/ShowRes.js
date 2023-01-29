import '../index.css';
const ShowRes = ({resToShow, handleExpand, toggleVisited, toggleFavourite}) => {

    return resToShow.map(res => 
      <div key={res.id} className = "restaurant" > 
      <div className = "name" onClick = {() => handleExpand(res)}> {res.name}</div> 
      <div className = "rating" onClick = {() => handleExpand(res)}> Rating: {res.rating}/10 </div>
      <div className = "comments">{res.comments}</div> 
      <div className="toggles">
        {res.visited ? <button className="visited" onClick = {() => toggleVisited(res.id)}>visited</button> 
        : <button className="notvisited" onClick = {() => toggleVisited(res.id)}>not visited</button>}
        {res.favourite ? <button className="favourite" onClick = {() => toggleFavourite(res.id)}>fav</button>
        : <button className="notfavourite" onClick = {() => toggleFavourite(res.id)}>not fav</button>}
      </div>
      
      </div>
    )
}

export default ShowRes