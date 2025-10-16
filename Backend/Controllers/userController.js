const User = require("../Models/userModel")
const { createToken } = require("../Utilities/generateToken");
const uploadToCloudinary = require("../Utilities/imageUpload");
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities")
const sendEmail = require("../Utilities/sendEmail");
const crypto = require('crypto');
//register or sign up
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
const userExist=await User.findOne({email})
if(userExist)
{
    return res.status(400).json({error:"User already exists"})

}

const hashedPassword=await hashPassword(password)
const newUser= new User({
    name,email,phone,password:hashedPassword
})
const saved= await newUser.save()
if(saved){
    const token=createToken(saved._id,"user")
    res.cookie("token",token,
      {
        httpOnly: true,   // Prevents client-side JavaScript from accessing it
       secure: process.env.NODE_ENV,   // Ensures cookie is only sent over HTTPS (remove in dev)
        sameSite: "Strict" // Helps with CSRF protection
        })
console.log(token)
    return res.status(200).json({message:`User  ${name} Created Successfully`})

}
}catch(err){
console.log(err)
res.status(err.status || 500).json({error:err.message || "Internal server error"})
}
}

//login

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password )
            {
                return res.status(400).json({error:"All fields are required "})
            }
            const userExist=await User.findOne({email})
if(!userExist)
{
    return res.status(400).json({error:"User does not exists"})

}
if (!userExist.active) {
  return res.status(403).json({ error: "Your account has been deactivated. Please contact support." });
}
const passwordMatch= await comparePassword(password,userExist.password)
console.log(passwordMatch)
if(!passwordMatch){
    return res.status(400).json({error:"Password does not match "})
}
const token=createToken(userExist._id,"user")
res.cookie("token",token,
  {
    httpOnly: true,   // Prevents client-side JavaScript from accessing it
    secure: process.env.NODE_ENV ,  // Ensures cookie is only sent over HTTPS (remove in dev)
    sameSite: "Strict" // Helps with CSRF protection
    })
return res.status(200).json({message :"user login successfull",userExist})
        }
catch(err){
    console.log(err)
    res.status(err.status || 500).json({error:err.message || "Internal server error"})
}
}


//logout

const logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "User logged out successfully"})
    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }
}

// profile view

const profileView=async(req,res)=>{
    try{
        console.log(req.user)
        const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.active) {
      return res.status(403).json({ error: "Your account is deactivated." });
  }
    return res.status(200).json(user );
    }
    catch(err){
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }

}
//profile edit


const profileEdit= async(req,res)=>{
    try {
        const userId = req.user;        
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
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser || !updatedUser.active) {
            return res.status(404).json({ error: "Your account is deactivated. You cannot update your profile." });
          }
          return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

    } catch (err) {
        console.log(err)
        return res.status(err.status || 500).json ({error:err.message || "Internal Server Error"})
    }
}

//profile deactivate
const profileDeactivate= async(req,res)=>{
    try {
        const userId = req.user;
        const deactivatedUser = await User.findByIdAndUpdate(userId, { active: false }, { new: true})
        if (!deactivatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.active) {
          return res.status(400).json({ error: "User is already deactivated." });
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (!user.active) {
      return res.status(403).json({ error: "Your account is deactivated. You cannot reset your password." });
  }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; 

    await user.save();

    const resetLink = `http://localhost:3000/api/v1/user/reset-password?token=${resetToken}`;

    await sendEmail(user.email, "Password Reset Request", `Click here to reset your password: ${resetLink}`);

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
  
      const user = await User.findOne({
        resetToken,
        resetTokenExpiry: { $gt: new Date()}, 
      });
     
  
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }
  
      user.password = await hashPassword(newPassword);
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
  
      await user.save();
  
      return res.status(200).json({ message: "Password reset successfully" });
  
    } catch (err) {
      console.error("Reset Password Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

//address update

const updateAddress = async (req, res) => {
  try {
    const { street, city, state, zip, country } = req.body;

    if (!street || !city || !state || !zip || !country) {
      return res.status(400).json({ error: "All address fields are required" });
    }

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address = { street, city, state, zip, country };
    await user.save();

    return res.status(200).json({ message: "Address updated successfully", address: user.address });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//check-user
const checkUser=async(req,res)=>{
  try {
    const user = await User.findById(req.user).select("-password");

    return res.status(200).json({
      message: "User Authorized",
      user,
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        return res.status(200).json({ data : users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



// Delete User
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

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
    profileEdit,
    profileDeactivate,
    forgotPassword,
    resetPassword,
    updateAddress,
    checkUser,
    getAllUsers,
    deleteUser

    
}