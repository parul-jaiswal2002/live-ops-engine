require("dotenv").config() 
const express = require("express")
const mongoose = require('mongoose')
const bodyparse = require('body-parser')
const PORT = process.env.PORT || 8080
const playerRouter = require('./routes/playerRoutes')

const app = express();
app.use(express.json());
app.use(bodyparse.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(' Successfully connect to database and server is running on port 4000')
    })
})
.catch((error) => {
    console.log(error)
})

app.use('/player', playerRouter)


