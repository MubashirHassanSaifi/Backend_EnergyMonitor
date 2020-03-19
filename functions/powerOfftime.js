const downTime=require('../Model/systemDownTime.model');
const EnergySensor=require('../Model/sensor.model');
const moment =require('moment');

const powerOffDuration= async(sensorid)=>{
    try{
    const sensor = await EnergySensor.findById(sensorid);
         const logid  =sensor.downtimelgid;
         const logFound =await downTime.findById(logid)
         let startTime=logFound.systemDown_To;
         let endTime=logFound.systemDown_From;
         startTime  = moment(startTime,'MMMM Do YYYY, h:mm:ss a');
         endTime    = moment(endTime,'MMMM Do YYYY, h:mm:ss a');
        // console.log(startTime);
         const totalTime=moment.duration(endTime.diff(startTime));
         
         const date =new Date(totalTime);
         
         //let sec=totalTime.asSeconds().toLocaleString();
         //let hour=totalTime.asHours().toLocaleString();
         //let min=totalTime.asMinutes().toLocaleString();
         console.log(`hours:{${date.getUTCHours()}},min:{${date.getUTCMinutes()}}}, sec:{${date.getUTCSeconds()}}`);
    }
    catch(err){
        console.log(`sensor is not found due to ${err}`)
    }

}
module.exports=powerOffDuration;