import express from 'express';

const app=express();

app.get('/',(req,res)=>{
    res.send(`Hello world app`);
});

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server up and running  at ${PORT}`);
});
