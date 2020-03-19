const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const PRlog=require('../../Model/Logs/PR.model');

const update_PR= async(sensorid,userid,PR,res)=>{
try{
    const sensor =await EnergySensor.findById(sensorid);
    if(sensor.PR!==PR){
        sensor.PR=PR;
        if(sensor.PRlogid=== null || sensor.PRlogid=== undefined)
        {
            const logPR=new PRlog({
                userid:userid,
                PR:PR,
                created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                updated_At:null
            });
        const logSaved   =await logPR.save();
        try{
            if(logSaved){
              console.log(`PRlog is created`);  
                //get the logid
              const logid = logSaved._id;
                // update the sensor Valogid
                sensor.PRlogid=logid;
                //save the changes
               const updated = await sensor.save();
               try{
                if(updated) {
                    console.log(`PRlogid is updated`)
                    
                   }
                   
               }
               catch(err){
                res.status(400).json(`PRlogid is not updated`);
               }
               
              
            }
        }
        catch(err){
                res.status(400).json(`PRlog is not created due to ${err}`);
        }
           
          
            
        }
        
        else{
              
            const PRlogid= sensor.PRlogid;
      const PRlogFound = await PRlog.findById(PRlogid);
    
      try{
          if(PRlogFound){
           //Check the updatedAt   
           
               //update the date
               PRlogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
             const updateLog =await PRlogFound.save();
               try{
                   if(updateLog)
                   console.log(`PRlog createdAt is updated`);
               }
               catch(err){
                   console.log(`PRlog updatedAt is not update due to ${err}`);
    
               }
           
          }
          }
      catch(err){
         res.status(400).send(`PRlog not found due to ${err}`);
      }
    
       //add the new Vclog
       const newlogPR=new PRlog({
           userid:sensor.userid,
           PR:PR,
           created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
           updated_At:null
       });
    const newlogSaved   =await newlogPR.save();
    try{
       if(newlogSaved){
         console.log(`new PRlog is created`);  
           //get the logid
         const newlogid = newlogSaved._id;
           // update the sensor Valogid
           sensor.PRlogid=newlogid;
           //save the changes
          const updated = await sensor.save();
          try{
           if(updated) {
               console.log(`new PRlogid is updated`)
              }
              
          }
          catch(err){
           res.status(400).json(`new PRlogid is not updated due to ${err}`);
          }
          
         
       }
    }
    catch(err){
           res.status(400).json(`new PRlog is not created due to ${err}`);
    }
    
    
       }           
                }
                
                else{
                 
     
                    //when first time value is same but log is not created
        
                 if(sensor.PRlogid=== null || sensor.PRlogid=== undefined)
                 {
                     const logPR=new PRlog({
                         userid:userid,
                         PR:PR,
                         created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                         updated_At:null
                     });
                 const logSaved   =await logPR.save();
                 try{
                     if(logSaved){
                       console.log(`PRlog is created`);  
                         //get the logid
                       const logid = logSaved._id;
                         // update the sensor Valogid
                         sensor.PRlogid=logid;
                         //save the changes
                        const updated = await sensor.save();
                        try{
                         if(updated) {
                             console.log(`PRlogid is updated`)
                            }
                            
                        }
                        catch(err){
                         res.status(400).json(`PRlogid is not updated`);
                        }
                        
                       
                     }
                 }
                 catch(err){
                         res.status(400).json(`PRlog is not created due to ${err}`);
                 }
                    
                   
                     
                 }
                 // if values are same and also the logs are created
                 else {
                   const logPR  =await PRlog.findById(sensor.PRlogid);
                      try{
                          if(logPR){
                              
                                 logPR.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                 const logupdate  =await logPR.save();
                                 try{
                                     if(logupdate)
                                     console.log(`PRlog with same value is updated`);
                                    // res.status(200).json(`logs with same values are updated`);
                                 }
                                 catch(err){
                                      res.status(400).json(`PRlog with same value is not update due to ${err}`);
                                 }
        
                              
                          }
                      }
                      catch(err){
                             res.status(400).json(`PRlog is not create due to ${err}`);
                      }   
                      
                 }
         
               
                            }
}
catch(err){
    console.log(`sensor is not found due to ${err}`)
}
}
module.exports=update_PR