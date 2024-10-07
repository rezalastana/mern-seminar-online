const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

// middleware untuk mengecek apakah user sudah login atau tidak (authenticate)
const authenticateUser = (req, res, next) => {
    try {
        let token;
        // jika token di header
        const authHeader = req.headers.authorization;

        // chek
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            throw new UnauthenticatedError("Authenticated invalid");
        }

        // payload
        const payload = isTokenValid({ token: token });

        // attach the user and permissions to the request obj
        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId,
        };

        next();
    } catch (error) {
        next(error);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};

// bisa kita gunakan di fungsi yang membutuhkan authenticate (seperti add category, edit category, delete category, dll)
module.exports = {
    authenticateUser,
    authorizeRoles,
};
