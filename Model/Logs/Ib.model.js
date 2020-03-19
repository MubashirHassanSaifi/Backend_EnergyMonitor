const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const Iblog_schema=new Schema({
    userid:{type:String,required:true},
    Ib:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let Iblog=mongoose.model("Iblog",Iblog_schema);
module.exports=Iblog;