import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    const validateToken: any = (token: any) => {
        if (token) {
            try {
                return jwt.verify(token, "supersecretkey");
            } catch (err) {
                console.log("buramı girdi");
                return res.status(401).json({
                    errorName: "InvalidSession",
                    message: "user unautharized",
                    stack: err.stack || "no stack defined",
                });
            }
        }
    };
    const token = req.headers.authorization;
    validateToken(token);
    next();
};
