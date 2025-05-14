const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token1 = req.headers.authorization;
    if(!token1){
        return res.status(401).json({
            message: 'no token acccess denied'
        })
    }
    const token = token1.split(' ')[1];
    if(!token){
         return res.status(401).json({
            message : 'no token, access denied'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
           mesage:'token is invalid'
        })
    }
};

module.exports = authMiddleware;
