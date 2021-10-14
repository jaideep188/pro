require('./config/connect');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('express').json;
app.use(bodyParser());

const UserRouter = require('./api/route')

app.use('/user',UserRouter)

app.listen(port,()=>{
    console.log('Server Running')
})