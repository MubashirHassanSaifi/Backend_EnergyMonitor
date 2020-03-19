const mongoose=require('mongoose');
const Schema =mongoose.Schema;
 
const PRlog_schema=new Schema({
    userid:{type:String,required:true},
    PR:{type:Number,required:true},
    created_At:{type:String},
    updated_At:{type:String,default:null}
},{timestamps:true});
let PRlog=mongoose.model("PRlog",PRlog_schema);
module.exports=PRlog;