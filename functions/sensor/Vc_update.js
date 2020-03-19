const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Vclog=require('../../Model/Logs/Vc.model');

const update_Vc= async(sensorid,userid,Vc,res)=>{
  try{ 
    const sensor =await EnergySensor.findById(sensorid);
        if(sensor){
            if(sensor.Vc!==Vc){
                sensor.Vc=Vc;
                    //---------------------------------create the logs (first-time)--------------
                  
                    if(sensor.Vclogid=== null || sensor.Vclogid=== undefined)
                    {
                        const logVc=new Vclog({
                            userid:userid,
                            Vc:Vc,
                            created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                            updated_At:null
                        });
                    const logSaved   =await logVc.save();
                    try{
                        if(logSaved){
                          console.log(`Vclog is created`);  
                            //get the logid
                          const logid = logSaved._id;
                            // update the sensor Valogid
                            sensor.Vclogid=logid;
                            //save the changes
                           const updated = await sensor.save();
                           try{
                            if(updated) {
                                console.log(`Vclogid is updated`)
                               }
                               
                           }
                           catch(err){
                            res.status(400).json(`Vclogid is not updated`);
                           }
                           
                          
                        }
                    }
                    catch(err){
                            res.status(400).json(`Vclog is not created due to ${err}`);
                    }
                       
                      
                        
                    }
                    
                    else{
                          
                        const Vclogid= sensor.Vclogid;
                  const VclogFound = await Vclog.findById(Vclogid);
                
                  try{
                      if(VclogFound){
                       //Check the updatedAt   
                       
                           //update the date
                           VclogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                         const updateLog =await VclogFound.save();
                           try{
                               if(updateLog)
                               console.log(`Vclog createdAt is updated`);
                           }
                           catch(err){
                               console.log(`Vclog updatedAt is not update due to ${err}`);
    
                           }
                       
                      }
                      }
                  catch(err){
                     res.status(400).send(`Vclog not found due to ${err}`);
                  }
               
                   //add the new Vclog
                   const newlogVc=new Vclog({
                       userid:sensor.userid,
                       Vc:Vc,
                       created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                       updated_At:null
                   });
               const newlogSaved   =await newlogVc.save();
               try{
                   if(newlogSaved){
                     console.log(`new Vclog is created`);  
                       //get the logid
                     const newlogid = newlogSaved._id;
                       // update the sensor Valogid
                       sensor.Vclogid=newlogid;
                       //save the changes
                      const updated = await sensor.save();
                      try{
                       if(updated) {
                           console.log(`new Vclogid is updated`)
                          }
                          
                      }
                      catch(err){
                       res.status(400).json(`new Vclogid is not updated due to ${err}`);
                      }
                      
                     
                   }
               }
               catch(err){
                       res.status(400).json(`new Vclog is not created due to ${err}`);
               }
    
    
                   }
    
                        
            
            }
            
            else{
                         
             
                //when first time value is same but log is not created
    
             if(sensor.Vclogid=== null || sensor.Vclogid=== undefined)
             {
                 const logVc=new Vclog({
                     userid:userid,
                     Vc:Vc,
                     created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                     updated_At:null
                 });
             const logSaved   =await logVc.save();
             try{
                 if(logSaved){
                   console.log(`Vclog is created`);  
                     //get the logid
                   const logid = logSaved._id;
                     // update the sensor Valogid
                     sensor.Vclogid=logid;
                     //save the changes
                    const updated = await sensor.save();
                    try{
                     if(updated) {
                         console.log(`Vclogid is updated`)
                        }
                        
                    }
                    catch(err){
                     res.status(400).json(`Vclogid is not updated`);
                    }
                    
                   
                 }
             }
             catch(err){
                     res.status(400).json(`Vclog is not created due to ${err}`);
             }
                
               
                 
             }
             // if values are same and also the logs are created
             else {
               const logVc  =await Vclog.findById(sensor.Vclogid);
                  try{
                      if(logVc){
                          
                             logVc.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                             const logupdate  =await logVc.save();
                             try{
                                 if(logupdate)
                                 console.log(`Vclog with same value is updated`);
                             }
                             catch(err){
                                  res.status(400).json(`Vclog with same value is not update due to ${err}`);
                             }
    
                          
                      }
                  }
                  catch(err){
                         res.status(400).json(`Vclog is not create due to ${err}`);
                  }   
                  
             }
     
           
                        }
    
        }

  }
  catch(err){
      console.log(`senor is not found due to ${err}`);
  }

}
module.exports=update_Vc;