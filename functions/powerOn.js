const downTime=require('../Model/systemDownTime.model');
const EnergySensor=require('../Model/sensor.model');
const moment =require('moment');

const ifPowerOn= async(sensorid)=>{
    try{
      
        const sensor  =await EnergySensor.findById(sensorid);
        if(sensor.isDown===true && sensor.downtimelgid!==null){
           sensor.isDown=false;
           await sensor.save();
           const logid  =sensor.downtimelgid;
           const logfound   =await downTime.findById(logid);
           logfound.systemDown_From=moment().format('MMMM Do YYYY, h:mm:ss a');
          await logfound.save();
         
        }
       }
     catch(err){
         console.log(`sensor is not found due to ${err}`)
     }
}
module.exports=ifPowerOn;