import './index.css';
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
// import Header from './Components/Header'
import restaurantService from './services/restaurants'

//TODO
//add styling to each restaurant block to show info better //partially done
//setup axios request data //done
//setup backend //done
//make production build and deploy
//connect backend with database
//add delete button
//seperate into components
//add scrolling feature to only the restaurants block
//each restaurant can be clicked to render a component that shows info + google maps API for ratings and travel time
//form to add restaurant name section uses google maps API to search for the restaurant and stores it
//implement user login
function App() {

  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newVisited, setNewVisited] = useState('')
  const [newComments, setNewComments] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [filter, setNewFilter] = useState ('')


  const hook = () => {
    restaurantService.getAll()
    .then(initial => {
      setRestaurants(initial)
    })
  }
  useEffect(hook, [])

  //handle form
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
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
    
  }
  const deleteRes = (id) => {
    const target = restaurants.find(res => id === res.id)
    if(window.confirm(`Delete ${target}?`)){
      restaurantService.del(id)
      setRestaurants(restaurants.filter(r => r.id !== id))
    }
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
    restaurantService.create(newRes)
    .then(data => {
      setRestaurants(restaurants.concat(data))
      setNewName('')
      setNewRating('')
      setNewVisited('')
      setNewComments('')
      closeForm()
    })
    
  }

  
  const Overlay = () => {
    const active = showForm? 'active':''
    const classes = `overlay ${active}`
    return (
      <div className={classes} onClick = {() => closeForm()}></div> 
    )
  }



  const ShowRes = () => {
    return resToShow.map(res => 
      <div key={res.id} className = "restaurant"> <div className = "name"> {res.name}</div> 
      <div className = "rating"> Rating: {res.rating}/10 </div> 
      <div className = "timesvisited">Visited: {res.timesVisited}  </div> 
      <div className = "comments">{res.comments}</div> 
      <button className="deleteRes" onClick = {() => deleteRes(res.id)}>Delete</button></div>
    )
  }

  const resToShow = restaurants.filter(res => res.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div className='body'>
      <Sidebar />
      <div className = 'right'>
        <div className="header">
              
              <input 
              className="search" type="text" placeholder="Search.." 
               value = {filter} 
              onChange={handleFilterChange} 
              />
              
              <div className="profile">
                  <button className="account">Kevin Yan</button>
              </div>
              <div className="greeting">
                  <div> Hi there, </div>
                  <div>Kevin</div> 
              </div>
              <div className="buttons">
                  <button className="upload" onClick={() => openForm()}>Upload</button>
              </div>
          </div>
          <div className="main">
            <div className="content">
              <ShowRes />
            </div>
          </div>
      </div>
      <div className = {classes} id = "modal">
          <div className = "close-btn" onClick = {() => closeForm()}>&times;</div>
          <form action = "" className = "add-restaurant" onSubmit = {addRes}>
              <h2>New Restaurant</h2>
              <input
              className = "getName"
              type = "text"
              value={newName}
              onChange={handleNameChange}
              placeholder = "Name"
              required
              maxLength = "200" />

              <input
              className = "getRating"
              type = "number"
              value = {newRating}
              onChange={handleRatingChange}
              placeholder = "Rating / 10"
              required
              min = "0"
              max = "10" />

              <input
              className = "getTimesvisited"
              type = "number"
              value = {newVisited}
              onChange={handleVisitedChange}
              placeholder = "Times Visited"
              required 
              min = "0" />

              <input
              className = "getComments"
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
