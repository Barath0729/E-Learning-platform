const express=require('express');
const {registerUser, login, logout, forgetpassword,  myprofile, changepassword,getAllUsers,editUserRole, editUser} = require('../controllers/authController');
const { isauthenticateuser } = require('../middleware/authenticate');
const { addCourse, getUserCourses, deleteCourse, editCourse, getCourseById, getAllCourses } = require('../controllers/coursecontroller');
const router=express.Router();
//user routes
router.route('/register').post(registerUser);
router.route('/login').post (login);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgetpassword);
//router.route('/password/reset/:token').post(resetpassword);
router.route('/myprofile').get(isauthenticateuser,myprofile);
router.route('/changepassword').post(changepassword);
router.route('/users').get(getAllUsers);
//router.route('/edit-role').put(editUserRole);
router.route('/editUser').post(editUser);
//courseroutes
router.route('/addcourse').post(isauthenticateuser,addCourse);
router.route('/mycourses').get(isauthenticateuser,getUserCourses);
router.route('/mycourses/delete/:id').delete(isauthenticateuser,deleteCourse);
router.route('/mycourses/edit/:id').put(isauthenticateuser,editCourse);
router.route('/courses/:id').get(isauthenticateuser,getCourseById);
router.route('/allcourses').get(getAllCourses);


//Enrolled Course
router.route('/EnrolledCourses').get(isauthenticateuser,);

module.exports=router