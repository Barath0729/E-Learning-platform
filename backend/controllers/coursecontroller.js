const Course = require('../models/coursemodel');
const jwt = require('jsonwebtoken');

// Add a new course
exports.addCourse = async (req, res) => {
    try {
        const { title, description, amount, level, category, duration} = req.body;
        const { _id: trainerId, name: trainer } = req.user;

        const course = await Course.create({
            title,
            description,
            amount,
            level,
            category,
            duration,
            trainerId,
            trainer
        });

        res.status(201).json({ success: true, course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
///get user coursers
exports.getUserCourses = async (req, res) => {
    try {
        const userId = req.user._id;
        const userCourses = await Course.find({ trainerId: userId });
        res.status(200).json({ success: true, courses: userCourses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        // Ensure that the course belongs to the logged-in user
        const userId = req.user._id;
        const course = await Course.findOne({ _id: courseId, trainerId: userId });
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Edit a course
exports.editCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user._id;
        const { title, description, amount, level, category, duration, rating, syllabus, videos } = req.body;
        const course = await Course.findOneAndUpdate(
            { _id: courseId, trainerId: userId },
            { title, description, amount, level, category, duration, rating, syllabus, videos },
            { new: true }
        );
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, courses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

