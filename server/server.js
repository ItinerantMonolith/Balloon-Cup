const AppRouter = require('./routes/AppRouter')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const socketIo = require("socket.io")
const http = require('http')
const PORT = process.env.PORT || 3001
const SOCKET_PORT = process.env.SOCKET_PORT || 3002

const GameManager = require('./gameComponents/gameManager')

const app = express()

// for socket.io
const server = http.createServer(app)
const options = {

} // revisit this +==
const io = socketIo(server, options)


const gameManager = new GameManager()

io.on('connection', (socket) => {
   gameManager.addPlayer( socket )
});


// Require Middleware
const logger = require('morgan')
// Require Middleware
// Initialize Middlewarenpx dt
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize Middleware
app.get('/', (req, res) => res.send({ msg: 'Server Working' }))
app.use('/api', AppRouter)
app.listen(PORT, async () => {
   try {
      console.log(`App listening on port: ${PORT}`)
   } catch (error) {
      throw new Error('Connection Error')
   }
})

server.listen(SOCKET_PORT, async () => {
   try {
      console.log(`server listening on port: ${SOCKET_PORT}`)
   } catch (error) {
      throw new Error('Connection Error')
   }
})

