const downTime=require('../Model/systemDownTime.model');
const EnergySensor=require('../Model/sensor.model');
const moment =require('moment');
const powerOffDurration=require('../functions/powerOfftime');

 const ifPowerOff=async(sensorid)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        //first time 
        if( sensor.downtimelgid===null){
             
            sensor.isDown=true;
            
            const systemDown= new downTime({
                isDown:true,
                systemDown_To:moment().format('MMMM Do YYYY, h:mm:ss a')
            })  
            try{
                const downTimeSave =await systemDown.save();
                   if(downTimeSave){
                        console.log('power failed log is created');
                        const logid= downTimeSave._id;
                        sensor.downtimelgid=logid;
                        await sensor.save();
                        
            
                   }
    }
               catch(err){
                   console.log(`system down time is not saved due to ${err}`);
               }
          } 
    //---------------------------------------------------
    //------2nd time and so on....
    
    
          
      if(sensor.isDown===true&& sensor.downtimelgid!==null){
                try {
               // sensor.isDown=true;    
                //await sensor.save();
                const id =sensor.downtimelgid;
                const logFound = await downTime.findById(id)
                    logFound.systemDown_From=moment().format('MMMM Do YYYY, h:mm:ss a')
                    await logFound.save();
                    console.log(`power is agian faild`);
                 
                   
                  }
                catch(err){
                    console.log(`downtime log is not found due to ${err}`)
                } 
                
              }
          
       //-----------------------------------------------------

          if(sensor.isDown===false && sensor.downtimelgid!==null){    
            sensor.isDown=true;
            const newlog= new downTime({
                    isDown:true,
                    systemDown_To:moment().format('MMMM Do YYYY, h:mm:ss a')
    
                })
               try{
                  const savedlog  =await newlog.save()
                  sensor.downtimelgid =savedlog._id;
                  await sensor.save()
                  console.log(`new log is created`);
               }
               catch(err){
                   console.log(`new log is not created due to ${err}`)
               }
                
    
    
        }
          
         
     }
      catch(err){
          console.log(`sensor is not found due to ${err}`);
      } 
        
//calculate total time

powerOffDurration(sensorid);


 }
  
 module.exports=ifPowerOff;