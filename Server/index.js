const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
// const path = __dirname+'app/views/'
// app.use(express.static(path))
// app.get('/',(req,res)=>{
//     res.sendFile(path+'index.html')
// })

let options = {
    host: 'localhost',
    user:'root',
    password:'',
    database:'uplifmedicare'
}

let sessionStore = new MySQLStore(options)

app.use(session({
    key:'session_cookie_name',
	secret: 'session_cookie_secret',
    store: sessionStore,
	resave: false,
	saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60*60*60*24
    }
}));

const corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions))
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





//function for signing up/registering new users
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
    //missing code to check if user already exists
    db.query('SELECT * FROM users WHERE PhoneNumber = ?;',contact, function(error, results) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length>0) {
            res.send('The phone number you are trying to registered is already associated with an account.Please use a different number.')
        } else {
            const sqlInsert = "Insert into users(FirstName,Lastname,PhoneNumber,Gender,Age,DOB,Password) values(?,?,?,?,?,?,?)"
            db.query(sqlInsert,[fname,lname,contact,gender,age,dob,encryptedPwd],(err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send('Your account has been successfully registered');
                }
            })
        }		
    })   
})



//function handling the user Log In
app.post('/api/login',(req,res)=>{
     //fetching user login input submitted from the front end       
     const number = req.body.number
     const pwd = req.body.pwd
    
     //checking if the input is not empty
     if(number !='' && pwd!='' ){
     // Execute SQL query that'll select the account from the database based on the specified phone number and password
     db.query('SELECT * FROM users WHERE PhoneNumber = ?;',number, function(error, results) {
         // If there is an issue with the query, output the error
         if (error) throw error;
         // If the account exists
        if (results.length>0) {
             bcrypt.compare(pwd,results[0].Password,(err,response)=>{
                 if(err) throw error;
                 if(response){
                    res.redirect(301,'/patientDashboard')
                 }else{
                     res.send('Incorrect Phone Number or Password');
                 }
             })
         } else {
            res.send('User doesnt exist');
         }			
     });
     }else{
         res.send('Please enter Phone Number and Password!');
     }
})


app.listen(process.env.PORT || 3001,()=>{
    console.log('server is running on PORT:3000')
})