import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS (Cross-Site Scripting) attack
        sameSite: "strict", // prevent CSRF (Cross-Site Request Forgery) attck
        secure: process.env.NODE_ENV !== "development"
    });
}

export default generateTokenAndSetCookie;