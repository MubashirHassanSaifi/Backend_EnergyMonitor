const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Iclog=require('../../Model/Logs/Ic.model');

const update_Ic=async(sensorid,userid,Ic,res)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        if(sensor.Ic!==Ic){
            sensor.Ic=Ic;
            if(sensor.Iclogid=== null || sensor.Iclogid=== undefined)
            {
                const logIc=new Iclog({
                    userid:userid,
                    Ic:Ic,
                    created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                    updated_At:null
                });
            const logSaved   =await logIc.save();
            try{
                if(logSaved){
                  console.log(`Iclog is created`);  
                    //get the logid
                  const logid = logSaved._id;
                    // update the sensor Valogid
                    sensor.Iclogid=logid;
                    //save the changes
                   const updated = await sensor.save();
                   try{
                    if(updated) {
                        console.log(`Iclogid is updated`)
                       // res.status(200).json(`logs are created`)
                       }
                       
                   }
                   catch(err){
                    res.status(400).json(`Iclogid is not updated`);
                   }
                   
                  
                }
            }
            catch(err){
                    res.status(400).json(`Iclog is not created due to ${err}`);
            }
               
              
                
            }
            
            else{
                  
                const Iclogid= sensor.Iclogid;
          const IclogFound = await Iclog.findById(Iclogid);
        
          try{
              if(IclogFound){
               //Check the updatedAt   
               
                   //update the date
                   IclogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                 const updateLog =await IclogFound.save();
                   try{
                       if(updateLog)
                       console.log(`Iclog createdAt is updated`);
                   }
                   catch(err){
                       console.log(`Iclog updatedAt is not update due to ${err}`);

                   }
               
              }
              }
          catch(err){
             res.status(400).send(`Iclog not found due to ${err}`);
          }
       
           //add the new Vclog
           const newlogIc=new Iclog({
               userid:sensor.userid,
               Ic:Ic,
               created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
               updated_At:null
           });
       const newlogSaved   =await newlogIc.save();
       try{
           if(newlogSaved){
             console.log(`new Iclog is created`);  
               //get the logid
             const newlogid = newlogSaved._id;
               // update the sensor Valogid
               sensor.Iclogid=newlogid;
               //save the changes
              const updated = await sensor.save();
              try{
               if(updated) {
                   console.log(`new Iclogid is updated`)
                  }
                  
              }
              catch(err){
               res.status(400).json(`new Iclogid is not updated due to ${err}`);
              }
              
             
           }
       }
       catch(err){
               res.status(400).json(`new Iclog is not created due to ${err}`);
       }


           }           
                    }
                    
                    else{
                     
         
                        //when first time value is same but log is not created
            
                     if(sensor.Iclogid=== null || sensor.Iclogid=== undefined)
                     {
                         const logIc=new Iclog({
                             userid:userid,
                             Ic:Ic,
                             created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                             updated_At:null
                         });
                     const logSaved   =await logIc.save();
                     try{
                         if(logSaved){
                           console.log(`Iclog is created`);  
                             //get the logid
                           const logid = logSaved._id;
                             // update the sensor Valogid
                             sensor.Iclogid=logid;
                             //save the changes
                            const updated = await sensor.save();
                            try{
                             if(updated) {
                                 console.log(`Iclogid is updated`)
                                }
                                
                            }
                            catch(err){
                             res.status(400).json(`Iclogid is not updated`);
                            }
                            
                           
                         }
                     }
                     catch(err){
                             res.status(400).json(`Iclog is not created due to ${err}`);
                     }
                        
                       
                         
                     }
                     // if values are same and also the logs are created
                     else {
                       const logIc  =await Iclog.findById(sensor.Iclogid);
                          try{
                              if(logIc){
                                  
                                     logIc.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                     const logupdate  =await logIc.save();
                                     try{
                                         if(logupdate)
                                         console.log(`Iclog with same value is updated`);
                                         //res.status(200).json(`logs with same values are updated`);
                                     }
                                     catch(err){
                                          res.status(400).json(`Iclog with same value is not update due to ${err}`);
                                     }
            
                                  
                              }
                          }
                          catch(err){
                                 res.status(400).json(`Iclog is not create due to ${err}`);
                          }   
                          
                     }
             
                   
                                }

    }
    catch(err){
        console.log(`sensor is not found due to ${err}`)
    }
}
module.exports=update_Ic