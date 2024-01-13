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
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: async function (v) {
        return v && v.length > 0;
      },
      message: "Course should have at least one tag"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v),
  },
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular',
    category: 'web', // Corrected category value to lowercase
    author: 'Talha',
    tags: ['Frontend'],
    isPublished: true,
    price: 15.90,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    for (const field of Object.keys(error.errors)) {
      console.log(error.errors[field].message);
    }
  } finally {
    mongoose.connection.close();
  }
}

async function getCourses() {
  try {
    const courses = await Course
      .find({ _id: '65a2d4e3497adb201c704b6e' })
      .sort({ name: 1 })
      .select('name price');
    console.log(courses[0].price);
  } catch (error) {
    console.error(error.message);
  } finally {
    mongoose.connection.close();
  }
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
  mongoose.connection.close();
}

// Uncomment to execute getCourses function
getCourses();

// Uncomment to execute removeCourse function
// removeCourse('your_course_id_here');

// Uncomment to execute createCourse function
// createCourse();
