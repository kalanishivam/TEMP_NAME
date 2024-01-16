const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const connecttoDb = require('./database/db.js');


const app = express();
connecttoDb();

app.use(express.json());


app.use('/api.users' , userRoutes)
const PORT = 500;

app.listen(PORT, (req, res)=>{
    console.log(`server started on PORT  : ${PORT}`)
})