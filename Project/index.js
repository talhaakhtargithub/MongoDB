const Joi = require('joi')
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const mongoose = require('mongoose')
app.use(express.json());

mongoose.connect('mongodb://localhost/vidly').then(
    () => console.log('Connected to MongoDb')
).catch(err => console.log('Error In connection ', err))
app.use('/api/genres', genres)

const port = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('Home')
})
app.listen(port, () => console.log
    (`Listeninng to the port ${port}`)
);

