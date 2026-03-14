const express = require('express')//server
const mongoose = require('mongoose') //db he
const cors = require('cors')//protect from diff origin
const dotenv = require('dotenv')// stores sesitive files
const authRoutes = require('./routes/auth.routes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)


app.get('/', (req, res) => {
  res.send('DevBoard API is running')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000')
    })
  })
  .catch((err) => {
    console.log('Connection failed', err)
  })