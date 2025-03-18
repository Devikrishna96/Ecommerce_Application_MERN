const Seller = require("../Models/sellerModel")
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
const sellerExist=await Seller.findOne({email})
if(sellerExist)
{
    return res.status(400).json({error:"seller already exists"})

}

const hashedPassword=await hashPassword(password)
const newseller= new Seller({
    name,email,phone,password:hashedPassword
})
const saved= await newseller.save()
if(saved){
    const token=createToken(saved._id,"seller")
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
            const sellerExist=await Seller.findOne({email})
if(!sellerExist)
{
    return res.status(400).json({error:"seller does not exists"})

}
const passwordMatch= await comparePassword(password,sellerExist.password)
console.log(passwordMatch)
if(!passwordMatch){
    return res.status(400).json({error:"Password does not match "})
}
const token=createToken(sellerExist._id,"seller")
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

const profileView = async (req, res) => {
    try {
      const seller = await Seller.findById(req.seller).select("-password"); // Exclude password
      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }
      return res.status(200).json({ seller });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  const profileEdit= async(req,res)=>{
      try {
          const sellerId = req.seller;        
          const { name, phone } = req.body;
          let updateData = { name, phone };
          
  console.log(req.file)
          if (!name && !phone && !req.file) {
              return res.status(400).json({ error: "At least one field is required to update profile" });
            }
               if (req.file) {
              const profilePicUrl = await uploadToCloudinary(req.file.path,"profile_pics");
              updateData.profilepic = profilePicUrl;
          }
          const updatedSeller = await Seller.findByIdAndUpdate(sellerId, updateData, { new: true });
          if (!updatedSeller || !seller.active) {
              return res.status(404).json({ error: "Your account is deactivated. You cannot update your profile." });
            }
            return res.status(200).json({ message: "Profile updated successfully", seller: updatedSeller });
  
      } catch (err) {
          console.log(err)
          return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
      }
  }
  
  //profile deactivate
  const profileDeactivate= async(req,res)=>{
      try {
          const sellerId = req.seller;
          const deactivatedSeller = await Seller.findByIdAndUpdate(sellerId, { active: false }, { new: true})
          if (!deactivatedSeller) {
              return res.status(404).json({ error: "seller not found" });
          }
          if (!seller.active) {
            return res.status(400).json({ error: "seller is already deactivated." });
        }
          return res.status(200).json({ message: "Profile deactivated successfully" });
      } catch (err) {
          console.log(err)
          return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
      }
  }
  //password forgot
  
  const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(400).json({ error: "seller not found" });
      }
      if (!seller.active) {
        return res.status(403).json({ error: "Your account is deactivated. You cannot reset your password." });
    }
      const resetToken = crypto.randomBytes(32).toString("hex");
      seller.resetToken = resetToken;
      seller.resetTokenExpiry = Date.now() + 3600000; 
  
      await seller.save();
  
      const resetLink = `http://localhost:3000/api/v1/seller/reset-password?token=${resetToken}`;
  
      await sendEmail(seller.email, "Password Reset Request", `Click here to reset your password: ${resetLink}`);
  
      return res.status(200).json({ message: "Reset link sent to email" });
  
    } catch (err) {
      console.error("Forgot Password Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  //reset password
  const resetPassword = async (req, res) => {
      try {
        const { resetToken, newPassword } = req.body;
    
        if (!resetToken || !newPassword) {
          return res.status(400).json({ error: "Token and new password are required" });
        }
    
        const seller = await Seller.findOne({
          resetToken,
          resetTokenExpiry: { $gt: new Date()}, 
        });
       
    
        if (!seller) {
          return res.status(400).json({ error: "Invalid or expired token" });
        }
    
        seller.password = await hashPassword(newPassword);
        seller.resetToken = undefined;
        seller.resetTokenExpiry = undefined;
    
        await seller.save();
    
        return res.status(200).json({ message: "Password reset successfully" });
    
      } catch (err) {
        console.error("Reset Password Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
    
    
    // View All Sellers
    const getAllSellers = async (req, res) => {
        try {
            const sellers = await Seller.find({}).select("-password");
            return res.status(200).json({data: sellers });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
  
  
  // Delete Seller
  const deleteSeller = async (req, res) => {
      try {
          const { sellerId } = req.params;
          const deletedSeller = await Seller.findByIdAndDelete(sellerId);
  
          if (!deletedSeller) {
              return res.status(404).json({ error: "Seller not found" });
          }
  
          return res.status(200).json({ message: "Seller deleted successfully" });
  
      } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
  }
  
  // Approve Seller
  const approveSeller = async (req, res) => {
      try {
          const { sellerId } = req.params;
          const seller = await Seller.findByIdAndUpdate(sellerId, { verified: true }, { new: true });
  
          if (!seller) {
              return res.status(404).json({ error: "Seller not found" });
          }
  
          return res.status(200).json({ data :seller, message: "Seller approved successfully"});
  
      } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
  }
module.exports={
    register,
    login,
    logout,
    checkSeller,
    profileView,
    profileEdit,
    profileDeactivate,
    forgotPassword,
    resetPassword,
    getAllSellers,
    deleteSeller,
    approveSeller
}