const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/talha')
    .then(() => console.log('Connected To mongoDb'))
    .catch(err => console.error('Could not connect'))

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})
const Author = mongoose.model('Author', authorSchema);


const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    // author:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Author'
    // }
    // authors: {
    //     type: authorSchema,
    //     required: true
    // }



    authors:[authorSchema]

}))



async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    })

    const result = await authors.save()
    console.log(result);
} 

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    })

    const result = await course.save()
    console.log(result);
}



async function listCourses() {

    const courses = await Course
        .find()
        .populate('authors', 'name -_id')
        //.populate('category','name')
        .select('name authors');

    console.log(courses);

}
async function updateAuthor(courseId) {
    const course = await Course.findOneAndUpdate(
        { _id: courseId },
        { $unset: { 'authors.name': 'Talha APK' } },
        { new: true } // This option returns the modified document
    );
    // course.author.name='talha akhtar'
    course.save()
}


async function addAuthor(courseId,author) {
    const course=await Course.findById(courseId)
    console.log(course);
    course.authors.push(author )
    course.save()
    
}

//createAuthor('Talha','My Bio','My Website')
// createCourse('Anjum',[
//     new Author({name:'talha'}),
//     new Author({name:'Akhtar'})
// ])

// updateAuthor('65a816e9aa178c33ba0bf911')
// listCourses()
addAuthor('65a81c18a23c02f827c2dc8b','Mosh')
