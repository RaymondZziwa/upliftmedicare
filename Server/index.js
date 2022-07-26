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
    const sqlInsert = "Insert into users(FirstName,Lastname,PhoneNumber,Gender,Age,DOB,Password) values(?,?,?,?,?,?,?)"
        db.query(sqlInsert,[fname,lname,contact,gender,age,dob,encryptedPwd],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    // let status = 0;
    // //code checking if the phone number being registered by the new user already exists in the database
    // const sqlCheck = "Select * from users where PhoneNumber = ?"
    // db.query(sqlCheck,[contact],(err,result)=>{
    //     if(result >=1){
    //       status = 1;
    //     }else{
    //       status = 0
    //     }
    // })


    // //if number exists user is registered else no...
    // if(status === 0){
        
    // }else{
    //     res.send('1')
    // }
})


app.post('/api/login',(req,res)=>{
    //fetching user login input submitted from the front end
        const number = req.body.number
        const pwd = req.body.pwd
        
        let fetchedPwd;
        //password has to be hashed and compared to what is stored in the database
         db.query('select Password FROM users WHERE PhoneNumber =?',[number], (err,results)=>{
            if(err) throw err;
            if(results.length > 0){
                 fetchedPwd = results[0].Password;
                // bcrypt.compareSync(myPlaintextPassword, hash);
            }
         })   
        //checking if the input is not empty
        if(number !='' && pwd!='' ){
        // Execute SQL query that'll select the account from the database based on the specified phone number and password
		db.query('SELECT * FROM users WHERE PhoneNumber = ? AND Password = ?', [number, pwd], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0 && bcrypt.compareSync(myPlaintextPassword, hash)===true) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.number = number;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Phone Number and/or Password!');
			}			
			response.end();
		});
        }else{
            res.send('Please enter Phone Number and Password!');
		    res.end();
        }
})


app.listen(3001,()=>{
    console.log('server is running on PORT:3001')
})