 const express = require('express');
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
 const path = require('path');
 const cors = require('cors');

 const app = express(); 

 const server = require('http').Server(app);
 const io = require('socket.io')(server);

 mongoose.connect('mongodb://localhost/27017',{
     useNewUrlParser: true,
 })

 app.use((req,res,next) => {
    req.io = io;

    next();
 });

 app.use(bodyParser.json()); // support json encoded bodies
 app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
  

 app.use(cors());

 app.use(require('./routes'));


 var porta = process.env.PORT || 8080;
 //server.listen(4444); 
 server.listen(porta);