/*
const Valog=require('../Model/Logs/Valog.model');
const Vblog=require('../Model/Logs/Vblog.model');
const Vclog=require('../Model/Logs/Vclog.model');
const Ialog=require('../Model/Logs/Ialog.model');
const Iblog=require('../Model/Logs/Iblog.model');
const Iclog=require('../Model/Logs/Iclog.model');
const EnergySensor=require('../Model/sensor.model');


async function updateSensor(sensorid,sensorName,sensorValue){
    const sensor =await EnergySensor.findById(sensorid);
      try{
          if(sensor){

            if(sensor.sensorName!==sensorValue){
                //add the new value into sensor
                sensor.sensorName=sensorValue;
                
                 
                //---------------------------------create the logs (first-time)--------------
                
                //Va log creation
                if(sensor.Valogid === null || sensor.Valogid === undefined)
                {
                    const logVa=new Valog({
                        userid:userid,
                        Va:Va,
                        created_At:timeDate,
                        updated_At:null
                    });
                const logSaved   =await logVa.save();
                try{
                    if(logSaved){
                      console.log(`Valog is created`);  
                        //get the logid
                      const logid = logSaved._id;
                        // update the sensor Valogid
                        sensor.Valogid=logid;
                        //save the changes
                       const updated = await sensor.save();
                       try{
                        if(updated) {
                            console.log(`Valogid is updated`)
                           }
                           
                       }
                       catch(err){
                        res.status(400).json(`vblogid is not updated`);
                       }
                       
                      
                    }
                }
                catch(err){
                        res.status(400).json(`Valog is not created due to ${err}`);
                }
                   
                  
                    
                }
          }
      } 
      catch(err){
          console.log(err)
      }



}

module.exports=updateSensor;*/