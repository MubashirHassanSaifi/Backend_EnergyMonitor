const router=require('express').Router();
const Valog=require('../Model/Logs/Va.model');
const Vblog=require('../Model/Logs/Vb.model');
const Vclog=require('../Model/Logs/Vc.model');
const Ialog=require('../Model/Logs/Ia.model');
const Iblog=require('../Model/Logs/Ib.model');
const Iclog=require('../Model/Logs/Ic.model');
const moment =require('moment');
const Pflog=require('../Model/Logs/Pf.model');
const Alog=require('../Model/Logs/A.model');
const Blog=require('../Model/Logs/B.model');
const PAlog=require('../Model/Logs/PA.model');
const PRlog=require('../Model/Logs/PR.model');
const Ulog=require('../Model/Logs/U.model');


router.route('/').post(async(req,res)=>{
    const sensor=req.body.sensor;
    let startDate=req.body.startDate;
    let endDate=req.body.endDate;
    startDate=moment(startDate).toISOString();
    endDate=moment(endDate).toISOString();
    
   
   console.log(startDate)

   //Va-----------------------------
     if(sensor==='Va'){
      
       const log =await Valog.find({createdAt: {$gte :startDate ,$lte:endDate}});
    console.log(log);
       try{
          if(log!==null ||log !==undefined){
       
       console.log(log);
       res.status(200).json(log);
            
          }
       }
       catch(err){
           res.status(400).send(`sorry Valog not found due to ${err}`)
       }
    
    }
//Vb-----------------------------
    if(sensor==='Vb'){
    const log = await Vblog.find({createdAt: {$gte :startDate ,$lte:endDate}});
    try{
      res.status(200).json(log);
    }
    catch(err){
           res.status(400).json(err);
    } 

    }
//Vc------------------------------
    if(sensor==='Vc'){
      const log = await Vclog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        res.status(200).json(log);
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
//Ia--------------------------------
    if(sensor==='Ia'){
      const log = await Ialog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        res.status(200).json(log);
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
//Ib--------------------------------
    if(sensor==='Ib'){
      const log = await Iblog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        res.status(200).json({
          Ic:log.Ic,
          userid:log.userid,
          created_At:log.created_At,
          updated_At:log.updated_At});
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
//Ic--------------------------------
    if(sensor==='Ic'){
      const log = await Iclog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
//Pf-------------------------------
    if(sensor==='Pf'){
      const log = await Pflog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
  //A------------------------------
    if(sensor==='A'){
      const log = await Alog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
    //B------------------------------
    if(sensor==='B'){
      const log = await Blog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
    //PA--------------------------------
    if(sensor==='PA'){
      const log = await PAlog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
    //PR---------------------------------
    if(sensor==='PR'){
      const log = await PRlog.find({createdAt: { $gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
    //u-----------------------------------
    if(sensor==='U'){
      const log = await Ulog.find({createdAt: {$gte :startDate ,$lte:endDate}});
      try{
        if(log)
        {
          console.log(log);
          res.status(200).send(log);
      }
        
      }
      catch(err){
             res.status(400).json(err);
      } 
    }
    


});
module.exports=router;