const mongoose= require('mongoose')
const adminSchema=new mongoose.Schema({
   
    email :{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address']

    },
   
    password :{
        type:String,
        required:true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
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
        type: String,
        index:true // Token for email verification
    },
    resetToken: {
        type: String,
        index:true // Token for password reset
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

module.exports=new mongoose.model('Admin',adminSchema)