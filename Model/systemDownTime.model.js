const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const downTimeSchema= new Schema({
isDown:{type:Boolean , default:false},
systemDown_To:{type:String,default:null},
systemDown_From:{type:String,default:null}

},{timestamps:true});
let DownTimeLog=mongoose.model("DownTimeLog",downTimeSchema);

module.exports=DownTimeLog;