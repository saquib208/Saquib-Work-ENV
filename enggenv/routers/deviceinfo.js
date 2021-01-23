const express = require("express");
const router = new express.Router();
const Device_Type = require("../models/DeviceTypesSchema")
// const Parameter = require("../models/parameters")

router.post("/addDeviceTypes", async (req,res)=>{
  // var count= await promise.then(result => {result+1})
  const device_types = new Device_Type({  
    device_desc : req.body.device_desc,
    device_name: req.body.device_name,
    device_code :"00"+await Device_Type.count((err ,result)=> {result+1})
})
 
try{ const devType= await device_types.save()
  res.setHeader('Content-Type', 'application/json')
  res.status(201).send(JSON.stringify({device_desc : devType.device_desc, device_name : devType.device_name, device_code : devType.device_code}))
}
catch(err)
  {
    res.status(400).json({message:"Device already exist"})
  }
})

router.get("/getDeviceTypes",async(req,res)=>{
   try{
       const device_typeData = await Device_Type.find({}, {_id:0}).sort({_id:-1});
       res.send(device_typeData);
   }catch(e){
       res.send(e);
   }
 })


// router.get("/device_types" , async(req,res) =>{
//   try{
//     let { startDate,endDate } = req.query;
//     if(startDate === '' || endDate === ''){
//       return res.status(400).send()
//     }
//   const deviceData = await Parameter.find({
//     "time": {
//       $gte: new Date(new Date(startDate).setHours(00,00,00)),
//       $lt:  new Date(new Date(endDate).setHours(23,59,59))
//     }
//   })
//   if(!deviceData){
//       return res.status(404).send();
//   }else{
//         res.send(deviceData);
//   }  
//   } catch(error){
//     return res.status(500).send()
//     }
// })


module.exports = router;