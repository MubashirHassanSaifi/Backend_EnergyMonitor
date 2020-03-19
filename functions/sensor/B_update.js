const EnergySensor=require('../../Model/sensor.model');
const moment =require('moment');
const Blog=require('../../Model/Logs/B.model');

const update_B=async(sensorid,userid,B,res)=>{
    try{
        const sensor =await EnergySensor.findById(sensorid);
        if(sensor.B!==B){
            sensor.B=B;
            if(sensor.Blogid=== null || sensor.Blogid=== undefined)
            {
                const logB=new Blog({
                    userid:userid,
                    B:B,
                    created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                    updated_At:null
                });
            const logSaved   =await logB.save();
            try{
                if(logSaved){
                  console.log(`Blog is created`);  
                    //get the logid
                  const logid = logSaved._id;
                    // update the sensor Valogid
                    sensor.Blogid=logid;
                    //save the changes
                   const updated = await sensor.save();
                   try{
                    if(updated) {
                        console.log(`Blogid is updated`)
                        
                       }
                       
                   }
                   catch(err){
                    res.status(400).json(`Blogid is not updated`);
                   }
                   
                  
                }
            }
            catch(err){
                    res.status(400).json(`Blog is not created due to ${err}`);
            }
               
              
                
            }
            
            else{
                  
                const Blogid= sensor.Blogid;
          const BlogFound = await Blog.findById(Blogid);
        
          try{
              if(BlogFound){
               //Check the updatedAt   
               
                   //update the date
                   BlogFound.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                 const updateLog =await BlogFound.save();
                   try{
                       if(updateLog)
                       console.log(`Blog createdAt is updated`);
                   }
                   catch(err){
                       console.log(`Blog updatedAt is not update due to ${err}`);
        
                   }
               
              }
              }
          catch(err){
             res.status(400).send(`Blog not found due to ${err}`);
          }
        
           //add the new Vclog
           const newlogB=new Blog({
               userid:sensor.userid,
               B:B,
               created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
               updated_At:null
           });
        const newlogSaved   =await newlogB.save();
        try{
           if(newlogSaved){
             console.log(`new Blog is created`);  
               //get the logid
             const newlogid = newlogSaved._id;
               // update the sensor Valogid
               sensor.Blogid=newlogid;
               //save the changes
              const updated = await sensor.save();
              try{
               if(updated) {
                   console.log(`new Blogid is updated`)
                  }
                  
              }
              catch(err){
               res.status(400).json(`new Blogid is not updated due to ${err}`);
              }
              
             
           }
        }
        catch(err){
               res.status(400).json(`new Blog is not created due to ${err}`);
        }
        
        
           }           
                    }
                    
                    else{
                     
         
                        //when first time value is same but log is not created
            
                     if(sensor.Blogid=== null || sensor.Blogid=== undefined)
                     {
                         const logB=new Blog({
                             userid:userid,
                             B:B,
                             created_At:moment().format('MMMM Do YYYY, h:mm:ss a'),
                             updated_At:null
                         });
                     const logSaved   =await logB.save();
                     try{
                         if(logSaved){
                           console.log(`Blog is created`);  
                             //get the logid
                           const logid = logSaved._id;
                             // update the sensor Valogid
                             sensor.Blogid=logid;
                             //save the changes
                            const updated = await sensor.save();
                            try{
                             if(updated) {
                                 console.log(`Blogid is updated`)
                                }
                                
                            }
                            catch(err){
                             res.status(400).json(`Blogid is not updated`);
                            }
                            
                           
                         }
                     }
                     catch(err){
                             res.status(400).json(`Blog is not created due to ${err}`);
                     }
                        
                       
                         
                     }
                     // if values are same and also the logs are created
                     else {
                       const logB  =await Blog.findById(sensor.Blogid);
                          try{
                              if(logB){
                                  
                                     logB.updated_At=moment().format('MMMM Do YYYY, h:mm:ss a');
                                     const logupdate  =await logB.save();
                                     try{
                                         if(logupdate)
                                         console.log(`Blog with same value is updated`);
                                         //res.status(200).json(`logs with same values are updated`);
                                     }
                                     catch(err){
                                          res.status(400).json(`Blog with same value is not update due to ${err}`);
                                     }
            
                                  
                              }
                          }
                          catch(err){
                                 res.status(400).json(`Blog is not create due to ${err}`);
                          }   
                          
                     }
             
                   
                                }
        
    }
    catch(err){
        console.log(`sensor is not found due to ${err}`)
    }

}
module.exports=update_B