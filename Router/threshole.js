const EnergySensor=require('../Model/sensor.model');
const router=require('express').Router();

// add  V_upper limit
router.route('/add_upper_V/:id').post(async (req,res)=>{
   const sensorid = req.params.id;
   const V_upperLmt=req.body.V_upperLmt;
   //checkUpperLimit(V_upperLimit);
 const sensor =await EnergySensor.findById(sensorid);
 try{
     if(sensor){
                 sensor.V_upperLmt=V_upperLmt;
                 const updateUpper_V  = await sensor.save();
                try{
                  if(updateUpper_V)
                  res.status(200).json(`V_upper Limit is set `)
                  }
                catch(err){
                  res.status(400).json(`V_upperlimit is not set  due to ${err}`)
              }

     }
 }
 catch(err){
     res.status(400).json(`sonsor is not found due to ${err}`)
 }
});

//------------------------------------------------------------------

// add  V_lower limit
router.route('/add_lower_V/:id').post(async (req,res)=>{
    const sensorid = req.params.id;
    const V_lowerLmt=req.body.V_lowerLmt;
    //checkUpperLimit(V_upperLimit);
  
  if(V_lowerLmt){
    console.log(V_lowerLmt);
    const sensor =await EnergySensor.findById(sensorid);
    try{
        if(sensor){
                    sensor.V_lowerLmt=V_lowerLmt;
                 const updateUpper_V  = await sensor.save();
                 try{
                   if(updateUpper_V)
                   res.status(200).json(`V_lower Limit is set `)
                 }
                 catch(err){
                     res.status(400).json(`V_lower limit is not set  due to ${err}`)
                 }
   
        }
    }
    catch(err){
        res.status(400).json(`sonsor is not found due to ${err}`)
    }  
}
else{
    res.status(400).json(` undefined value`);
}

  
 });
 
//-------------------------------------------------------------------------


// add Pf_lowerlimit

router.route('/add_lower_Pf/:id').post(async (req,res)=>{
    const sensorid = req.params.id;
    const Pf_lowerLmt=req.body.Pf_lowerLmt;
   
   if(Pf_lowerLmt){
                    //checkUpperLimit(V_upperLimit);
  const sensor =await EnergySensor.findById(sensorid);
  try{
      if(sensor){
                sensor.Pf_lowerLmt=Pf_lowerLmt;
               const updateUpper_V  = await sensor.save();
               try{
                 if(updateUpper_V)
                 res.status(200).json(`Pf_lower Limit is set `)
               }
               catch(err){
                   res.status(400).json(`Pf_lower limit is not set  due to ${err}`)
               }
 
      }
  }
  catch(err){
      res.status(400).json(`sonsor is not found due to ${err}`)
  }
   }
   else{
       res.status(400).json(`undefined Value`)
   }
    
 });
 //---------------------------------------------------------------------------
 
 // add  U_upper limit

 router.route('/add_upper_U/:id').post(async (req,res)=>{
    const sensorid = req.params.id;
    const U_upperLmt=req.body.U_upperLmt;
    //checkUpperLimit(V_upperLimit);
  const sensor =await EnergySensor.findById(sensorid);
  try{
      if(sensor){
                  sensor.U_upperLmt=U_upperLmt;
               const updateUpper_V  = await sensor.save();
               try{
                 if(updateUpper_V)
                 res.status(200).json(`U_upper Limit is set `)
               }
               catch(err){
                   res.status(400).json(`U_upper limit is not set  due to ${err}`)
               }
 
      }
  }
  catch(err){
      res.status(400).json(`sonsor is not found due to ${err}`)
  }
 });




module.exports=router;