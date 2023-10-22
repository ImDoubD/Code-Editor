const express =  require('express')
const app = express()
const bodyP = require('body-parser')
const compiler = require('compilex')
const options = {stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.15",express.static("C:/Users/DUKE/OneDrive/Desktop/LEAP/codemirror-5.65.15"))
app.use("/styles.css",express.static("C:/Users/DUKE/OneDrive/Desktop/LEAP/styles.css"))
app.get("/",function(req,res){
    res.sendFile("C:/Users/DUKE/OneDrive/Desktop/LEAP/index.html")
})
app.post("/compile",function(req,res){
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try{
        if(lang=="Cpp"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:20000} }; // (uses g++ command to compile )
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                        return;
                    }
                    else{
                        res.send({output:"error"})
                        return;
                    }
                });
            }
            else{
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:20000} }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                        return;
                    }
                    else{
                        res.send({output:"error"})
                        return;
                    }
                    // res.send(data);
                });
            }
        }
        
        else if(lang=="Python"){
            if(!input){
                var envData = { OS : "windows"};  
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                    // res.send(data);
                });    
            }
            else{
                var envData = { OS : "windows"};  
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                    // res.send(data);        
                });
            }
        }
    }
    catch(e){
        console.log("error")
        return;
    }
})
app.listen(8000)