const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();

app.use(express.static('public'));


app.get('/',(req,res)=>{

res.sendFile(path.join(__dirname,'./public','fileuploader.html'));

});

app.use('/api/upload',router);

module.exports = app;