const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/talha')
    .then(() => console.log('Connected To mongoDb'))
    .catch(err => console.error('Could not connect'))


const Author = mongoose.model('Author', new mongoose.Schema({
    name:String,
    bio:String,
    website:String
}));


const Course=mongoose.model('Course',new mongoose.Schema({
    name:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }

}))



async function createAuthor(name,bio,website) {
    const author=new Author({
         name,
         bio,
         website
    })

    const result=await author.save()
    console.log(result);
}

async function createCourse(name,author) {
    const course=new Course({
        name,
        author
    })

    const result=await course.save()
    console.log(result);
}



async function listCourses() {

    const courses=await Course
    .find()
    .select('name');

    console.log(courses);
    
}


// createAuthor('Talha','My Bio','My Website')
 createCourse('Akhar','65a80fd7b1eb2f0e05309444')

 listCourses()

