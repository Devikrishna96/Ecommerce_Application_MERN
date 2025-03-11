const sellerModel = require("../Models/sellerModel")
const { createToken } = require("../Utilities/generateToken")
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities")

const register= async(req,res)=>{
try{
const {name,email,phone,password,confirmpassword}=req.body
if(!name ||!email || !phone || !password || !confirmpassword)
{
    return res.status(400).json({error:"All fields are required "})
}
if(password !== confirmpassword)
{
    return res.status(400).json({error:"Passwords does not match"})

}
const sellerExist=await sellerModel.findOne({email})
if(sellerExist)
{
    return res.status(400).json({error:"seller already exists"})

}

const hashedPassword=await hashPassword(password)
const newseller= new sellerModel({
    name,email,phone,password:hashedPassword
})
const saved= await newseller.save()
if(saved){
    const token=createToken(saved._id)
    res.cookie("seller_token",token)
console.log(token)
    return res.status(200).json({message:`seller  ${name} Created Successfully`})

}
}catch(err){
console.log(err)
res.status(err.status || 500).json({error:err.message || "Internal server error"})
}
}


const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password )
            {
                return res.status(400).json({error:"All fields are required "})
            }
            const sellerExist=await sellerModel.findOne({email})
if(!sellerExist)
{
    return res.status(400).json({error:"seller does not exists"})

}
const passwordMatch= await comparePassword(password,sellerExist.password)
console.log(passwordMatch)
if(!passwordMatch){
    return res.status(400).json({error:"Password does not match "})
}
const token=createToken(sellerExist._id)
res.cookie("seller_token",token)
return res.status(200).json({message :"seller login successfull",sellerExist})
        }
catch(err){
    console.log(err)
    res.status(err.status || 500).json({error:err.message || "Internal server error"})
}
}


const logout=async(req,res)=>{
    try {
        res.clearCookie("seller_token")
        return res.status(200).json({message: "seller logged out successfully"})
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }
}

//check-seller
const checkSeller=async(req,res)=>{
  try {
    res.json({message : "seller Authorized"})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports={
    register,
    login,
    logout,
    checkSeller
}