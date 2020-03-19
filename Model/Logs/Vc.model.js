
const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Vclog_schema=new Schema({
    userid:{type:String,required:true},
    Vc:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Vclog=mongoose.model("Vclog",Vclog_schema);
module.exports=Vclog;