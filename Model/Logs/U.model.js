const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Ulog_schema=new Schema({
    userid:{type:String,required:true},
    U:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Ulog=mongoose.model("Ulog",Ulog_schema);
module.exports=Ulog;