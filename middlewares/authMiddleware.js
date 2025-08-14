

export const isLoggedIn = (req, res, next) => {
    try {
        // 1️⃣ Get refreshToken from cookies
        const refreshToken = req.cookies.refreshToken;

        const accessToken = req.headers.authorization 



        return res.status(200).json({ message: "Token received", refreshToken ,accessToken});
       
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
