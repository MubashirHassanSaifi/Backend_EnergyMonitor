const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sensorSchema= new Schema({
userid:{type:String,required:true},
Va:{type:Number,default:0},
Vb:{type:Number,default:0},
Vc:{type:Number,default:0},
Ia:{type:Number,default:0},
Ib:{type:Number,default:0},
Ic:{type:Number,default:0},
Pf:{type:Number,default:0},
A:{type:Number,default:0},
B:{type:Number,default:0},
PA:{type:Number,default:0},
PR:{type:Number,default:0},
U:{type:Number,default:0},
//logs...........................
Valogid:{type:String,default:null},
Vblogid:{type:String,default:null},
Vclogid:{type:String,default:null},
Ialogid:{type:String,default:null},
Iblogid:{type:String,default:null},
Iclogid:{type:String,default:null},
Pflogid:{type:String,default:null},
Alogid:{type:String,default:null},
Blogid:{type:String,default:null},
PAlogid:{type:String,default:null},
PRlogid:{type:String,default:null},
Ulogid:{type:String,default:null},
downtimelgid:{type:String,default:null},
offlinelgid:{type:String,default:null},
//Thresholds...................
V_upperLmt:{type:Number,default:240},
V_lowerLmt:{type:Number,default:190},
I_upperLmt:{type:Number,default:95},
Pf_lowerLmt:{type:Number,default:0},
U_upperLmt:{type:Number,default:0},
isDown:{type:Boolean,default:false},
isOffline:{type:Boolean,default:false}
},


{timestamps:true});
let EnergySensor =mongoose.model('EnergySensor',sensorSchema);
module.exports =EnergySensor;

