const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const thresholeSchema= new Schema({
   type:{type:String},
   value:{type:Number},
   userid:{type:String, required:true},
   msg:{type:String},
   created_Date:{type:String},
   
},{timestamps:true})

let Alerts=mongoose.model('Alerts',thresholeSchema);
module.exports=Alerts;