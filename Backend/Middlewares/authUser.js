const jwt=require('jsonwebtoken');
const User= require('../Models/userModel');
const authUser= async (req,res,next)=>{
    try {
          const {token}= req.cookies;
        if(!token)
        {
            return res.status(401).json({error:"Unauthorized. Please login as User."})
        }
        const verifiedToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!verifiedToken)
        {
            return res.status(401).json({error:"User not authorised"})

        }
        if(verifiedToken.role !== "user")
            {
                return res.status(401).json({error:"Access Denied"})
    
            }
            const user = await User.findById(verifiedToken.id);

            if (!user || !user.active) {
                return res.status(403).json({ error: "Your account has been deactivated. Access denied." });
            }

            req.user=verifiedToken.id
        next()
    } catch (err) {
        console.log(err)
        return res.status(err.status || 401).json ({error:err.message || " User Authentication Failed"})
    }
}
module.exports=authUser 