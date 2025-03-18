const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    title :{
        type :String,
        required :true,
        unique :true
    },
    description :{
        type :String,
        required :true,
    },
    price:{
        type :Number,
        required :true,
    },
    image :{
        type:String,
        required:true
    },
    //seller
    seller :{
        type:mongoose.Types.ObjectId,ref:"seller"
    },
    quantity :{
        type:Number,
        required:true
        
    },
    isApprove :{
        type:Boolean,
        default:false
    }
},{timestamps :true})

module.exports=new mongoose.model("Product",productSchema)