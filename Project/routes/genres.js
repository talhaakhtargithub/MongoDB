const Joi = require('joi')
const express = require('express');
const router=express.Router()
const mongoose = require('mongoose')



const Genre=mongoose.model('Genre',{
    name:{
        type:String,
        required:true, 
        minlength:5,
        maxlength:50
    }
})



router.get('/', async (req, res) => {
    const genres=await Genre.find().sort('name')
    res.send(genres)
});

router.post('/',  async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);

    }

    let genre =new Genre({name: req.body.name})


    await genre.save()
    res.send(genre)

})


router.put('/:id', async (res, req) => {
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    const genre =await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},
        {new:true})
     
    if (!genre)
        return res.status(404).send("The genres with given ID");



  genre.name = req.body.name;
    res.send(genre)

})

router.delete('/:id', async (res, req) => {

    const genre=await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send("The genre with given id ");

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1)
    res.send(genre)
});

router.get('/:id', async (req, res) => {

    const genre=await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send("The genre with the given ID");
    res.send(genre);


})



async function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    try {
        const validatedGenre = await schema.validateAsync(genre);
        return validatedGenre;
    } catch (error) {
        // Handle validation error
        throw error;
    }
}



module.exports=router