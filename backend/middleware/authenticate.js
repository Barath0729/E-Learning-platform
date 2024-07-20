const jwt = require('jsonwebtoken');
const User = require('../models/usermodels');

exports.isauthenticateuser = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
       // const token = req.cookies.token;
        //console.log(token);
        if (!token) {
            console.log("No token available");
            return res.status(401).json({ success: false, message: "Login to access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};
