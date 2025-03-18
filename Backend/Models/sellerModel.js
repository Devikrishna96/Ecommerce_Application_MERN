const mongoose= require('mongoose')
const sellerSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address']

    },
    phone :{
        type:String,
        required:true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },
    password :{
        type:String,
        required:true
    },
    address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zip: { type: String, default: "" },
        country: { type: String, default: "" },
      },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'], 
        default: 'seller'
    },
    verified: {
        type: Boolean,
        default: false // Email verification status
    },
    sellerEmailToken: {
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
    },
    businessName: {
        type: String,
        trim: true,
      },
      businessLicense: {
        type: String, 
      },
},{timestamps:true})

module.exports=new mongoose.model('Seller',sellerSchema)