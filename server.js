const express =require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const sensorRouter=require('./Router/sensor');
const logsRouter=require('./Router/logs');
const thresholeRouter=require('./Router/threshole');
const http=require('http');
const socketio=require('socket.io');

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
   //  Va event
   socket.on("Va",(bin)=>{
  console.log(bin)
   });
   // Vb event
   socket.on("Vb",(bin)=>{
       console.log(bin)
   });
   // Vc event
   socket.on("Vc",(bin)=>{
    console.log(bin)
});
// Ia event
socket.on("Ia",(bin)=>{
    console.log(bin)
});
// Ib event
socket.on("Ib",(bin)=>{
    console.log(bin)
});
// Ic event
socket.on("Ic",(bin)=>{
    console.log(bin)
});
// Pf event
socket.on("Pf",(bin)=>{
    console.log(bin)
});
// PA event
socket.on("PA",(bin)=>{
    console.log(bin)
});
// PR event
socket.on("PR",(bin)=>{
    console.log(bin)
});
// U event
socket.on("U",(bin)=>{
    console.log(bin)
});


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