const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground').then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error('Could Not Connect to MongoDB ', err)
});



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean

})



const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Talha',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result)

}
createCourse()

async function getCourses() {
    const courses = await Course
    // .find({ author: 'Talha', isPublished: true })
    .find({price:{$gt: 10}}).limit(10).sort({ name: 1 }).select({ name: 1, tag: 1 });
    console.log(courses)

}



getCourses()


