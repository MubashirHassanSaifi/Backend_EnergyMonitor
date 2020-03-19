const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const offlineTimeSchema= new Schema({
isOffline:{type:Boolean , default:false},
system_Offline_To:{type:String,default:null},
system_Offline_From:{type:String,default:null}

},{timestamps:true});
let loadOfflineLog=mongoose.model("loadOfflineLog",offlineTimeSchema);

module.exports=loadOfflineLog;