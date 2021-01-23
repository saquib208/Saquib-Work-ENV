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
  deviceType = deviceID.substring(0,3)
  var data = req.body
  //console.log(deviceType);
  const deviceData = await Device_Info.find({device_id:deviceID},{_id:0})
  const parameterData = await Parameter.find({device_name: deviceType})
  
  
  var param = []
  for(i = 0; i < parameterData.length; i++) {
    var para1 = parameterData[i];
   // console.log(para)
   param.push(para1._doc.parameters)
  // data.push(para1._doc.unit)
  
}


//console.log(param)

const intersection = param.filter(element => Object.keys(data).includes(element));
//console.log(intersection)

  if(deviceData.length == 0)
  {
    return res.status(404).json({message:"Device doesn't exist"})
  }

  else if (intersection.length == 0){
    return res.status(404).json({message:"Provided parameter dosen't exists in db"})

  }
 else{

 
  var date = data.client_time;
  var dateObject = new Date(date);
  var client_time = {"client_time":dateObject} 
  //console.log(client_time)
  //res.status(201).send(data);
  const db = MongoClient.connect(url, function(err, db) {
    useUnifiedTopology: true
    if (err) throw err;
    var dbo = db.db("DeviceRecord");
    var myobj = []
    myobj.push(data)
    var device_name ={ "device_id" : deviceID}
    dbo.collection(deviceID).insertOne({...device_name,...data,...client_time,"server_time": new Date},{safe:true},function(err, result) {
      if (err) throw err;
      //console.log(result);
      
      res.status(201).json(data)

      db.close();
    

    });
  });
  
}


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
      const deviceData = await Device_Info.find({device_id:deviceSchema},{_id:0})
      //console.log(deviceData)
    
      if(deviceData.length == 0)
      {
        return res.status(404).json({message:"Device doesn't exist"})
      }

      else 
      {


      const db = MongoClient.connect(url, function(err, db) {
        useUnifiedTopology: true
        if (err) throw err;
        var dbo = db.db("DeviceRecord");
        var data = dbo.collection(deviceSchema).find({},{_id:0}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.status(200).json(result)
          db.close();
        });
      });
  }
  
}
  
  catch(e){
      res.send(e);
  }
})


module.exports = router;