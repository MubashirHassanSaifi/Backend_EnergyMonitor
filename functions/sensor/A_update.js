const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Alog=require('../../Model/Logs/A.model');

const update_A=async( sensorid,userid,A,res)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        if(sensor.A!==A){
            sensor.A=A;
           
            if(sensor.Alogid=== null || sensor.Alogid=== undefined)
              {
                const logA=new Alog({
                      userid:userid,
                      A:A,
                      created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                      updated_At:null
              });
         const logSaved   =await logA.save();
     try{
         if(logSaved){
           console.log(`Alog is created`);  
             //get the logid
           const logid = logSaved._id;
             // update the sensor Valogid
             sensor.Alogid=logid;
             //save the changes
            const updated = await sensor.save();
            try{
             if(updated) {
                 console.log(`Alogid is updated`)
                 
                }
                
            }
            catch(err){
             res.status(400).json(`Alogid is not updated`);
            }
            
           
         }
     }
     catch(err){
             res.status(400).json(`Alog is not created due to ${err}`);
     }
        
       
         
     }
     
     else{
           
         const Alogid= sensor.Alogid;
   const AlogFound = await Alog.findById(Alogid);
 
   try{
       if(AlogFound){
        //Check the updatedAt   
        
            //update the date
            AlogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
          const updateLog =await AlogFound.save();
            try{
                if(updateLog)
                console.log(`Alog createdAt is updated`);
            }
            catch(err){
                console.log(`Alog updatedAt is not update due to ${err}`);
 
            }
        
       }
       }
   catch(err){
      res.status(400).send(`Alog not found due to ${err}`);
   }
 
    //add the new Vclog
    const newlogA=new Alog({
        userid:sensor.userid,
        A:A,
        created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
        updated_At:null
    });
 const newlogSaved   =await newlogA.save();
 try{
    if(newlogSaved){
      console.log(`new Alog is created`);  
        //get the logid
      const newlogid = newlogSaved._id;
        // update the sensor Valogid
        sensor.Alogid=newlogid;
        //save the changes
       const updated = await sensor.save();
       try{
        if(updated) {
            console.log(`new Alogid is updated`)
           }
           
       }
       catch(err){
        res.status(400).json(`new Alogid is not updated due to ${err}`);
       }
       
      
    }
 }
 catch(err){
        res.status(400).json(`new Alog is not created due to ${err}`);
 }
 
 
    }           
             }
             
             else{
              
    
                 //when first time value is same but log is not created
     
              if(sensor.Alogid=== null || sensor.Alogid=== undefined)
              {
                  const logA=new Alog({
                      userid:userid,
                      A:A,
                      created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                      updated_At:null
                  });
              const logSaved   =await logA.save();
              try{
                  if(logSaved){
                    console.log(`Alog is created`);  
                      //get the logid
                    const logid = logSaved._id;
                      // update the sensor Valogid
                      sensor.Alogid=logid;
                      //save the changes
                     const updated = await sensor.save();
                     try{
                      if(updated) {
                          console.log(`Alogid is updated`)
                         }
                         
                     }
                     catch(err){
                      res.status(400).json(`Alogid is not updated`);
                     }
                     
                    
                  }
              }
              catch(err){
                      res.status(400).json(`Alog is not created due to ${err}`);
              }
                 
                
                  
              }
              // if values are same and also the logs are created
              else {
                
                
                const logA  =await Alog.findById(sensor.Alogid);
         
                
                 
               
                try{
                       if(logA){
                           
                              logA.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                              const logupdate  =await logA.save();
                              try{
                                  if(logupdate)
                                  console.log(`Alog with same value is updated`);
                                  //res.status(200).json(`logs with same values are updated`);
                              }
                              catch(err){
                                   res.status(400).json(`Alog with same value is not update due to ${err}`);
                              }
     
                           
                       }
                   }
                   catch(err){
                          res.status(400).json(`Alog is not create due to ${err}`);
                   }   
                   
              }
      
            
                         }
 
 
    }
    catch(err)
    {
        console.log(`sensor is not found due to ${err}`)
    }

}
module.exports=update_A;