
const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Vblog_schema=new Schema({
    userid:{type:String,required:true},
    Vb:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Vblog=mongoose.model("Vblog",Vblog_schema);
module.exports=Vblog;