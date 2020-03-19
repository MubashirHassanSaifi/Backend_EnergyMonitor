const EnergySensor=require('../Model/sensor.model');
//const router=require('express').Router();
const Alerts=require('../Model/threshol.model');
const moment =require('moment');



const checkThreshole= async(sensorid,Va,Vb,Vc,Ia,Ib,Ic,Pf,A,B,PA,PR,U)=>{
      const sensor  =await EnergySensor.findById(sensorid)
     try{
         if(sensor){
           const userid=sensor.userid;
            const upperLmt  =sensor.V_upperLmt;
           const lowerLmt  =sensor.V_lowerLmt;
           const I_upperLmt=sensor.I_upperLmt;
           const Pf_lowerLmt=sensor.Pf_lowerLmt;
           const U_upperLmt=sensor.U_upperLmt;
           
           
           //--------upper Voltagers---------------------------------------------
           if(Va>upperLmt){
               const msg=` phase Voltages Va:{${Va}}  exceeding above his upperlimit {${upperLmt}}`;
            console.log(msg )
                   const alerts= new Alerts({
                      userid:userid,
                      msg:msg,
                      created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                   })           
                  const alertSave =alerts.save();
                  try{
                      if(alertSave){
                          console.log('alerts log is saved')
                      }
                  }
                  catch(err){
                    console.log(`alerts log is not saved due to ${err}`);
                  }
            
            }


            if(Vb>upperLmt ){
                const msg=` phase Voltages Va:{${Vb}}  exceeding above his upperlimit {${upperLmt}}`;
            console.log(msg )
                   const alerts= new Alerts({
                      userid:userid,
                      msg:msg,
                      created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                   })           
                  const alertSave =alerts.save();
                  try{
                      if(alertSave){
                          console.log('alerts log is saved')
                      }
                  }
                  catch(err){
                    console.log(`alerts log is not saved due to ${err}`);
                  }
               
                
                }

           
           
           
                if(Vc>upperLmt ){
                    const msg=` phase Voltages Va:{${Vc}}  exceeding above his upperlimit {${upperLmt}}`;
            console.log(msg )
                   const alerts= new Alerts({
                      userid:userid,
                      msg:msg,
                      created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                   })           
                  const alertSave =alerts.save();
                  try{
                      if(alertSave){
                          console.log('alerts log is saved')
                      }
                  }
                  catch(err){
                    console.log(`alerts log is not saved due to ${err}`);
                  }
                   
                   
                   
                
                    }
//-----------------------------------------------------------------------------------

//----------------------lower voltages-----------------------------------------------
            if(Va<lowerLmt){
                const msg=` phase Voltages Va:{${Va}} decreasing below his lowerlimit {${lowerLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }         
                
            }

            if(Vb<lowerLmt){
                const msg=` phase Voltages Vb:{${Vb}} decreasing below his lowerlimit {${lowerLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }   
               
           
                
            }
            if(Vc<lowerLmt ){
                const msg=` phase Voltages Va:{${Vc}} decreasing below his lower limit {${lowerLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }        
           
           
                
            }
//------------------------------------------------------------------------------------------

//-------------------upper current-------------------------------------------------------------
            if(Ia>I_upperLmt){
                console.log(I_upperLmt);
                const msg=` phase Voltages Ia:{${Ia}} exceeding above his upperlimit {${I_upperLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }   

            }

            if(Ib>I_upperLmt){
                const msg=` phase current Ib:{${Ib}} exceeding above his upperlimit {${I_upperLmt}}`;
                console.log(msg)
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }   
            }

            if(Ic>I_upperLmt){
                const msg=` phase current  Ic:{${Ic}} exceeding above upperlimit {${I_upperLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }   
            }
//----------------------------------------------------------------------------------------------

//------------------------lower Pf---------------------------------------------------------

            if(Pf<Pf_lowerLmt){
                const msg=` Power Factor Pf:{${Pf}} decreasing below his lowerlimit {${Pf_lowerLmt}}`;
                console.log(msg )
                       const alerts= new Alerts({
                          userid:userid,
                          msg:msg,
                          created_Date:moment().format('MMMM Do YYYY, h:mm:ss a')
                       })           
                      const alertSave =alerts.save();
                      try{
                          if(alertSave){
                              console.log('alerts log is saved')
                          }
                      }
                      catch(err){
                        console.log(`alerts log is not saved due to ${err}`);
                      }   
            }
//---------------------------------------------------------------------------------------------
//---------------------------Units-----------------------------------------------------

            if(U>U_upperLmt)
            {
                console.log(` units U:{${U}}  decreasing below {${Pf_lowerLmt}}`);

            }
//------------------------------------------------------------------------------------------------
            
         
        }
     }
     catch(err){
            console.log(`sensor is not found due to ${err}`);
     }
     
    }




module.exports=checkThreshole;