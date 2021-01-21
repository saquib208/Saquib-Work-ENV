const express =  require("express");
const bodyParser = require("body-parser")
require("./db/conn");
const Device_Type = require("./models/DeviceTypesSchema");
const  Parameter = require("./models/parametersSchema");
const Device_Info = require("./models/AddDevicesSchema")
const deviceData = require("./models/insertDataSchema")
const deviceRouter1 = require("./routers/deviceinfo");
const deviceRouter2 = require("./routers/parameterinfo");
const deviceRouter3 = require("./routers/adddeviceinfo");
const deviceRouter4 = require("./routers/InsertData");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// app.use((req, res, next ) => {
//   res.header('Access-Control-Allow-Origin','*')
//   res.header('Access-Control-Allow-Headers',
//   'Origin,X-Requested-With, Content-Type, Accept, Authorization');
  
//   if (req.method == 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
//       return res.status(200).json({});    }

// });
// app.use(bodyParser.urlencoded({
//     extended: false
//   }));
app.use(bodyParser.json())

app.use(deviceRouter1);
app.use(deviceRouter2);
app.use(deviceRouter3);
app.use(deviceRouter4);
app.listen(port,() => {
    console.log(`connection is setup at ${port}`);  

});