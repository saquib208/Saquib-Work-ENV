const mongoose = require("mongoose");





const insertDataSchema = new mongoose.Schema(
    {client_time : {type: Date},
    server_time :  { type : Date, default: Date.now }
    // parameters:
    //     {type:String,
    //     required:true,
    //     //  unique:true
    // },
    // unit:
    //     {type:String,
    //     required:true,
    //     // unique:true
    // },

    },{strict:false,versionKey:false});
    

const deviceData = new mongoose.model('GWR00004',insertDataSchema);
//module.exports = deviceData;
