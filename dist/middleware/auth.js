import jwt from 'jsonwebtoken';
import { config } from '../config';
import { pool } from '../config/db';
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            console.log(token);
            if (!token) {
                throw new Error("You are not authorized");
            }
            const decoded = jwt.verify(token, config.jwtSecret);
            const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email]);
            if (user.rows.length === 0) {
                throw new Error("User not found");
            }
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            };
            //* role wise access
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    error: "Unauthorized Access",
                });
            }
            console.log(decoded);
            next();
        }
        catch (error) {
            res.status(500).json({
                success: true,
                message: error.message,
            });
        }
    };
};
export default auth;
