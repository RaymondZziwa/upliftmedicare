import {Row ,Col ,Form ,Card, FormControl} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import { authentication } from '../../firebase-config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import './sign.css'
import { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'


const SignUp = () =>{
    const formStyle = {
        margin:"auto",
    }

    const styleFormControl = {
        margin:'10px'
    }
    const styleButton = {
        marginTop:"5px",
        marginLeft:'20px',
        marginBottom:'10px'
    }
    const statusMessageStyle = {
        fontSize:'15px',
        backgroundColor: "#89C4F4",
        padding:'5px',
        color:'white',
        border:'solid #89C4F4 0.5px'
    }

    const fnameRef = useRef()
    const lnameRef = useRef()
    const phoneNumberRef = useRef()
    const pwdRef = useRef()
    const confirmpwdRef = useRef() 
    const ageRef = useRef()
    const genderRef = useRef()
    const dobRef = useRef()
    const otpRef = useRef()
    let firstName,lastName,contact,password,confirmPassword,age,gender,dob;
     
    // console.log(firstName,lastName,contact,password,confirmPassword)
    const [success,setsuccess] = useState(false)
    const [registered,setregistered] = useState(false)
    const generateCaptcha = () =>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
            }, authentication);
    }
    
    
    const validatePhoneNumberHandler = (event) =>{
        event.preventDefault();
        localStorage.setItem('firstName', fnameRef.current.value)
        localStorage.setItem('lastName', lnameRef.current.value)
        localStorage.setItem('contact', "+256"+phoneNumberRef.current.value)
        localStorage.setItem('pwd', confirmpwdRef.current.value)
        localStorage.setItem('age', ageRef.current.value)
        localStorage.setItem('gender', genderRef.current.value)
        localStorage.setItem('dob', dobRef.current.value)
        contact = "+256"+phoneNumberRef.current.value;
        password = pwdRef.current.value;
        age = ageRef.current.value
        gender = genderRef.current.value
        dob  = dobRef.current.value
        confirmPassword = confirmpwdRef.current.value;

        if(contact.length >= 9 && password===confirmPassword){          
           generateCaptcha()
           let appVerifier =  window.recaptchaVerifier
           signInWithPhoneNumber(authentication,contact,appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setregistered(true);
          }).catch((error) => {
            console.log(error)
          });
      
        }else{
            alert('Error! Please ensure the information provided is correct and the passwords match.Also ensure you have left no blank spaces')
        }
    }
   

    const verifyOtp = (event) =>{
        event.preventDefault()
        const otp = otpRef.current.value
        
        if(otp.length === 6){
            let confirmationResult = window.confirmationResult
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                setsuccess(true)
                Axios.post('http://localhost:3001/api/register',{
                     FirstName: localStorage.getItem("firstName"),
                     LastName:localStorage.getItem("lastName"),
                     Contact: localStorage.getItem("contact"),
                     Pwd:localStorage.getItem("pwd"),
                     Age:localStorage.getItem("age"),
                     Gender:localStorage.getItem("gender"),
                     Dob:localStorage.getItem("dob")
                }).then(()=>{
                    console.log(localStorage.getItem("firstName"))
                    alert('registration successful')
                    window.location.href="/login"
                })
                // ...
              }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error)
              });
        }
    }
    return(
      <>  
       <Card>
            <Card.Body>
            <Row style={{margin:'auto'}}>
            <Col sm='12' md='12' lg='12' xl='12'>
            <h3>Create your medical account</h3>
            {success && <span><p style={statusMessageStyle}>You have successfully registered.<br></br>Please wait as we redirect you to the login page...</p></span>}
                            {!registered && <Form style={formStyle}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="First Name" style={styleFormControl} ref={fnameRef} required />
                                    <Form.Control type="text" placeholder="Last Name" style={styleFormControl} ref={lnameRef} required />
                                    <FormControl  type="number" placeholder="Age" style={styleFormControl} ref={ageRef} required/>
                                    <FormControl  type="date" placeholder="Date of birth" style={styleFormControl} ref={dobRef} required/>
                                    <select className="form-select" style={styleFormControl} aria-label="Default select example" ref={genderRef}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <FormControl  type="number" placeholder="Phone Number" style={styleFormControl} ref={phoneNumberRef} required/>
                                    <Form.Control type='password' placeholder='Enter Password' style={styleFormControl} ref={pwdRef} required />
                                    <Form.Control type='password' placeholder='Confirm Password' style={styleFormControl} ref={confirmpwdRef} required />
                                    <button type="submit" className='btn btn-outline-primary' style={styleButton} onClick={validatePhoneNumberHandler}>Register</button>
                                </Form.Group>
                            </Form>
                            }
                            {registered && <Form style={formStyle}>
                                <Form.Group> 
                                    <FormControl  type="number" placeholder="Enter OTP code" style={styleFormControl} ref={otpRef} required/>
                                    <button type="submit" className='btn btn-outline-primary' style={styleButton} onClick={verifyOtp}>Verify</button>
                                </Form.Group>
                                </Form>
                                }
                           
            </Col>
        </Row>
            </Card.Body>
       </Card>
        <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
    </div>
    <div id='recaptcha-container'></div>
    </>
    )
}

export default SignUp;