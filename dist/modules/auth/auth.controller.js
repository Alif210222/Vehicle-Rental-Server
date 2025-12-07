import { authService } from "./auth.service";
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // 
    try {
        const result = await authService.loginUser(email, password); //* controller
        // console.log(result)
        res.status(200).json({
            success: "true",
            message: "Login successful ",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
export const authController = {
    loginUser
};
