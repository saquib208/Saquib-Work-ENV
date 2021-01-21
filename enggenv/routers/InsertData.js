const express = require("express");
const bodyParser = require("body-parser")
const Device_Type = require("../models/DeviceTypesSchema");
const router = new express.Router();
const Parameter = require("../models/parametersSchema")
const Device_Info = require("../models/AddDevicesSchema")
//const Data_Device_Schema = require("../models/InsertDataSchema")
//const Device_Model_Schema = require("../routers/adddeviceinfo")
const mongooseUniqueValidator = require("mongoose-unique-validator");
//var url = "mongodb://localhost:27017/";
//const mongoose = require('mongoose');
var jsonParser = bodyParser.json()
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;



router.post("/insertData/:id", jsonParser, async (req,res)=>{
  
try {

  
  deviceID =  req.params.id

 console.log(deviceID)
    
  // const device_Data = await deviceSchema.find();
  
  // console.log(device_Data)
  // res.send(device_Data);
  var data = req.body
  console.log(data);
  //res.status(201).send(data);
  const db = MongoClient.connect(url, function(err, db) {
    useUnifiedTopology: true
    if (err) throw err;
    var dbo = db.db("DeviceRecord");
    var myobj = []
    myobj.push(data)
    dbo.collection(deviceID).insertOne({...data,"server_time": new Date},{safe:true},function(err, result) {
      if (err) throw err;
      //console.log(result);
      
      res.status(201).json(data)

      db.close();
    });
  });
  


// var mongo = MongoClient.connect(url, function(err, db) {
   
  //             useUnifiedTopology: true
  //             // useCreateIndex:true,
  //             // useNewUrlParser:true
  //             // if (err) throw err;
  //             //conn = "DeviceRecord"+"."+deviceSchema
  //             //var dbo = db.db("DeviceRecord");
  //             var data = mongo.collection(deviceSchema)           
  //               console.log(data);
                
        
            




 

// router.post("/students",(req,res)=>{
  //         console.log(req.body);
  //         const user = new Student(req.body)
  //         user.save().then(()=>{
  //             res.send("Transfered");                 
  //         }).catch((e)=> {
  //             res.send(e);
  //         })
  //     })


  // console.log(deviceSchema)
  // var data = mongoose.model(deviceSchema, Schema);
//   deviceSchema = req.params.id
//   console.log(deviceSchema)
//   const Device_Model_Schema = require("../routers/adddeviceinfo")(deviceSchema)
//   console.log(Device_Model_Schema)
//   var schema = new Device_Model_Schema(req.body).save()
//   console.log(schema)
//   schema.then(()=>{
//     res.status(201).send(JSON.stringify({"message": "Data Inserted Successfully"}))                 
//             }).catch((e)=> {
//                 res.send(e);
//             })
// //res.setHeader('Content-Type', 'application/json')

}

    
catch(err)
{
  res.send(err)
}
})




// get request
router.get("/getData/:id",async(req,res)=>{
  try{
      deviceSchema  =  req.params.id
      // const device_Data = await deviceSchema.find();
      
      // console.log(device_Data)
      // res.send(device_Data);
      const db = MongoClient.connect(url, function(err, db) {
        useUnifiedTopology: true
        if (err) throw err;
        var dbo = db.db("DeviceRecord");
        var data = dbo.collection(deviceSchema).find().toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.status(200).json(result)
          db.close();
        });
      });
      


  }
  
  
  catch(e){
      res.send(e);
  }
})


module.exports = router;