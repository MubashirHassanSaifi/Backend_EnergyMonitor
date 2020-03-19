const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Alog_schema=new Schema({
    userid:{type:String,required:true},
    A:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Alog=mongoose.model("Alog",Alog_schema);
module.exports=Alog;