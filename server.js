const express = require('express');
const os = require('os');

// import the cluster modules 

const cluster = require('cluster');
const port = process.env.port||3000;


// this gives the total number of  the  cpu  present in my laptop 
const cpuNums = os.cpus().length;


 if(cluster.isPrimary){
    for(let i = 0; i<cpuNums;i++){
        cluster.fork();
        // bascially ye process ka copy banayega 
        
    }

    // if a process is dead or we can say crashed then create a new process 

    cluster.on('exit',()=>{
        cluster.fork();

    });

    }else{

    const app = express();

    app.get('/',(req,res)=>{
         let esult = 0 ;
       for(let i=0;i<10000; i++){

         result+=i;
       }
       
       res.json({porcessId:process.pid,result});
    })

    app.listen(port,()=>{
        console.log(  `server is listening on port ${port} process id ${process.pid}`);
    });
}