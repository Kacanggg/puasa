const jwt = require("jsonwebtoken")
const secretKey = "kunci"

const authJWT = (roles = []) => {
    return (req,res,next) =>{
        const token = req.header('authorization')
        if (!token){
            return res.status(401).json({message: "Unathorized"})
        }
    
        try {
            const auth = token.split(" ")[1]
            console.log(auth)
            const decoded = jwt.verify(auth, secretKey)
            req.user = decoded

            if (roles.length > 0 && !roles.includes(decoded.role)){
                return res.status(403).json({message: "Forbidden: Acces Denied"})
            }
            next()
        }
        catch (error) {
            return res.status(403).json({message: "Invalid Token"})
        }
    }
}

module.exports = authJWT