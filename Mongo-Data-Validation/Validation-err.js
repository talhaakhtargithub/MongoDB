const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error('Could Not Connect to MongoDB ', err);
  });

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 55,
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'], // Corrected typo in enum values
  },
  author: String,
  tags: {
    type:Array,
    validate:{
        isAsync:true,
        validator:function(v,callback){
            setTimeout(() => {
                const result=v && v.length >0
                callback(result)
            }, 5000);
            
            


        },
        message:"Course Shold have at least one atg"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular',
    category: 'web', // Corrected category value
    author: 'Talha',
    tags: [],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.error('Error creating course:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

// async function getCourses() {
//   const pageNum = 2;
//   const pageSize = 10;

//   const courses = await Course
//     .find({ author: 'Talha', isPublished: true })
//     .skip((pageNum - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .countDocuments(); // Updated count() to countDocuments()
//   console.log(courses);
//   mongoose.connection.close();
// }

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
  mongoose.connection.close();
}

// Uncomment to execute getCourses function
//  getCourses();

// Uncomment to execute removeCourse function
// removeCourse('your_course_id_here');

// Uncomment to execute createCourse function
createCourse();
