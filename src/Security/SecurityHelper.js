const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const Role = require("../roles/RolesEnum");

const getAuthenticatedUser = async (req) => {
    try {
        console.log("req:", req);
        console.log("Headers:", req.headers);

        let token = req.headers["authorization"];
        console.log("Authorization Header:", token);

        if (token) {
            token = token.replace("Bearer ", "");
            console.log("Token:", token);

            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded User ID:", userId);

            const user = await UserModel.findById(userId);
            console.log("Authenticated User:", user);

            return user;
        } else {
            console.log("No token provided");
            return null;
        }
    } catch (error) {
        console.error("Error in getAuthenticatedUser:", error);
        return null;
    }
};

const isUserOwner = (requestingUser, ownerUser) => {
    return requestingUser ? requestingUser._id.toString() === ownerUser._id.toString() : false;
};

const isUserAdmin = (requestingUser) => {
    return requestingUser ? requestingUser.role === Role.ADMIN : false;
};

module.exports = { getAuthenticatedUser, isUserOwner, isUserAdmin };
