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
    const pageNum=2; 
    const pageSize=10;
    // /api/courses?page 
    const courses = await Course
        .find({ author: 'Talha', isPublished: true })
        // .find({price:{$gt: 10,$lte:20}})
        // .find({price:{$in: [10,15,20]}})
        //logical method
        // .find()
        // .or([{author:'Mosh'},{isPublished:true}])
        // .and([{author:'Mosh'},{isPublished:true}])
        //regEx

        //start with Mosh
        // .find({ author: /^Mosh/ })
        // end with Mosh
        // .find({ author: /Mosh$/ })
        // at any palce
        // .find({ author: /.*Mosh.*/i })


        //paginatin
        .skip((pageNum-1)*pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count()
        // .select({ name: 1, tag: 1 });
        
    console.log(courses)

}



getCourses()


