const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Iclog_schema=new Schema({
    userid:{type:String,required:true},
    Ic:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Iclog=mongoose.model("Iclog",Iclog_schema);
module.exports=Iclog;