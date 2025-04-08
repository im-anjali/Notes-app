const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.getUserByEMail(email);
        if(!user){
            res.send("user does not exist");
        }
        const isMatch = await bcrypt.compare(user, user.password);
        if(!isMatch){
            res.send("wrong password");
        }
        if(user && isMatch){
            jwt.sign(
                {id: user._id},
                process.env.JWTSECRETKEY,
                {expiresIn: "1d"}
            )
        }
        res.send("user logged in successfully")
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
                res.send("user already exists");
            }
            if(!email || !name || !password){
                res.send("please fill in all required fields ")
            }
            const hashePassword = await bcrypt.hash(password, 10);

            const newUser = {
                name: name,
                email: email,
                password: hashePassword
            } 
            const token = jwt.sign(
                {id: user._id},
                process.env.JWTSECRETKEY,
                {expiresIn: "1d"}
            )
            res.send("user created successfully");
        } catch (error) {
            throw(error);
        }
}
module.exports = {
    login,
    signup
}