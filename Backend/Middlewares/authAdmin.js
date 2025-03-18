const jwt=require('jsonwebtoken');
const Admin = require('../Models/adminModel');
const authAdmin= async(req,res,next)=>{
    try {
          const {admin_token}= req.cookies;
        if(!admin_token)
        {
            return res.status(401).json({error:"Unauthorized. Please login as admin."})
        }
        const verifiedToken=jwt.verify(admin_token,process.env.JWT_SECRET)
        if(!verifiedToken)
        {
            return res.status(401).json({error:"Admin not authorised"})

        }
        if(verifiedToken.role !== "admin")
            {
                return res.status(401).json({error:"Access Denied"})
    
            }
            const admin = await Admin.findById(verifiedToken.id);
            if (!admin || !admin.active) {
                return res.status(403).json({ error: "Your account has been deactivated. Access denied." });
            }
            req.admin=verifiedToken.id
        next()
    } catch (err) {
        console.log(err)
        return res.status(err.status || 401).json ({error:err.message || " Admin Authentication Failed"})
    }
}
module.exports=authAdmin 