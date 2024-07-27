const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body; // Removed walletAddress from login
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token, role:user.role });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const registerController = async (req, res) => {
    try {
        const { name, email, password, walletAddress, role } = req.body;
        if (!name || !email || !password || !walletAddress || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, email, password: hashedPassword, walletAddress, role });

        // Return only necessary information, avoid sending back password
        return res.status(201).json({ user: { name, email, walletAddress, role } });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: { name: user.name, email: user.email, walletAddress: user.walletAddress, role: user.role } });
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const userInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: { name: user.name, email: user.email, walletAddress: user.walletAddress, role: user.role, id: user._id, pastPriscriptions: user.pastPriscriptions } });
    } catch (error) {
        console.error("User Info Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { loginController, registerController, authController, userInfo, };
