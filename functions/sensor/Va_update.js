const EnergySensor=require('../../Model/sensor.model');
const Valog=require('../../Model/Logs/Va.model');
const moment =require('moment');

const update_Va=async(sensorid,userid,Va,res)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        if(sensor){
            
            if(sensor.Va!==Va){
                //add the new value into sensor
                sensor.Va=Va;
               
                 
                //---------------------------------create the logs (first-time)--------------
                
                //Va log creation
                if(sensor.Valogid=== null || sensor.Valogid=== undefined)
                {
                    console.log(Va)
                    const logVa=new Valog({
                        userid:userid,
                        Va:Va,
                        created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                        updated_At:null
                    });
                    let logSaved;
                    try{  logSaved   =await logVa.save();}
                    catch(err){
                        console.log(err);
                    }
               
               
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
                else{
                    //check the Valog
                    const Valogid= sensor.Valogid;
              const ValogFound = await Valog.findById(Valogid);
            
              try{
                  if(ValogFound){
                   //Check the updatedAt   
                   
                       //update the date
                       ValogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                     const updateLog =await ValogFound.save();
                       try{
                           if(updateLog)
                           console.log(`Valog createdAt is updated`);
                       }
                       catch(err){
                           console.log(`Valog updatedAt is not update due to ${err}`);
        
                       }
                   
                  }
                  }
              catch(err){
                 res.status(400).send(`Valog not found due to ${err}`);
              }
           
               //add the new Valog
               const newlogVa=new Valog({
                   userid:sensor.userid,
                   Va:Va,
                   created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                   updated_At:null
               });
           const newlogSaved   =await newlogVa.save();
           try{
               if(newlogSaved){
                 console.log(`new Valog is created`);  
                   //get the logid
                 const newlogid = newlogSaved._id;
                   // update the sensor Valogid
                   sensor.Valogid=newlogid;
                   //save the changes
                  const updated = await sensor.save();
                  try{
                   if(updated) {
                       console.log(`new Valogid is updated`)
                      }
                      
                  }
                  catch(err){
                   res.status(400).json(`new valogid is not updated due to ${err}`);
                  }
                  
                 
               }
           }
           catch(err){
                   res.status(400).json(`new Valog is not created due to ${err}`);
           }
        
        
               }
        }


 //if values are same
  else if(sensor.Va===Va){
    //when first time value is same but log is not created

 if(sensor.Valogid=== null || sensor.Valogid=== undefined)
 {
     const logVa=new Valog({
         userid:userid,
         Va:Va,
         created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
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
 else {
   const logVa  =await Valog.findById(sensor.Valogid);
      try{
          if(logVa){
              
                 logVa.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                 const logupdate  =await logVa.save();
                 try{
                     if(logupdate)
                     console.log(`Valog with same value is updated`);
                 }
                 catch(err){
                      res.status(400).json(`Valog with same date is not update due to ${err}`);
                 }

              
          }
      }
      catch(err){
             res.status(400).json(`logVa is not found due to ${err}`);                  
      }   
      
 }

}
        
        
        
        }//sensor
    }
    catch(err){
        console.log(`sensor is not found due to ${err}`)
    }
    
    
    


}

module.exports=update_Va;
