const express = require("express");
const router = new express.Router();
const mongoose = require('mongoose');
const validator = require("validator");
const Device_Info = require("../models/AddDevicesSchema")
const Device_Type = require("../models/DeviceTypesSchema")
const Parameter = require("../models/parametersSchema")
var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/DeviceRecord";



router.post("/addDevice", async (req,res)=>{
    try{

      function leftFillNum(num, targetLength) {
        return num.toString().padStart(targetLength, 0);
    }

      
      const param_body = Object.keys(req.body.parameters)
      //console.log(param_body)
      const device_name = req.body.device_name
      // const param = await Parameter.find({device_name:req.body.device_name},{unit:0,device_name:0,Date:0,_id:0})
        //console.log(param.length)
        const adddeviceData = await Device_Type.findOne({device_name:device_name})
        // console.log(adddeviceData);

        var result= []
            const param = await Parameter.find({device_name:req.body.device_name},{unit:0,device_name:0,Date:0,_id:0})
            param.forEach(function(u) { result.push(u.parameters) })
    
        
        // console.log(typeof subset)
        // console.log(result)
        // console.log(param_body)
        // console.log(typeof(result))
        // console.log(typeof(param_body))
            
        function checkSubset(p1,p2){
          
          if(typeof(p2)=='object'&& p2.every(val => p1.includes(val))){
            return true ;
          }else if(typeof(p2)=='string' && p1.includes(p2)){
            return true

          }
          else{
            return false
          }
        }
        // console.log(checkSubset(result,param_body))
        
      
        if(!adddeviceData )
        {
          return res.status(404).json({message:"Device name doesn't exist,Please add device in db, before device registration"})
        }

        else if(!checkSubset(result,param_body))
        {
          return res.status(404).json({message:"Please add parameter in the db before device registration",
                                      hint:"provide exact parameter name in the key value form {'parameter':'default value'}"})
          
        }
        // else if(checksubset(result,param_body)=='false')
        // {
        //   return res.status(404).json({message:"Please add missing parameters before device registration"})
          
        // }
            
        
        
        else{
            
            myCount = await Device_Info.find({device_id:{$regex:new RegExp(device_name, "i")}
             }).count()
            const add_device = new Device_Info({
              device_id : req.body.device_name + leftFillNum(myCount ,5),            
              serial_no : new Date().toISOString().substr(0, 7).replace('-', '')+req.body.device_name+leftFillNum(myCount ,3), 

              location : req.body.location,
              parameters: req.body.parameters
            })
            
           
              const device_count = await Device_Info.find({device_id:{$regex:new RegExp(device_name, "i")}
            }).count()
            // console.log(device_count)
            
            
            
           // console.log(device_count)
            add_device.save().then(()=>{
              


            res.status(201).json({

              "device_id":add_device.device_id,
              "serial_number" : add_device.serial_no,
              "location" : add_device.location,
              "parameters" : add_device.parameters
            })
            



            mongoose.connect(url,{
            useCreateIndex:true,
             useNewUrlParser:true,
             useUnifiedTopology:true
              }).then(() => {
               console.log("connection is succesful");
              }).catch((e) => {
              console.log("No connection");
                })

            
            mongoose.connect(url, {useNewUrlParser: true});


            deviceSchema = new mongoose.Schema(
              
            { 
              server_time: {type: Date,default: Date.now} ,
              client_time : {type : Date },
              device_name : { type : String }
              
            },
            {strict:false,versionKey:false}
            )
            //device_param,
            
            //
            
            //var id = add_device.device_id
            var Mymodel = mongoose.model(add_device.device_id,deviceSchema,add_device.device_id );
            clientTime ={"client_time":"0"}
            //var arr = add_device.pa
            var a =add_device.parameters
            var id = add_device.device_id
            
            var device_name = {"device_name":id}
            
            //console.log(a[0])
            var d = Object.assign({}, device_name, a[0],clientTime)
            var dic = {...device_name, ...a[0],...clientTime}
            //console.log(dic)
            //console.log(d)

            Mymodel.updateOne({}, dic, (error) => {
           
            });
            
            //Mymodel.insertMany(arr)
            // module.exports = MyModel
            
            //console.log(d)
            new Mymodel(d).save(function(err,result){ 
              // if (err){ 
              //     console.log(err); 
              // } 
              // else{ 
              //     console.log(result) 
              // } 
            })
            
            Mymodel.createCollection()
            
          })


     

// const DeviceId = await Device_Info.find({}) 
    
          
    }
      }catch(e){
        res.send(e)
      }
     })



router.get("/getDeviceInfo/:device_id", async(req,res) => {
    try{   

        const dev_id = req.params.device_id;
        const deviceData = await Device_Info.find({device_id:dev_id},{_id:0})
        //const paramData = await Device_Info.find({device_id:dev_id})
        //console.log(deviceData)

        if(deviceData.length == 0)
        {
          return res.status(404).json({message:"Device doesn't exist"})
        }

        else {
        
        //console.log(typeof deviceData);
        res.status(200).json(deviceData)

        }
    }catch(e){
        res.send(e)
    }
})


module.exports = router;