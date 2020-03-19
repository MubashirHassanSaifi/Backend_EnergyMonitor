const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const PAlog_schema=new Schema({
    userid:{type:String,required:true},
    PA:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let PAlog=mongoose.model("PAlog",PAlog_schema);
module.exports=PAlog;