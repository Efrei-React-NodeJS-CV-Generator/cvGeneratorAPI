const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const Role = require("../roles/RolesEnum");

const getAuthenticatedUser = async (req) => {
    try {

        let token = req.headers["authorization"];

        if (token) {
            token = token.replace("Bearer ", "");

            const { userId } = jwt.verify(token, process.env.JWT_SECRET);

            const user = await UserModel.findById(userId);

            return user;
        } else {
            return null;
        }
    } catch (error) {
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
