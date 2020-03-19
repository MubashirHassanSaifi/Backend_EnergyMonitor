 const ifPowerOff=require('../functions/powerOff');
 const ifPowerOn=require('../functions/powerOn');
 const onlineConnectedLoad=require('../functions/connectedLoadOn');
 const offlineConnectedLoad=require('../functions/connectedLoadOff');
 
 
 const notifications= async (sensorid,Va,Vb,Vc,Ia,Ib,Ic)=>{


    //phase Down alerts

if(Va===0){
    console.log("PhaseA is down")
}
if(Vb===0){
    console.log("PhaseB is down")
} 
if(Vc===0){
    console.log("PhaseC is down")
}
//---------------------------------------------------------

//Abnormal state alerts

if(Va===0 && Vb===0 && Vc!==0){
    console.log("Abnormal state")
} 
if(Va!==0 && Vb===0 && Vc===0){
    console.log("Abnormal state")
}
if(Va===0 && Vb!==0 && Vc===0){
    console.log("Abnormal state")
}

//------------------------------------------------------------

// Power faliure Alerts

if(Va===0 && Vb===0 && Vc===0 && Ia===0){
    console.log("Power is Failed");
    ifPowerOff(sensorid)
    
}//end of root if

else{
     console.log('power is back')   
     ifPowerOn(sensorid);
    }





//--------------------------------------------------------------

//Connection Alerts

if(Ia===0 && Ib===0 && Ic===0 && Va!==0 && Vb!==0 && Vc!==0)
{
    console.log("Connected load is offline")
    offlineConnectedLoad(sensorid);
}
else{
    console.log('connected load is online')
    onlineConnectedLoad(sensorid);
}
//----------------------------------------------------------------

//Unbalanced load alerts
if((Va-Vb)>30 || (Vb-Va)>30){
    console.log("Unbalanced Load  Due to Va and Vb");
}
if((Vb-Vc)>30 || (Vc-Vb)>30){
    console.log("Unbalanced Load Vb and Vc");
}
if((Vc-Va)>30 || (Va-Vc)>30){
    console.log("Unbalanced Load Vc and Va");
}



}

module.exports= notifications;