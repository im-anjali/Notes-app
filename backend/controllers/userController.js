const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.getUserByEMail(email);
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "Invalid credentials",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({
                status: "error",
                message: "Invalid credentials",
            });
        }
        
          const token =  jwt.sign(
                {id: user._id},
                process.env.JWTSECRETKEY,
                {expiresIn: "1d"}
            )
        
            return res.status(200).json({
                status: "success",
                message: "User logged in successfully",
                token,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
    } catch (error) {
        throw(error);
    }
}

// const signup = async (req, res) =>{
//     const {name, email, password} = req.body;
//     const hashePassword = await bcrypt.hash(password, 10);
//     if(!email || !name || !password){
//         res.send("please fill in all required fields ")
//     }
//     const user = {
//         name:name,
//         email:email,
//         password:hashePassword
//     }


// }
const signup = async (req, res) =>{
        try {
            const {name, email, password} = req.body;
            const user = await userModel.getUserByEMail(email);
            if(user){
                return res.status(400).json({
					status: "error",
					message: "User already exists",
				});
            }
            if(!email || !name || !password){
                res.send("please fill in all required fields ")
            }
            const hashePassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.createUser(
                name,
                email,
                hashePassword
            )
            const token = jwt.sign(
                {id: newUser._id},
                process.env.JWTSECRETKEY,
                {expiresIn: "1d"}
            )
            res.status(201).json({
                status: "success",
                message: "user created successfully",
                data: newUser,
                token,
            });
        } catch (error) {
            throw(error);
        }
}
module.exports = {
    login,
    signup
}