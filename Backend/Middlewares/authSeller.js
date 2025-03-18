const jwt=require('jsonwebtoken');
const Seller = require('../Models/sellerModel');
const authSeller= async(req,res,next)=>{
    try {
          const {seller_token}= req.cookies;
        if(!seller_token)
        {
            return res.status(401).json({error:"Unauthorized. Please login as Seller."})
        }
        const verifiedToken=jwt.verify(seller_token,process.env.JWT_SECRET)
        if(!verifiedToken)
        {
            return res.status(401).json({error:"Seller not authorised"})

        }
        console.log(verifiedToken.role)
        if(verifiedToken.role !== "seller")
            {
                return res.status(401).json({error:"Access Denied"})
    
            }
            const seller = await Seller.findById(verifiedToken.id);

            if (!seller || !seller.active) {
                return res.status(403).json({ error: "Your account has been deactivated. Access denied." });
            }
            req.seller=verifiedToken.id
        next()
    } catch (err) {
        console.log(err)
        return res.status(err.status || 401).json ({error:err.message || " Seller Authentication Failed"})
    }
}
module.exports=authSeller 