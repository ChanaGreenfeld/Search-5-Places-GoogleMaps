const mongoose  = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Covid',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}),
()=>{
    try{
    }
    catch(erroe){
        console.error(error);
    }
};
const connection = mongoose.connection;
connection.once('open',()=>{console.log("successfull");})
