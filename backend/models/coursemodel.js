const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    url: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId }, // Reference to User schema
    trainer: { type: String },
    rating: { type: String },
    syllabus: { type: String },
    image: {
        type: String,
        default: './images/No.png'
    },
    videos: [videoSchema]
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
