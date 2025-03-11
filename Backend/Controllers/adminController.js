const adminModel = require("../Models/adminModel")
const { createToken } = require("../Utilities/generateToken")
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities")

const register = async (req,res)=>{
    try{
const {email,password}=req.body
if(!email || !password){
    return res.status(400).json({message:"All fields are required"})
}
const alreadyExist= await adminModel.findOne({email})
if(alreadyExist){
    return res.status(400).json({error:"Email already Exist"})

}
const hashedPassword= await hashPassword(password)
const newAdmin=new adminModel({
    email,password:hashedPassword
})
const saved= await newAdmin.save()
if(saved){
    return res.status(201).json({message:"Admin Registered Successfully",saved})
}
    }catch(err)
    {
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
            const adminExist=await adminModel.findOne({email})
if(!adminExist)
{
    return res.status(400).json({error:"Admin does not exists"})

}
const passwordMatch= await comparePassword(password,adminExist.password)
console.log(passwordMatch)
if(!passwordMatch){
    return res.status(400).json({error:"Password does not match "})
}
const token=createToken(adminExist._id,"admin")
res.cookie("admin_token",token)
return res.status(200).json({message :"Admin login successfull",adminExist})
        }
catch(err){
    console.log(err)
    res.status(err.status || 500).json({error:err.message || "Internal server error"})
}
}


const logout=async(req,res)=>{
    try {
        res.clearCookie("admin_token")
        return res.status(200).json({message: "Admin logged out successfully"})
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }
}



const profileView=async(req,res)=>{
    try{
        console.log(req.admin)
        const admin = await adminModel.findById(req.admin).select("-password");

    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    if (!admin.active) {
      return res.status(403).json({ error: "Your account is deactivated." });
  }
    return res.status(200).json({ admin });
    }
    catch(err){
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }

}




//password forgot

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "admin not found" });
    }
    if (!admin.active) {
      return res.status(403).json({ error: "Your account is deactivated. You cannot reset your password." });
  }
    const resetToken = crypto.randomBytes(32).toString("hex");
    admin.resetToken = resetToken;
    admin.resetTokenExpiry = Date.now() + 3600000; 

    await admin.save();

    const resetLink = `http://localhost:3000/api/v1/admin/reset-password?token=${resetToken}`;

    await sendEmail(admin.email, "Password Reset Request", `Click here to reset your password: ${resetLink}`);

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
  
      const admin = await adminModel.findOne({
        resetToken,
        resetTokenExpiry: { $gt: new Date()}, 
      });
     
  
      if (!admin) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }
  
      admin.password = await hashPassword(newPassword);
      admin.resetToken = undefined;
      admin.resetTokenExpiry = undefined;
  
      await admin.save();
  
      return res.status(200).json({ message: "Password reset successfully" });
  
    } catch (err) {
      console.error("Reset Password Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  



//check-admin
const checkAdmin=async(req,res)=>{
  try {
    res.json({message : "admin Authorized"})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password");
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// View All Sellers
const getAllSellers = async (req, res) => {
    try {
        const sellers = await sellerModel.find({}).select("-password");
        return res.status(200).json({ sellers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete Seller
const deleteSeller = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const deletedSeller = await sellerModel.findByIdAndDelete(sellerId);

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
        const seller = await sellerModel.findByIdAndUpdate(sellerId, { verified: true }, { new: true });

        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }

        return res.status(200).json({ message: "Seller approved successfully", seller });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Change User Role
const changeUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        if (!["user", "seller", "admin"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, { role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: `User role updated to ${role}`, user: updatedUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports={
    register,
    login,
    logout,
    profileView,
    forgotPassword,
    resetPassword,
    checkAdmin,
    getAllUsers,
    getAllSellers,
    deleteUser,
    deleteSeller,
    approveSeller,
    changeUserRole
}


