const express = require('express');


const app = express();

app.use(express.json());


app.use('/api' , )
const PORT = 500;

app.listen(PORT, (req, res)=>{
    console.log(`server started on PORT  : ${PORT}`)
})