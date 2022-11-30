import '../index.css';
const ShowRes = ({resToShow, deleteRes}) => {
    return resToShow.map(res => 
      <div key={res.id} className = "restaurant"> <div className = "name"> {res.name}</div> 
      <div className = "rating"> Rating: {res.rating}/10 </div> 
      <div className = "timesvisited">Visited: {res.timesVisited}  </div> 
      <div className = "comments">{res.comments}</div> 
      <button className="deleteRes" onClick = {() => deleteRes(res.id)}>Delete</button></div>
    )
}

export default ShowRes