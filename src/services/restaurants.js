import axios from 'axios'
const baseUrl = '/api/res'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject, {headers: {
      'Content-Type': 'multipart/form-data'
    }
    })
    return request.then(response => response.data)
  }

const del = id => {
    axios.delete(`${baseUrl}/${id}`)
}
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const getMapsKey = () => {
  const request = axios.get('/api/maps-key')
  return request.then(response => response.data)
}
  
  export default { getAll, create, update, del, getMapsKey}