import {Row ,Col ,Form ,Card, FormControl} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import { authentication } from '../../firebase-config'
import './login.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'


const Login = () =>{
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

    const phoneNumberRef = useRef()
    const pwdRef = useRef()

    
    
    
    //function to authenticate the user if he already has an account registered
    const authUser = () =>{
        Axios.post('http://localhost:3001/api/login',{
                    number: `+256${phoneNumberRef.current.value}`,
                    pwd: pwdRef.current.value
                }).then((res)=>{
                            if(res.status === 200){
                                alert(`${res.data}`)
                            }else{
                                alert('Error! Please try again.Ensure you are using the correct log in details')
                            }         
                })
    }
    return(
        <>
               <Card>
            <Card.Body>
            <Row style={{margin:'auto'}}>
            <Col sm='12' md='12' lg='12' xl='12'>
            <h3>Log into your medical account</h3>
                            <Form style={formStyle}>
                                <Form.Group>
                                    <FormControl  type="number" placeholder="Phone Number" style={styleFormControl} ref={phoneNumberRef} required/>
                                    <Form.Control type='password' placeholder='Enter Password' style={styleFormControl} ref={pwdRef} required />
                                    <button type="button" className='btn btn-outline-primary' style={styleButton} onClick={authUser}>Login</button>
                                </Form.Group>
                            </Form>
            </Col>
        </Row>
            </Card.Body>
       </Card>
        <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/Register'>Register</Link>
        </div>
        <div id='recaptcha-container'></div>
        </>
    )
}

export default Login;