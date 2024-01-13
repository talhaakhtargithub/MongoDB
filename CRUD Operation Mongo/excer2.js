const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mongo-excer');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: { type: Date, default: Date.now },
    price: Number

})


const Course = mongoose.model('Course', courseSchema)
async function getCourses() {
    return await Course.findById({ isPublished: true })
    .or([{tags:'frontend'},{tags:'backend'}])
        // .sort({ price:-1 })
        .sort('-price')
        // .select({ name: 1, author: 1 })
        .select('name author price')

}
async function run(){
    const courses =await getCourses()
    console.log(courses)
}
run()
