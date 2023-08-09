require("dotenv").config()
const express = require('express')
const logger = require('./utils/logger')

require('./config/modelConfig')

const app = express();
app.use(express.json())

const PORT = process.env.PORT  || 9000;
const HOST = "localhost";



const commonRouter = require('./urls')
app.use("/",commonRouter);



const server = app.listen(process.env.PORT,()=>{
    //console.log('server start on port',PORT)
    logger.info(`server started on running on http://${HOST}:${PORT}`)
});

module.export = server