import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isProd = process.env.NODE_ENV === "production"; // 👈 FALTA ESTO

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "None" : "Lax",
            path: "/api",
        });

        return res.status(401).json({ message: "Session expired" });
    }
};
