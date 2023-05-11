const mongoose  = require("mongoose");

let MembersSchema= new mongoose.Schema({
    "MemberID":String,
    "firstName":String,
    "lastName":String,
    "address":{
        "street":String,
        "numBuild":String,
        "city":String
    },
    "dateOfBirth":Date,
    "telephone":String,
    "mobile":String,
    "picture": {
        "data": Buffer,
        "contentType": String
    },
  
    "vaccinations":[{
        "manufacturer":String,
        "vaccinatedDate":Date
    }], 
    "dateOfRecovery":Date,
    "positiveResult":Date
})

let membersModel = mongoose.model('members',MembersSchema)
module.exports = membersModel;