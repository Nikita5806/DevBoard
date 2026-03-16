import axios from 'axios'

const API = axios.create({
  baseURL: 'https://devboard-klfc.onrender.com/api'
})

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API

//What this does:

// axios.create() → creates axios instance
//                  with base URL already set

// interceptors   → runs before EVERY request
//                  automatically adds token
//                  no need to add token manually
//                  every time we call API
// So instead of writing this every time
// axios.get('http://localhost:5000/api/jobs', {
//   headers: { Authorization: `Bearer ${token}` }
// })
//we write this
// API.get('/jobs')
// token added automatically! ✅