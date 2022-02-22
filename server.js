
const express = require('express')
const port = process.env.PORT || 8080;
const app = express()

app.use(express.static(__dirname+ "/dist/"));
app.get(/.*/, function(req,res){
    res.sendFile(__dirname+"/dist/index.html");
});
app.listen(port);

console.log("Sunucu basladi..")


//alttaki kod çalışmadı..
/*
const serveStatic = require('serve-static')
const path = require('path')



const app = express()



app.use('/',serveStatic(path.join(__dirname,'/dist')))


const port = process.env.PORT || 8080

app.listen(port)


*/
