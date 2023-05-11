const express = require('express')
const PORT=8000
const membersControl = require('./controller/membersController')



const cors = require('cors')
let app = express()
app.use(cors())
app.use(express.json())
require('./dataBase')

app.use('/api/members', membersControl)

app.listen(PORT, console.log(`listen to port ${PORT}`))

