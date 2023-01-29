import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import restaurantService from './services/restaurants'
let mapsKey = ''
restaurantService.getMapsKey()
    .then(result => {
      mapsKey = result.apiKey
      ReactDOM.createRoot(document.getElementById('root')).render(<App mapsKey={mapsKey}/>)
    })
//ReactDOM.createRoot(document.getElementById('root')).render(<App mapsKey={mapsKey}/>)
