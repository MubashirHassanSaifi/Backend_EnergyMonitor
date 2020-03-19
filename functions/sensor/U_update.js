const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Ulog=require('../../Model/Logs/U.model');

const update_U=async(sensorid,userid,U,res)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        if(sensor.U!==U){
            sensor.U=U;
            if(sensor.Ulogid=== null || sensor.Ulogid=== undefined)
            {
                const logU=new Ulog({
                    userid:userid,
                    U:U,
                    created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                    updated_At:null
                });
            const logSaved   =await logU.save();
            try{
                if(logSaved){
                  console.log(`Ulog is created`);  
                    //get the logid
                  const logid = logSaved._id;
                    // update the sensor Valogid
                    sensor.Ulogid=logid;
                    //save the changes
                   const updated = await sensor.save();
                   try{
                    if(updated) {
                        console.log(`Ulogid is updated`)
                        res.status(200).json('logs are created');
                        
                       }
                       
                   }
                   catch(err){
                    res.status(400).json(`Ulogid is not updated`);
                   }
                   
                  
                }
            }
            catch(err){
                    res.status(400).json(`Ulog is not created due to ${err}`);
            }
               
              
                
            }
            
            else{
                  
                const Ulogid= sensor.Ulogid;
          const UlogFound = await Ulog.findById(Ulogid);
        
          try{
              if(UlogFound){
               //Check the updatedAt   
               
                   //update the date
                   UlogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                 const updateLog =await UlogFound.save();
                   try{
                       if(updateLog)
                       console.log(`Ulog createdAt is updated`);
                   }
                   catch(err){
                       console.log(`Ulog updatedAt is not update due to ${err}`);
        
                   }
               
              }
              }
          catch(err){
             res.status(400).send(`Ulog not found due to ${err}`);
          }
        
           //add the new Vclog
           const newlogU=new Ulog({
               userid:sensor.userid,
               U:U,
               created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
               updated_At:null
           });
        const newlogSaved   =await newlogU.save();
        try{
           if(newlogSaved){
             console.log(`new Ulog is created`);  
               //get the logid
             const newlogid = newlogSaved._id;
               // update the sensor Valogid
               sensor.Ulogid=newlogid;
               //save the changes
              const updated = await sensor.save();
              try{
               if(updated) {
                   console.log(`new Ulogid is updated`)
                   res.status(200).json('new logs are created')
                  }
                  
              }
              catch(err){
               res.status(400).json(`new Ulogid is not updated due to ${err}`);
              }
              
             
           }
        }
        catch(err){
               res.status(400).json(`new Ulog is not created due to ${err}`);
        }
        
        
           }           
                    }
                    
                    else{
                     
         
                        //when first time value is same but log is not created
            
                     if(sensor.Ulogid=== null || sensor.Ulogid=== undefined)
                     {
                         const logU=new Ulog({
                             userid:userid,
                             U:U,
                             created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                             updated_At:null
                         });
                     const logSaved   =await logU.save();
                     try{
                         if(logSaved){
                           console.log(`Ulog is created`);  
                             //get the logid
                           const logid = logSaved._id;
                             // update the sensor Valogid
                             sensor.Ulogid=logid;
                             //save the changes
                            const updated = await sensor.save();
                            try{
                             if(updated) {
                                 console.log(`Ulogid is updated`)
                                }
                                
                            }
                            catch(err){
                             res.status(400).json(`Ulogid is not updated`);
                            }
                            
                           
                         }
                     }
                     catch(err){
                             res.status(400).json(`Ulog is not created due to ${err}`);
                     }
                        
                       
                         
                     }
                     // if values are same and also the logs are created
                     else {
                       const logU  =await Ulog.findById(sensor.Ulogid);
                          try{
                              if(logU){
                                  
                                     logU.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                     const logupdate  =await logU.save();
                                     try{
                                         if(logupdate)
                                         console.log(`Ulog with same value is updated`);
                                        
                                         res.status(200).json(`logs with same values are updated`);
                                     }
                                     catch(err){
                                          res.status(400).json(`Ulog with same value is not update due to ${err}`);
                                     }
            
                                  
                              }
                          }
                          catch(err){
                                 res.status(400).json(`Ulog is not create due to ${err}`);
                          }   
                          
                     }
             
                   
                                }
        

    }
    catch(err){
 console.log(`sensor is not found due to ${err}`)
    }
}
module.exports=update_U