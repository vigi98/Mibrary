const express=require("express")
const app=express()
const expressLayout=require('express-ejs-layouts')
const Route=require('./routes/index')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


app.set("view engine","ejs")
app.set('views',__dirname+'/views')//No need to put this also
//console.log(__dirname)
app.set('layout','layouts/layout')//or './layouts/layout' -->to set our common layout->This will directly go to 'views' folder and search
app.use(expressLayout)//Have to use this to implement layout
app.use(express.static('./public'))


//Database//should be dependent on environment
//Mongoose creates a default connection when you call mongoose.connect().
//You can access the default connection using mongoose.connection.
mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true  })
db=mongoose.connection
db.on('error',(err)=>console.error(err))
db.once('open',()=>console.log('Connected to Mongoose....'))



//Route
app.use('/',Route)

app.listen(process.env.PORT||3000,(err)=>{

    if(err){
     console.log("Cannot start server")
     return
    }

    console.log('Server Started for BookList......')
})