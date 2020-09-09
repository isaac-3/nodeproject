const express = require('express')
const { response } = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false); // for findoneandupdate
const {MONGOURI} = require('./keys')
const app = express()

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('commected')
})
mongoose.connection.on('error',(err)=>{
    console.log('err', err)
})


app.use(express.json())
app.use(cors()) 
app.use(bodyParser())


require('./models/user')
require('./models/post')
app.use(require('./routes/post'))
app.use(require('./routes/auth'))
app.use(require('./routes/user'))


app.listen(3001)
console.log('running on port 3001')