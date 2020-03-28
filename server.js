const express =require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const sensorRouter=require('./Router/sensor');
const logsRouter=require('./Router/logs');
const thresholeRouter=require('./Router/threshole');
const http=require('http');
const socketio=require('socket.io');
const axios=require('axios');

//create server object
const app =express();
const server =http.createServer(app).listen(8000);
const io =socketio(server);

io.on('connection',(socket)=>{
   console.log('A client is connected');
   
   socket.on('message',(status)=>{
   socket.broadcast.emit('dimming',status);
   console.log(status);
   });
   
   socket.emit('message','you are connected');
   
   socket.on("Values",async(data)=>{
   
    const config={
       headers:{
           'content-type':'application/json'
       }
   }
    
    // update data
   const id =data.sensor_id;
    
   axios.post(`http://localhost:5000/energysensor/update/${id}`,config,data);


       console.log(`Va = ${data.volage.Va}`);
       console.log(`Vb = ${data.volage.Vb}`);
       console.log(`Vc= ${data.volage.Vc}`);
       console.log(`Ia = ${data.current.Ia}`);
       console.log(`Ib = ${data.current.Ib}`);
       console.log(`Ic = ${data.current.Ic}`);
       console.log(`Pf = ${data.power.Pf}`);
       console.log(`PA = ${data.power.PA}`);
       console.log(`PR = ${data.power.PR}`);
       console.log(`U = ${data.power.U}`);
   })
   
   
   });


app.use(express.json());
app.use(cors());
app.use('/energysensor',sensorRouter);
app.use('/logs',logsRouter);
app.use('/threshole',thresholeRouter);

//database connectivity
const connectionString=process.env.CONNECTION_STRING;
mongoose.connect(connectionString,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{console.log(`MongoDB connection is established`)});



//port
const port = process.env.PORT||5001;
app.listen(port , console.log(`server is running on port ${port}`));