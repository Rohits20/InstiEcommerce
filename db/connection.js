const mongoose = require("mongoose");

const DB = "mongodb+srv://Rohit:Rohit2020@cluster0.jv9yee2.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(DB ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection to moongoose established")).catch((error)=> console.log(error.message));