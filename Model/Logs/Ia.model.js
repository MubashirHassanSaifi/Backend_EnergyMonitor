
const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Ialog_schema=new Schema({
    userid:{type:String,required:true},
    Ia:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Ialog=mongoose.model("Ialog",Ialog_schema);
module.exports=Ialog;