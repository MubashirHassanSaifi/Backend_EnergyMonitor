const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const PAlog=require('../../Model/Logs/PA.model');

const update_PA= async(sensorid,userid,PA,res)=>{
try{
    const sensor =await EnergySensor.findById(sensorid);
    if(sensor.PA!==PA){
        sensor.PA=PA;
        if(sensor.PAlogid=== null || sensor.PAlogid=== undefined)
        {
            const logPA=new PAlog({
                userid:userid,
                PA:PA,
                created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                updated_At:null
            });
        const logSaved   =await logPA.save();
        try{
            if(logSaved){
              console.log(`PAlog is created`);  
                //get the logid
              const logid = logSaved._id;
                // update the sensor Valogid
                sensor.PAlogid=logid;
                //save the changes
               const updated = await sensor.save();
               try{
                if(updated) {
                    console.log(`PAlogid is updated`)
                    
                   }
                   
               }
               catch(err){
                res.status(400).json(`PAlogid is not updated`);
               }
               
              
            }
        }
        catch(err){
                res.status(400).json(`PAlog is not created due to ${err}`);
        }
           
          
            
        }
        
        else{
              
            const PAlogid= sensor.PAlogid;
      const PAlogFound = await PAlog.findById(PAlogid);
    
      try{
          if(PAlogFound){
           //Check the updatedAt   
           
               //update the date
               PAlogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
             const updateLog =await PAlogFound.save();
               try{
                   if(updateLog)
                   console.log(`PAlog createdAt is updated`);
               }
               catch(err){
                   console.log(`PAlog updatedAt is not update due to ${err}`);
    
               }
           
          }
          }
      catch(err){
         res.status(400).send(`PAlog not found due to ${err}`);
      }
    
       //add the new Vclog
       const newlogPA=new PAlog({
           userid:sensor.userid,
           PA:PA,
           created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
           updated_At:null
       });
    const newlogSaved   =await newlogPA.save();
    try{
       if(newlogSaved){
         console.log(`new PAlog is created`);  
           //get the logid
         const newlogid = newlogSaved._id;
           // update the sensor Valogid
           sensor.PAlogid=newlogid;
           //save the changes
          const updated = await sensor.save();
          try{
           if(updated) {
               console.log(`new PAlogid is updated`)
              }
              
          }
          catch(err){
           res.status(400).json(`new PAlogid is not updated due to ${err}`);
          }
          
         
       }
    }
    catch(err){
           res.status(400).json(`new PAlog is not created due to ${err}`);
    }
    
    
       }           
                }
                
                else{
                 
     
                    //when first time value is same but log is not created
        
                 if(sensor.PAlogid=== null || sensor.PAlogid=== undefined)
                 {
                     const logPA=new PAlog({
                         userid:userid,
                         PA:PA,
                         created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                         updated_At:null
                     });
                 const logSaved   =await logPA.save();
                 try{
                     if(logSaved){
                       console.log(`PAlog is created`);  
                         //get the logid
                       const logid = logSaved._id;
                         // update the sensor Valogid
                         sensor.PAlogid=logid;
                         //save the changes
                        const updated = await sensor.save();
                        try{
                         if(updated) {
                             console.log(`PAlogid is updated`)
                            }
                            
                        }
                        catch(err){
                         res.status(400).json(`PAlogid is not updated`);
                        }
                        
                       
                     }
                 }
                 catch(err){
                         res.status(400).json(`PAlog is not created due to ${err}`);
                 }
                    
                   
                     
                 }
                 // if values are same and also the logs are created
                 else {
                   const logPA  =await PAlog.findById(sensor.PAlogid);
                      try{
                          if(logPA){
                              
                                 logPA.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                 const logupdate  =await logPA.save();
                                 try{
                                     if(logupdate)
                                     console.log(`PAlog with same value is updated`);
                                    // res.status(200).json(`logs with same values are updated`);
                                 }
                                 catch(err){
                                      res.status(400).json(`PAlog with same value is not update due to ${err}`);
                                 }
        
                              
                          }
                      }
                      catch(err){
                             res.status(400).json(`PAlog is not create due to ${err}`);
                      }   
                      
                 }
         
               
                            }
}
catch(err){

}
}
module.exports=update_PA