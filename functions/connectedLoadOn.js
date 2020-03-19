const EnergySensor=require('../Model/sensor.model');
const moment =require('moment');
const loadOffline=require('../Model/systemOfflineTime.model');

const onlineConnectedLoad= async(sensorid)=>{
    try{
      
        const sensor  =await EnergySensor.findById(sensorid);
        if(sensor.isOffline===true && sensor.offlinelgid!==null){
           sensor.isOffline=false;
           await sensor.save();
           const logid  =sensor.offlinelgid;
           const logfound   =await loadOffline.findById(logid);
           logfound.system_Offline_From=moment().format('MMMM Do YYYY, h:mm:ss a');
          await logfound.save();
         
        }
       }
     catch(err){
         console.log(`sensor is not found due to ${err}`)
     }
}

module.exports=onlineConnectedLoad;

