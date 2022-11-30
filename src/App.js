import './index.css';
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import ShowRes from './Components/ShowRes'
import Overlay from './Components/Overlay'
import restaurantService from './services/restaurants'

//TODO
//seperate into components
//maybe change layout so that sidebar is collapsable
//upload is a restaurant block with a + sign always in the front of everything
//add scrolling feature to only the restaurants block
//one large map that shows how far each restaurant is from you, displays all of them as markers
//each restaurant can be clicked to render a component that shows info + google maps API for ratings and travel time
//form to add restaurant name section uses google maps API to search for the restaurant and stores it
//implement user login

//add styling to each restaurant block to show info better //partially done
//setup axios request data //done
//setup backend //done
//make production build and deploy //done
//connect backend with database //done
//add delete button //done
function App() {

  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newVisited, setNewVisited] = useState('')
  const [newComments, setNewComments] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [filter, setNewFilter] = useState ('')
  const [showMap, setShowMap] = useState(false)


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

  const openMap = () => {
    setShowMap(true)
  }
  const openHome = () => {
    setShowMap(false)
  }

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

  const active = showForm? 'active':'' //for the popup, for some reason having it in seperate component dont focus
  const classes = `modal ${active}`
  const resToShow = restaurants.filter(res => res.name.toLowerCase().includes(filter.toLowerCase()))

  if(showMap){
    return (
      <div className='body'>
        <Sidebar openHome={openHome} openMap = {openMap}/>
       
      
      
      </div>
    )
  } 
  return (
    
    <div className='body'>
      <Sidebar openHome={openHome} openMap = {openMap}/>
      <div className = 'right'>
        <Header handleFilterChange={handleFilterChange} filter={filter} openForm = {openForm} />
        
          <div className="main">
            <div className="content">
              <ShowRes resToShow ={resToShow} deleteRes = {deleteRes}/>
            </div>
          </div>
      </div>
      <Overlay showForm={showForm} deleteRes={deleteRes}/>


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
      
    
    </div>
  )
}

export default App;
