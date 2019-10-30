const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    console.log("Its connected");
    res.sendFile(__dirname + '/index.html');
})

module.exports = router;