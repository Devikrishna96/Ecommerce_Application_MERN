const mongoose= require('mongoose')
const adminSchema=new mongoose.Schema({
   
    email :{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
    },
   
    password :{
        type:String,
        required:true
    },
    
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'], 
        default: 'admin'
    },
    verified: {
        type: Boolean,
        default: false // Email verification status
    },
    adminEmailToken: {
        type: String, // Token for email verification
    },
    resetToken: {
        type: String, // Token for password reset
    },
    resetTokenExpiry: {
        type: Date, // Expiry time for password reset token
    },
    active: {
        type: Boolean,
        default: true // Soft delete (deactivation)
    },
    profilepic:{
        type:String,
        default :"https://www.shutterstock.com/image-vector/profile-default-avatar-icon-user-600nw-2463844171.jpg"
    }
},{timestamps:true})

module.exports=new mongoose.model('admin',adminSchema)