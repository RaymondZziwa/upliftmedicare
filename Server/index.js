const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const session = require('express-session')


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
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
            db.query(sqlInsert,[fname,lname,contact,gender,age,dob,encryptedPwd],(err,result)=>{
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
                        res.send(results)
                     }else{
                         res.send('Incorrect Phone Number or Password');
                     }
                 })
//               // res.send('1');
// 				// // Authenticate the user
// 				// req.session.loggedin = true;
// 				// req.session.number = number;
 			} else {
				res.send('User doesnt exist');
 			}			
 		});
         }else{
             res.send('Please enter Phone Number and Password!');
         }
})


app.listen(3001,()=>{
    console.log('server is running on PORT:3001')
})