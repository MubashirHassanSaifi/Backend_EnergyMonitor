const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Pflog_schema=new Schema({
    userid:{type:String,required:true},
    Pf:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Pflog=mongoose.model("Pflog",Pflog_schema);
module.exports=Pflog;