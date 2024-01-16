const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playfeild ')
.then(()=>{console.log('Connected To MonogDb')})
.catch(err=>console.error('Could Not Connect to error',err));




const schema=new mongoose.Schema({
    name:String,
    id:Number,
    author:String,
    price:Number,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean

})

const Course=mongoose.model('Course',schema);


async function createCourse() {
    const course=new Course({
        name:'Talha Akhtar',
        id:1,
        price:60,
        author:'Talha',
        tags:['ash','tak'],
        isPublished:true
    })
    
    
    
    const result=await course.save()
    console.log(result)
}
// createCourse()

async function getCourses() {

    const pageNumber=2;
    const pageSize=10

    // eq,lt,mt,mte,gte,in,nin

    // or and
    const courses = await Course
    // .find({author:'Talha',isPublished:true})
    // .find({author:/Talha$/i})
    // .find({author:/.*al.*/i})
    .find({author:/^Talha/})
    .skip((pageNumber-1)*pageSize)
    // .and([{author:'Talha'},{isPublished:false}])
    .limit(pageSize)
    .sort({name:1})
    .select({name:1,tags:1})
    .countDocuments()
    console.log(courses);
}


getCourses()
