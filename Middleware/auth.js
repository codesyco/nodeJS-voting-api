import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js'

export const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) return res.status(401).json({error:"Authorization token is required"}) 

    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.MY_SECRET)

        req.user = await User.findOne({ _id });

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Error", response: error.message})
    }
}


export const isAdmin = async (req, res, next) => {

    await requireAuth(req, res, () => {
        // Handle potential missing user object from requireAuth
        if (!req.user._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden: Admin access required" });
        }

        // If all checks pass, allow access
        next();
    });
};


// exports.authorizeRole = (roles) => {
//     // Implementation for role-based authorization
// };