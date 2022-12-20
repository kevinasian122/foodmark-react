import './index.css';
import { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import ShowRes from './Components/ShowRes'
import Overlay from './Components/Overlay'
import restaurantService from './services/restaurants'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
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
  const [expand, setExpand] = useState(false)
  const [resShow, setResShow] = useState()
  const [newImage, setNewImage] = useState()

  const tempInitial = [
    {
      name: "Gyubee",
      rating: 9,
      timesVisited: 5,
      comments: "sadasdas",
      id: 3
    },
    {
      name: "asd",
      rating: 9,
      timesVisited: 5,
      comments: "sadasdas",
      id: 4
    }
  ]
    
  

  const hook = () => {
    setRestaurants(tempInitial)
    /*
    restaurantService.getAll()
    .then(initial => {
      setRestaurants(initial)
    })
    */
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
  const handleImageChange = (e) => {
    setNewImage(e.target.value)
  }
  const deleteRes = (id) => {
    const target = restaurants.find(res => id === res.id)
    if(window.confirm(`Delete ${target}?`)){
      restaurantService.del(id)
      setRestaurants(restaurants.filter(r => r.id !== id))
      setExpand(false)
    }
  }

  const openMap = () => {
    setShowMap(true)
  }
  const openHome = () => {
    setShowMap(false)
    setExpand(false)
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

  const handleExpand = (res) => {
    setExpand(true)
    setResShow(res)
    
  }

  const active = showForm? 'active':'' //for the popup, for some reason having it in seperate component dont focus
  const classes = `modal ${active}`
  const resToShow = restaurants.filter(res => res.name.toLowerCase().includes(filter.toLowerCase()))


  //maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ['places'],
  })
  const center = {lat:43.4723, lng: -80.5449}

  if(showMap){
    if(!isLoaded){
      return <div>Loading...</div>
    }
    return (
      <div className='body'>
        <Sidebar openHome={openHome} openMap = {openMap}/>
        <div className = 'right'>
          <GoogleMap center={center} zoom = {15} mapContainerStyle={{width:'85vw', height: '100vh'}}>
            <Marker position={center} />
          </GoogleMap>
        </div>
      
      
      </div>
    )
  }
  if(expand){
    return(
      <div className='body'>
          <Sidebar openHome={openHome} openMap = {openMap}/>
          <div className = 'right'>
            <div className="expand">
              <div className="extitle">
                {resShow.name}
              </div>
              <div className="exbody">
                <div className="exinfo">
                  <div className="exrating">Rating: {resShow.rating} / 10</div>
                  <div className="exvisited">Times Visited: {resShow.timesVisited}</div>
                  <div className="excomments">Comments: {resShow.comments}</div>
                  <button className="exdeleteRes" onClick = {() => deleteRes(resShow.id)}>Delete</button>
                </div>
                <div className="receipt">
                  <img src = 'https://media.istockphoto.com/id/889405434/vector/realistic-paper-shop-receipt-vector-cashier-bill-on-white-background.jpg?s=1024x1024&w=is&k=20&c=B_OzWMDe-lUIpeXqq0OChs-i871pFd448uNk_mEy8Ck='></img>
                </div>
              </div>
              
            </div>
            
          </div>
        
        
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
              <ShowRes resToShow ={resToShow} deleteRes = {deleteRes} handleExpand={handleExpand}/>
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

              <input 
              className = "getReceipt"
              type="file" 
              accept="image/*" 
              value = {newImage}
              onChange={handleImageChange} />
              <button className = "submitbtn" type = "submit">Submit</button>
          </form>
        </div>
      
    
    </div>
  )
}

export default App;
