import './index.css';
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'

function App() {

  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newVisited, setNewVisited] = useState('')
  const [newComments, setNewComments] = useState('')
  const [restaurants, setRestaurants] = useState([])

  const openForm = () => {
    setShowForm(true)
  }
  const closeForm = () => {
    setShowForm(false)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleRatingChange = (e) => {
    setNewRating(e.target.value)
  }
  const handleVisitedChange = (e) => {
    setNewVisited(e.target.value)
  }
  const handleCommentsChange = (e) => {
    setNewComments(e.target.value)
  }
  const active = showForm? 'active':'' //for the popup, for some reason having it in seperate component dont focus
  const classes = `modal ${active}`


  
   //adding new restaurant
   const addRes = (e) => {
    e.preventDefault()
    const newRes = {
      name: newName,
      rating: newRating,
      timesVisited: newVisited,
      comments: newComments,
      id: Math.random()*100
    }
    setRestaurants(restaurants.concat(newRes))
    setNewName('')
    setNewRating('')
    setNewVisited('')
    setNewComments('')
    closeForm()
  }

  const Overlay = () => {
    const active = showForm? 'active':''
    const classes = `overlay ${active}`
    return (
      <div className={classes} onClick = {() => closeForm()}></div> 
    )
  }

 
  return (
    <div className='body'>
      <Sidebar />
      <div className = 'right'>
        <div className="header">
              <div className="search">
                  <input type="text" placeholder="Search.." />
              </div>
              <div className="profile">
                  <p>Kevin Yan</p>
              </div>
              <div className="greeting">
                  <div> Hi there, </div>
                  <div>Kevin</div> 
              </div>
              <div className="buttons">
                  <button className="upload" onClick={() => openForm()}>+</button>
              </div>
          </div>
          <div className="main">
            <div className="content">
              {restaurants.map(res => 
                <div key={res.id} className = "restaurant"> <div className = "name"> {res.name}</div> 
                <div className = "rating"> My Rating: {res.rating}/10 </div> 
                <div className = "timesvisited">Times Visited: {res.timesvisited}  </div> 
                <div className = "comments">My Thoughts: {res.comments}</div> </div>
              )}
            </div>
          </div>
      </div>
      <div className = {classes} id = "modal">
          <div className = "close-btn" onClick = {() => closeForm()}>&times;</div>
          <form action = "" className = "add-restaurant" onSubmit = {addRes}>
              <h2>New Restaurant</h2>
              <input
              className = "input"
              type = "text"
              value={newName}
              onChange={handleNameChange}
              placeholder = "Name"
              required
              maxLength = "200" />

              <input
              className = "rating"
              type = "number"
              value = {newRating}
              onChange={handleRatingChange}
              placeholder = "Rating"
              required
              min = "0"
              max = "10" />

              <input
              className = "timesvisited"
              type = "number"
              value = {newVisited}
              onChange={handleVisitedChange}
              placeholder = "Times Visited"
              required 
              min = "0" />

              <input
              className = "comments"
              type = "text"
              value = {newComments}
              onChange={handleCommentsChange}
              placeholder = "Comments"
              required 
              maxLength = "200" />
              <button className = "submitbtn" type = "submit">Submit</button>
          </form>
        </div>
      
    <Overlay />
    </div>
  )
}

export default App;
