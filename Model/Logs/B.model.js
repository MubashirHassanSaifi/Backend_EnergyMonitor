const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Blog_schema=new Schema({
    userid:{type:String,required:true},
    B:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Blog=mongoose.model("Blog",Blog_schema);
module.exports=Blog;