import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, number } = req.body;

    if (!userName || !email || !password || !number) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, 'User already exists'); // <-- throw here
    }

    const newUser = await User.create({ userName, email, password, number })

    return res.status(201).json(new ApiResponse(200, newUser, "user registered successfully"));
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, 'User Not Found');
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid Credentials');
    }
    const token = user.generateJWT();
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(201)
        .cookie('token', token, options)
        .json(new ApiResponse(200, { user, token }, "Login successful"));
});

export const logoutUser = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "Logout successful"));


});