const process = require('process');
const app = require('./app');

const port = process.env.PORT || 7000;


const server = app.listen(port , (req,res)=>{

    console.log(`Connected to port ${port}`);
    
    });


    process.on('SIGTERM',()=>{


server.close(()=>{
    console.log('Process terminated');
})

    })


   // https://dexfileuploader.herokuapp.com/