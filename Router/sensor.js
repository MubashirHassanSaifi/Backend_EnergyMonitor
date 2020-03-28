const EnergySensor=require('../Model/sensor.model');
const router=require('express').Router();
const joi =require('@hapi/joi');
const notifications=require('../functions/alerts')
const checkThreshole=require('../functions/threshole')
const update_Va=require('../functions/sensor/Va_update');
const update_Vb=require('../functions/sensor/Vb_update');
const update_Vc=require('../functions/sensor/Vc_update');
const update_Ia=require('../functions/sensor/Ia_update');
const update_Ib=require('../functions/sensor/Ib_update');
const update_Ic=require('../functions/sensor/Ic_update');
const update_Pf=require('../functions/sensor/Pf_update');
const update_A=require('../functions/sensor/A_update');
const update_B=require('../functions/sensor/B_update');
const update_PA=require('../functions/sensor/PA_update');
const update_PR=require('../functions/sensor/PR_update');
const update_U=require('../functions/sensor/U_update');
//const updateSensor=require('../Router/updatelogs');
//const moment = require('moment');



//schema validation
const sensorSchema=joi.object({
   userid:joi.string().required(),
   Va:joi.number(),
   Vb:joi.number(),
   Vc:joi.number(),
   Ia:joi.number(),
   Ib:joi.number(),
   Ic:joi.number(),
   Pf:joi.number(),
   A:joi.number(),
   B:joi.number(),
   PA:joi.number(),
   PR:joi.number(),
   U:joi.number()
   
   });


//add sensors

router.route('/add').post(async (req,res)=>{
 //check the schema
      const {error}=await sensorSchema.validateAsync(req.body);
         if(error)
            return res.status(400).send(error.detail[0].message);

  //get values from user
     const userid=req.body.userid;
     const Va=req.body.voltage.Va;
     const Vb=req.body.voltage.Vb;
     const Vc=req.body.voltage.Vc;
     const Ia=req.body.current.Ia;
     const Ib=req.body.current.Ib;
     const Ic=req.body.current.Ic;
     const Pf=req.body.power.Pf;
     const A=req.body.power.A;
     const B=req.body.power.B;
     const PA=req.body.power.PA;
     const PR=req.body.power.PR;
     const U=req.body.power.U;

const sensor=new EnergySensor({
    userid:userid,
    Va:Va,
    Vb:Vb,
    Vc:Vc,
    Ia:Ia,
    Ib:Ib,
    Ic:Ic,
    Pf:Pf,
    A:A,
    B:B,
    PA:PA,
    PR:PR,
    U:U

}) 
   await sensor.save()
   .then((data)=>res.status(200).json(`sensor is add for this ${userid}`))
   .catch((err)=>res.status(400).json(`sorry sensor is not add ${err}`));
})

//get sensor data
router.route('/get').get(async(req,res)=>{
   await EnergySensor.find()
   .then((data)=>res.status(200).json({"Sensordata":data}))
   .catch((err)=>res.status(400).json(err));
});

//delete sensor
router.route('/delete/:id').delete(async(req,res)=>{
   const id =req.params.id;
    await EnergySensor.findByIdAndDelete(id)
    .then(()=>res.status(200).json(`sensor is deleted`))
    .catch((err)=>res.status(400).json(`sensor is not delte due to ${err}`));
});

//-----------------------------------------------updata sensor----------------------------------------------
router.route('/update/:id').post( async(req,res)=>{
      const sensorid=req.params.id;
      //const userid=req.body.userid;
      const Va=req.body.voltage.Va;
      const Vb=req.body.voltage.Vb;
      const Vc=req.body.voltage.Vc;
      const Ia=req.body.current.Ia;
      const Ib=req.body.current.Ib;
      const Ic=req.body.current.Ic;
      const Pf=req.body.power.Pf;
      const A=req.body.power.A;
      const B=req.body.power.B;
      const PA=req.body.power.PA;
      const PR=req.body.power.PR;
      const U=req.body.power.U;
      console.log(`Va = ${Va}`)
      //set local time and date
      let date=new Date();
      let newDate =date.toDateString();
      let time=date.toLocaleTimeString();
      let timeDate =newDate+ '  '+ time;

      //generate notifications 
      notifications(sensorid,Va,Vb,Vc,Ia,Ib,Ic);
      
      // thershole
    checkThreshole(sensorid,Va,Vb,Vc,Ia,Ib,Ic,Pf,U,timeDate);
    
    const sensor =await EnergySensor.findById(sensorid);
    const userid=sensor.userid;
    console.log(userid);
    
    //update Va
    
    update_Va(sensorid,userid,Va,res);

    //UPDATE Vb
    update_Vb(sensorid,userid,Vb,res);

    //update Vc
    update_Vc(sensorid,userid,Vc,res);

    //update Ia
    update_Ia(sensorid,userid,Ia,res);
    
    //update Ib
    update_Ib(sensorid,userid,Ib,res);

    //update Ic
    update_Ic(sensorid,userid,Ic,res);
    
    //update Pf
    update_Pf(sensorid,userid,Pf,res);

    //update A
    update_A(sensorid,userid,A,res);

    //update B
    update_B(sensorid,userid,B,res);

    //update PA
    update_PA(sensorid,userid,PA,res);

    //updata PR
    update_PR(sensorid,userid,PR,res);

    //updata U
    update_U(sensorid,userid,U,res);
    
   
       });

//-------------------------------------------Update sensor Ends-----------------------------------------------------

    


module.exports=router;