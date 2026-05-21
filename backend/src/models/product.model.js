const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true 
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    brand:{
        type:String,
    },
    catagory:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:String,
        default:0
    },
 
} ,  {timestamps:true})


const productModel = mongoose.model('product',productSchema)

module.exports = productModel