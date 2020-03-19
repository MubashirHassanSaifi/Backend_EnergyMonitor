const EnergySensor=require('../Model/sensor.model');
const moment =require('moment');
const loadOffline=require('../Model/systemOfflineTime.model');

 const offlineConnectedLoad= async(sensorid)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        //first time 
        
        if( sensor.offlinelgid===null){
             
            sensor.isOffline=true;
            
            const systemDown= new loadOffline({
                isOffline:true,
                system_Offline_To:moment().format('MMMM Do YYYY, h:mm:ss a')
            })  
            try{
                const downTimeSave =await systemDown.save();
                   if(downTimeSave){
                        console.log(' The log of offline connected load is created');
                        const logid= downTimeSave._id;
                        sensor.offlinelgid=logid;
                        await sensor.save();
                        
            
                   }
    }
               catch(err){
                   console.log(`The log of offline connected load is not create due to ${err}`);
               }
          } 
    //---------------------------------------------------
    //------2nd time and so on....
    
    
          
      else{
                try {
               
                const id =sensor.offlinelgid;
                const logFound = await loadOffline.findById(id)
                    logFound.system_Offline_From=moment().format('MMMM Do YYYY, h:mm:ss a')
                    await logFound.save();
                    console.log(`connected load is agian offline`);
                 
                   
                  }
                catch(err){
                    console.log(`The log of offline connected load is not found due to ${err}`)
                } 
                
              }
          
       //-----------------------------------------------------
       
          if(sensor.isOffline===false && sensor.offlinelgid!==null){    
            sensor.isOffline=true;
            const newlog= new loadOffline({
                isOffline:true,
                system_Offline_To:moment().format('MMMM Do YYYY, h:mm:ss a')
    
                })
               try{
                  const savedlog  =await newlog.save()
                  sensor.offlinelgid =savedlog._id;
                  await sensor.save()
                  console.log(` new log is created`);
               }
               catch(err){
                   console.log(`new log is not created due to ${err}`)
               }
                
    
    
        }
          
         
     }
      catch(err){
          console.log(`sensor is not found due to ${err}`);
      } 
}

module.exports=offlineConnectedLoad;
