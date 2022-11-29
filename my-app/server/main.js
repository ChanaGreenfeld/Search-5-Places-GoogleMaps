const express = require("express");
require('dotenv').config()


const searchController=require('./controllers/searchController')
const cors = require('cors');
const app =express();
app.use(cors());
app.use(express.json());
require('./dataBase')

app.use('/api',searchController)

app.listen(process.env.PORT,console.log(`listen to port ${process.env.PORT}`));
