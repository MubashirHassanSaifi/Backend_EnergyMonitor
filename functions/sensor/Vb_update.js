const EnergySensor=require('../../Model/sensor.model');
const Vblog=require('../../Model/Logs/Vb.model');
const moment =require('moment');


const update_Vb=async(sensorid,userid,Vb,res)=>{
  try{
    const sensor =await EnergySensor.findById(sensorid);
        if(sensor){
            if(sensor.Vb!==Vb){
                sensor.Vb=Vb;
                 //---------------------------------create the logs (first-time)--------------
                
                //Va log creation
                if(sensor.Vblogid=== null || sensor.Vblogid=== undefined)
                {
                    const logVb=new Vblog({
                        userid:userid,
                        Vb:Vb,
                        created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                        updated_At:null
                    });
                const logSaved   =await logVb.save();
                try{
                    if(logSaved){
                      console.log(`Vblog is created`);  
                        //get the logid
                      const logid = logSaved._id;
                        // update the sensor Valogid
                        sensor.Vblogid=logid;
                        //save the changes
                       const updated = await sensor.save();
                       try{
                        if(updated) {
                            console.log(`Vblogid is updated`)
                           }
                           
                       }
                       catch(err){
                        res.status(400).json(`vblogid is not updated`);
                       }
                       
                      
                    }
                }
                catch(err){
                        res.status(400).json(`Vblog is not created due to ${err}`);
                }
                   
                  
                    
                }
                else{
                    //check the Valog
                    const Vblogid= sensor.Vblogid;
              const VblogFound = await Vblog.findById(Vblogid);
            
              try{
                  if(VblogFound){
                   //Check the updatedAt   
                   
                       //update the date
                       VblogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                     const updateLog =await VblogFound.save();
                       try{
                           if(updateLog)
                           console.log(`Vblog createdAt is updated`);
                       }
                       catch(err){
                           console.log(`Vblog updatedAt is not update due to ${err}`);

                       }
                   
                  }
                  }
              catch(err){
                 res.status(400).send(`Vblog not found due to ${err}`);
              }
           
               //add the new Valog
               const newlogVb=new Vblog({
                   userid:sensor.userid,
                   Vb:Vb,
                   created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                   updated_At:null
               });
           const newlogSaved   =await newlogVb.save();
           try{
               if(newlogSaved){
                 console.log(`new Vblog is created`);  
                   //get the logid
                 const newlogid = newlogSaved._id;
                   // update the sensor Valogid
                   sensor.Vblogid=newlogid;
                   //save the changes
                  const updated = await sensor.save();
                  try{
                   if(updated) {
                       console.log(`new Vblogid is updated`)
                      }
                      
                  }
                  catch(err){
                   res.status(400).json(`new vblogid is not updated due to ${err}`);
                  }
                  
                 
               }
           }
           catch(err){
                   res.status(400).json(`new Vblog is not created due to ${err}`);
           }


               }

                }

                else{
                     
         
                    //when first time value is same but log is not created
        
                 if(sensor.Vblogid=== null || sensor.Vblogid=== undefined)
                 {
                     const logVb=new Vblog({
                         userid:userid,
                         Vb:Vb,
                         created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                         updated_At:null
                     });
                 const logSaved   =await logVb.save();
                 try{
                     if(logSaved){
                       console.log(`Vblog is created`);  
                         //get the logid
                       const logid = logSaved._id;
                         // update the sensor Valogid
                         sensor.Vblogid=logid;
                         //save the changes
                        const updated = await sensor.save();
                        try{
                         if(updated) {
                             console.log(`Vblogid is updated`)
                            }
                            
                        }
                        catch(err){
                         res.status(400).json(`vblogid is not updated`);
                        }
                        
                       
                     }
                 }
                 catch(err){
                         res.status(400).json(`Vblog is not created due to ${err}`);
                 }
                    
                   
                     
                 }
                 // if values are same and also the logs are created
                 else {
                   const logVb  =await Vblog.findById(sensor.Vblogid);
                      try{
                          if(logVb){
                              
                                 logVb.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                 const logupdate  =await logVb.save();
                                 try{
                                     if(logupdate)
                                     console.log(`Vblog with same value is updated`);
                                 }
                                 catch(err){
                                      res.status(400).json(`Vblog with same value is not update due to ${err}`);
                                 }
        
                              
                          }
                      }
                      catch(err){
                            res.status(400).json(`Vblog is not found due to ${err}`);
                      }   
                      
                 }
         
               
                            }

        }
  }
  catch(err){
      console.log(`sensor is not found due to ${err}`)
  }

           

              



                }
module.exports=update_Vb;