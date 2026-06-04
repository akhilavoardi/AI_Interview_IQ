import jwt from 'jsonwebtoken'

export function authMiddleware (req,res,next){
    const token = req.headers.authorization.split(' ')[1]  // Bearer token

    if(!token){
       return res.status(401).json({message : `Token not provided`})
    }

    try{

        const userPayload =  jwt.verify(token,process.env.TOKEN_SECRET_KEY)


        req.user = userPayload

        next()


    }catch(err){

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" })
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" })
        }

        res.status(500).json({message : "Interval server error"})
    }


}