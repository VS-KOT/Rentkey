const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute');
const propertyRoute = require('./routes/propertyRoute');
const forgotPassword = require('./routes/ForgotPassword')
const dbConnet = require('./config/db');
const cors = require('cors')



//parsing json
app.use(express.json())           
app.use(cors({origin:true}));                  


//setting routes
app.use('/auth', authRoute)          
app.use('/place', propertyRoute)   
app.use('/forgotpassword', forgotPassword )




//connecting database
dbConnet()                           



app.listen(3000, () => {
    console.log('port started at 3000')
})