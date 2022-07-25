const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'uplifmedicare'
})

db.connect((err)=>{
    if(err){
        throw err
    }
    else{
        console.log('connection successful')
    }
})


// app.get('/',(req,res)=>{
//     const sqlInsert = "Insert INTO Users(Name) values ('zziwa')"
//     db.query(sqlInsert,(err,result)=>{
//         res.send("inserted")
//         console.log(err)
//     })
    
//     // res.send('Server is working')
// })

app.post('/api/register',(req,res)=>{
    const fname = req.body.FirstName
    const lname = req.body.LastName
    const contact = req.body.Contact
    const pwd = req.body.Pwd
    const age = req.body.Age
    const gender = req.body.Gender
    const dob = req.body.Dob

    const saltRounds = 10;
    const encryptedPwd = bcrypt.hashSync(pwd, saltRounds);



    const sqlInsert = "Insert into users(FirstName,Lastname,PhoneNumber,Gender,Age,DOB,Password) values(?,?,?,?,?,?,?)"
    db.query(sqlInsert,[fname,lname,contact,gender,age,dob,encryptedPwd],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3001,()=>{
    console.log('server is running on PORT:3001')
})