const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
        event : {
            type : String, 
            required : true
        },
        appID : {
            type : String,
            required : true
        },
        data : {
            type : Object,
            required: true
        },
        prevHash : {
            type : String,
            required : true
        },
        currHash : {
            type : String,
            required : true
        }
},{ timestamps : true })

module.exports = mongoose.model("events", EventSchema);