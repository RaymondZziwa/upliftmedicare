import { AuthErrorCodes } from 'firebase/auth';
import {Row ,Col ,Form ,Card, FormControl} from 'react-bootstrap'
import './ds.css'
import logo from './Imgs/logo.png'
import youtube from './Imgs/utube.png'
import twitter from './Imgs/twitter.png'
import facebook from './Imgs/facebook.png'
import email from './Imgs/email.png'
import insta from './Imgs/instagram.png'
import linkedIn from './Imgs/linkedin.png'
import bg from './Imgs/bg.png'
const PatientHomePage = () =>{
    const userName = {
        border:'3px solid #11517F',
        borderRadius:'50px',
        textAlign:'center',
        fontWeight:'bold',
        margin:'auto',
        width:'100px'
    }
    const link = {
        border:'3px solid #11517F',
        borderRadius:'50px',
        textAlign:'center',
        fontWeight:'bold',
        margin:'auto',
        padding:'5px'
    }
    const userNameParent = {
        border:'3px solid #11517F',
        borderRadius:'50px',
        padding:'2px',
        float:'right',
        margin:'2px'
    }

    const linkParent = {
        border:'3px solid #11517F',
        borderRadius:'50px',
        padding:'2px',
        margin:'2px',
        width:'240px',
        cursor:'pointer',
    }

    const logoStyle = {
        height:'50px',
        float:'left'
    }

    const footer = {
       height:'30px',
       margin:'5px',
       cursor:'pointer'
    }

    const helpline = {
        float:'right',
        textAlign:'center',
        fontWeight:'bold',
        margin:'auto',
        color:'#11517F',
        fontSize:'1.2rem'
    }
    return(
        <>
            <div className='bg'>
                <Row style={{margin:'auto',marginTop:'10px',display:'flex',justifyContent:'center'}}  >
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <img src={logo} alt='logo' style={logoStyle}/>
                        <div style={userNameParent}><p style={userName}>Raymond</p></div>
                    </Col>
                </Row>
                <Row style={{margin:'auto',marginTop:'10px'}}>
                    <Col sm='12' md='12' lg='12' xl='12'  style={{margin:'auto',display:'flex',justifyContent:'flex-end'}}>
                        <div style={linkParent}><p className='linkattr' style={link}>Self Examination</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Call An Ambulance(beta)</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Book An Appointment</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Call A Doctor</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Medical History</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Appointment History</p></div>
                        <div style={linkParent}><p className='linkattr' style={link}>Edit Profile</p></div>
                    </Col>
                </Row>
            </div>
            <Row style={{margin:'auto',marginTop:'2px',display:'flex',justifyContent:'center'}}  >
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <img src={insta} alt='logo' style={footer}/>
                        <img src={twitter} alt='logo' style={footer}/>
                        <img src={facebook} alt='logo' style={footer}/>
                        <img src={email} alt='logo' style={footer}/>
                        <img src={linkedIn} alt='logo' style={footer}/>              
                        <img src={youtube} alt='logo' style={footer}/>
                        <p style={helpline}>Customer Helpline: +256 785 987 809</p>   
                    </Col>
            </Row>
        </>
    );
}


export default PatientHomePage;