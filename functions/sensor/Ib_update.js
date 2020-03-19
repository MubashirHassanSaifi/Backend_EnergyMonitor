const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Iblog=require('../../Model/Logs/Ib.model');

const update_Ib=async(sensorid,userid,Ib,res)=>{
try{
    const sensor =await EnergySensor.findById(sensorid);
    if(sensor.Ib!==Ib){
        sensor.Ib=Ib;
             //Va log creation
             if(sensor.Iblogid=== null || sensor.Iblogid=== undefined)
             {
                 const logIb=new Iblog({
                     userid:userid,
                     Ib:Ib,
                     created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                     updated_At:null
                 });
             const logSaved   =await logIb.save();
             try{
                 if(logSaved){
                   console.log(`Iblog is created`);  
                     //get the logid
                   const logid = logSaved._id;
                     // update the sensor Valogid
                     sensor.Iblogid=logid;
                     //save the changes
                    const updated = await sensor.save();
                    try{
                     if(updated) {
                         console.log(`Iblogid is updated`)
                        }
                        
                    }
                    catch(err){
                     res.status(400).json(`Iblogid is not updated`);
                    }
                    
                   
                 }
             }
             catch(err){
                     res.status(400).json(`Iblog is not created due to ${err}`);
             }
                
               
                 
             }
             
             else{
                   
                 const Iblogid= sensor.Iblogid;
           const IblogFound = await Iblog.findById(Iblogid);
         
           try{
               if(IblogFound){
                //Check the updatedAt   
                
                    //update the date
                    IblogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                  const updateLog =await IblogFound.save();
                    try{
                        if(updateLog)
                        console.log(`Iblog createdAt is updated`);
                    }
                    catch(err){
                        console.log(`Iblog updatedAt is not update due to ${err}`);

                    }
                
               }
               }
           catch(err){
              res.status(400).send(`Iblog not found due to ${err}`);
           }
        
            //add the new Vclog
            const newlogIb=new Iblog({
                userid:sensor.userid,
                Ib:Ib,
                created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                updated_At:null
            });
        const newlogSaved   =await newlogIb.save();
        try{
            if(newlogSaved){
              console.log(`new Iblog is created`);  
                //get the logid
              const newlogid = newlogSaved._id;
                // update the sensor Valogid
                sensor.Iblogid=newlogid;
                //save the changes
               const updated = await sensor.save();
               try{
                if(updated) {
                    console.log(`new Iblogid is updated`)
                   }
                   
               }
               catch(err){
                res.status(400).json(`new Iblogid is not updated due to ${err}`);
               }
               
              
            }
        }
        catch(err){
                res.status(400).json(`new Iblog is not created due to ${err}`);
        }


            }           
    } 
                
    else{
                 
     
        //when first time value is same but log is not created

     if(sensor.Iblogid=== null || sensor.Iblogid=== undefined)
     {
         const logIb=new Iblog({
             userid:userid,
             Ib:Ib,
             created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
             updated_At:null
         });
     const logSaved   =await logIb.save();
     try{
         if(logSaved){
           console.log(`Iblog is created`);  
             //get the logid
           const logid = logSaved._id;
             // update the sensor Valogid
             sensor.Iblogid=logid;
             //save the changes
            const updated = await sensor.save();
            try{
             if(updated) {
                 console.log(`Iblogid is updated`)
                }
                
            }
            catch(err){
             res.status(400).json(`Iblogid is not updated`);
            }
            
           
         }
     }
     catch(err){
             res.status(400).json(`Iblog is not created due to ${err}`);
     }
        
       
         
     }
     // if values are same and also the logs are created
     else {
       const logIb  =await Iblog.findById(sensor.Iblogid);
          try{
              if(logIb){
                  
                     logIb.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                     const logupdate  =await logIb.save();
                     try{
                         if(logupdate)
                         console.log(`Iblog with same value is updated`);
                     }
                     catch(err){
                          res.status(400).json(`Iblog with same value is not update due to ${err}`);
                     }

                  
              }
          }
          catch(err){
                 res.status(400).json(`Iblog is not create due to ${err}`);
          }   
          
     }

   
                }


}
catch(err){
    console.log(`sensor is not found due to ${err}`)
}
}
module.exports=update_Ib;