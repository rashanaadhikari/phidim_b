import { verifyAccessToken } from "../utils/generate.js";


export const isLoggedIn = (req, res, next) => {
    try {

        const accessToken = req.headers.authorization 

        const  decoded=  verifyAccessToken(accessToken);

        console.log("Decoded token:", decoded);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};



export const isAdmin = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;

        const decoded = verifyAccessToken(accessToken);

        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

export const isWorker = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;

        const decoded = verifyAccessToken(accessToken);

        if (!decoded || decoded.role !== 'worker') {
            return res.status(403).json({ message: "Forbidden: Workers only" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}