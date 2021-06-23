//File name should Singular form of route-authors
const mongoose=require('mongoose')

const Schema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

// collection name-Author
module.exports=mongoose.model('Author',Schema)