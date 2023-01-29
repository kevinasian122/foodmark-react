/* eslint-disable no-undef */
import './index.css';
import { useState, useEffect, useRef } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import ShowRes from './Components/ShowRes'
import Overlay from './Components/Overlay'
import restaurantService from './services/restaurants'
import { GoogleMap, useLoadScript, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
//TODO
//load every location as a marker with info window
//add features for visited, favourite
//display the visited and favourites in diff colour markers
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
function App({mapsKey}) {

  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newComments, setNewComments] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [filter, setNewFilter] = useState ('')
  const [expand, setExpand] = useState(false)
  const [resShow, setResShow] = useState()
  const [newImage, setNewImage] = useState()

  const [showMap, setShowMap] = useState(false)
  const [showFavourite, setShowFavourite] = useState(false)
  const [showUnvisited, setShowUnvisited] = useState(false)
  const [searchResult, setSearchResult] = useState("Result: none")
  const [newPlace, setNewPlace] = useState('')

  const [selected, setSelected] = useState(null)

  const tempInitial = [
    {
      mapsRating: 8,
      mapsRatingCount: 3000,
      coordinates: {
        lat:43.4723, 
        lng: -80.5449
      },
      openHours:[
        {
          "close": { "day": 1, "time": "1700" },
          "open": { "day": 1, "time": "0900" },
        },
        {
          "close": { "day": 2, "time": "1700" },
          "open": { "day": 2, "time": "0900" },
        },
        {
          "close": { "day": 3, "time": "1700" },
          "open": { "day": 3, "time": "0900" },
        },
        {
          "close": { "day": 4, "time": "1700" },
          "open": { "day": 4, "time": "0900" },
        },
        {
          "close": { "day": 5, "time": "1700" },
          "open": { "day": 5, "time": "0900" },
        },
      ],
      website: "https://developers.google.com/maps/documentation/places/web-service/details",
      name: "Gyubee",
      rating: 9,
      comments: "sadasdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      visited: true,
      favourite: false,
      id: 3
    },{
      mapsRating: 8,
      mapsRatingCount: 3000,
      coordinates: {
        lat:43.4723, 
        lng: -80.5449
      },
      openHours:[
        {
          "close": { "day": 1, "time": "1700" },
          "open": { "day": 1, "time": "0900" },
        },
        {
          "close": { "day": 2, "time": "1700" },
          "open": { "day": 2, "time": "0900" },
        },
        {
          "close": { "day": 3, "time": "1700" },
          "open": { "day": 3, "time": "0900" },
        },
        {
          "close": { "day": 4, "time": "1700" },
          "open": { "day": 4, "time": "0900" },
        },
        {
          "close": { "day": 5, "time": "1700" },
          "open": { "day": 5, "time": "0900" },
        },
      ],
      website: "https://developers.google.com/maps/documentation/places/web-service/details",
      name: "Gyubee",
      rating: 9,
      comments: "sadasdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSS",
      visited: true,
      favourite: false,
      id: 3
    },
    
  ]
    
  
  const hook = () => {
    //setRestaurants(tempInitial)
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
    setNewName('')
    setNewRating('')
    setNewComments('')
    setNewImage('')
    setShowForm(false)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleRatingChange = (e) => {
    setNewRating(e.target.value)
  }

  const handleCommentsChange = (e) => {
    setNewComments(e.target.value)
  }
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
    
  }
  const handleImageChange = (e) => {
    
    setNewImage(e.target.files[0])
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
    setShowFavourite(false)
    setShowUnvisited(false)
  }
  const openFavourite = () => {
    setShowMap(false)
    setShowFavourite(true)
    setShowUnvisited(false)
  }
  const openUnvisited = () => {
    setShowMap(false)
    setShowUnvisited(true)
    setShowFavourite(false)
  }

   //adding new restaurant
   const addRes = (e) => {
    e.preventDefault()
    const newRes = {
      mapsRating: newPlace.rating,
      mapsRatingsCount: newPlace.user_ratings_total,
      coordinates: {
        lat: newPlace.geometry.location.lat(),
        lng: newPlace.geometry.location.lng(),
      },
      openHours: newPlace.opening_hours.periods,
      website: newPlace.website,
      name: newName,
      rating: newRating,
      comments: newComments,
      visited: false,
      favourite: false,
      image: newImage,
      id: Math.random()*100
    }
    restaurantService.create(newRes)
    .then(data => {
      console.log(data.image)
      setRestaurants(restaurants.concat(data))
      closeForm()
    })
    
  }

  const handleExpand = (res) => {
    setExpand(true)
    setResShow(res)
    
  }
  const toggleVisited = id => {
    const res = restaurants.find(r => r.id === id)
    const changed = {visited: !res.visited, favourite: res.favourite }
    restaurantService.update(id, changed).then(response => {
      setRestaurants(restaurants.map(r => r.id !== id ? r : response))
    })
  }
  const toggleFavourite = id => {
    const res = restaurants.find(r => r.id === id)
    const changed = {visited: res.visited, favourite: !res.favourite  }
  
    restaurantService.update(id, changed).then(response => {
      console.log(response)
      const newres = restaurants.map(r => r.id !== id ? r : response)
      console.log(newres)
      setRestaurants(newres)
    })
  }

  const active = showForm? 'active':'' //for the popup, for some reason having it in seperate component dont focus
  const classes = `modal ${active}`
  let resToShow = restaurants.filter(res => res.name.toLowerCase().includes(filter.toLowerCase()))
  if(showUnvisited){
    resToShow = resToShow.filter(res => res.visited === false)
  }
  if(showFavourite){
    resToShow = resToShow.filter(res => res.favourite === true)
  }


  //Maps
  const libraries = ["places"]
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapsKey,
    libraries: libraries
  })
  const mapRef = useRef(null)
  const [zoom, setZoom] = useState(15)

  const [center, setCenter] = useState({lat:43.4723, lng: -80.5449})

  useEffect(() => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom())
      setCenter(mapRef.current.getCenter())
    }
  }, []);
 

  function onLoad(autocomplete) {
    setSearchResult(autocomplete)
  }
  function onPlaceChanged() {
    if (searchResult != null) {
      setNewPlace(searchResult.getPlace())
    }
  } 
  function panCenter() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          if(!isLoaded){
            return <div>Loading...</div>
          }
          setCenter(pos)
          

          
        })}
  }
  
  
  if(!isLoaded){
    return <div>Loading...</div>
  }
 
  if(showMap){
    if(!isLoaded){
      return <div>Loading...</div>
    }
    
    return (
      <div className='body'>
        <Sidebar openHome={openHome} openMap = {openMap} openUnvisited={openUnvisited} openFavourite = {openFavourite}/>
        <div className = 'right'>
          <GoogleMap 
          ref={mapRef}
          center={center} 
          zoom = {zoom} 
          mapContainerStyle={{width:'85vw', height: '100vh'}}
          onIdle={() => {
            setZoom(mapRef.current.getZoom());
            setCenter(mapRef.current.getCenter());
          }}
          >
            {restaurants.map(res => 
              <Marker
               position = {{lat: res.coordinates.lat, lng: res.coordinates.lng}}
               onClick = {() => {
                setSelected(res)
               }} />
            )}
            <Marker position = {center}/>
            
            {selected? (<InfoWindow position={{lat: selected.coordinates.lat, lng: selected.coordinates.lng}} onCloseClick={() => setSelected(null)}>
              <div>
                <h2>{selected.name}</h2>
              </div>
            </InfoWindow>) : null} 
          </GoogleMap>
          <button className = 'mylocation' onClick={panCenter}>My Location</button>
        </div>
      
      
      </div>
    )
  }
  if(expand){
    const date = new Date()
    const target = date.getDay()
    let openNow = false
    for(const day of resShow.openHours){
      if(day.close.day === target){
        const t = date.getHours() * 100 + date.getMinutes()
        if(t<Number(day.close.time) && t>Number(day.open.time)){
          openNow = true
        }
      }
    }
    const b64image = resShow.image.data.data ? btoa(String.fromCharCode(...new Uint8Array(resShow.image.data.data))) : null
    return(
      <div className='body'>
          <Sidebar openHome={openHome} openMap = {openMap} openUnvisited={openUnvisited} openFavourite = {openFavourite}/>
          <div className = 'right'>
            <div className="expand">
              <div className="extitle">
                {resShow.name}
              </div>
              <div className="exbody">
                <div className="exinfo">
                  <div className="exrating">Rating: {resShow.rating} / 10</div>
                  <div className="excomments">Comments: {resShow.comments}</div>
                  <div className="visited">{resShow.visited ? 'visited': 'not visited'}</div>
                  <div className="opennow">{openNow ? 'Open': 'Closed'} Now</div>
                  {resShow.mapsRating ? 
                  <div className="mapsinfo">
                    <div>GoogleMaps</div>
                    <div className="mapsrating">Rating: {resShow.mapsRating}</div>
                    <div className="mapsratingcount">{resShow.mapsRatingsCount} reviews</div>
                    <a href = {resShow.website} className="website">website</a>
                  </div> : null}
                  <button className="exdeleteRes" onClick = {() => deleteRes(resShow.id)}>Delete</button>
                </div>
                
                {b64image ? 
                  <div className="receipt">
                  <img src={`data:image/png;base64,${b64image}`} alt='receipt'/>
                  </div> : null
                }
                
              </div>
              
            </div>
            
          </div>
        
        
      </div>
    )
    
  } 
  return (
    
    <div className='body'>
      <Sidebar openHome={openHome} openMap = {openMap} openUnvisited={openUnvisited} openFavourite = {openFavourite}/>
      <div className = 'right'>
        <Header handleFilterChange={handleFilterChange} filter={filter} openForm = {openForm} />
        
          <div className="main">
            <div className="content">
              <ShowRes resToShow ={resToShow} handleExpand={handleExpand} toggleVisited = {toggleVisited} toggleFavourite = {toggleFavourite}/>
            </div>
          </div>
      </div>
      
      <Overlay showForm={showForm} closeForm={closeForm}/>


      <div className = {classes} id = "modal">
          <div className = "close-btn" onClick = {() => closeForm()}>&times;</div>
          <form action = "" className = "add-restaurant" onSubmit = {addRes}>
              <h2>New Restaurant</h2>
                <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                  <input
                    type="text"
                    placeholder="Official Name"
                    className="mapsInput"
                  />
                </Autocomplete>
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
              onChange={handleImageChange} />
              <button className = "submitbtn" type = "submit">Submit</button>
          </form>
        </div>
      
    
    </div>
  )
}

export default App;
