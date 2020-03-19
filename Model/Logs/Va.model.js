
const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Valog_schema=new Schema({
    userid:{type:String,required:true},
    Va:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Valog=mongoose.model("Valog",Valog_schema);
module.exports=Valog;