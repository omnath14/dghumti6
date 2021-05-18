const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB=require('./config/db');
const expressValidator = require('express-validator');
require('dotenv').config();
const path = require('path');

connectDB();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use('/api',require('./routes/auth'));
app.use('/api', require('./routes/user'));
app.use('/api',require('./routes/category'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/order'));

 
if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
 const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`A Node Js API is listening on port: ${PORT}`);
});
