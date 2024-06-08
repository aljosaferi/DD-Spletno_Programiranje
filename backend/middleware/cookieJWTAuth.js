const jwt = require("jsonwebtoken");

function cookieJWTAuth(req, res, next){
    console.log("JWTAuthenticate middleware called");
    const token = req.cookies.token;
    if(!token) {
        console.log("No token");
        return res.status(404).json({ "error": "No token provided" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(403).json({ "error": "Invalid token" });
    }
}

module.exports = cookieJWTAuth;