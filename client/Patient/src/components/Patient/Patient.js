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
import { Link } from 'react-router-dom'


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
        padding:'5px',
        textDecoration:'none'
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
        color:'black'
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
        fontSize:'1.2rem',

    }

    const emailHandler = (event) =>{
        event.preventDefault()
        window.location = "mailto:upliftcreative5@gmail.com"
    }

    return(
        <>
            <div className='bg'>
                <Row style={{margin:'auto',marginTop:'2px',display:'flex',justifyContent:'center'}}  >
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <Link to='/PatientDashboard'><img src={logo} alt='logo' style={logoStyle}/></Link>
                        <div style={userNameParent}><p style={userName}>Raymond</p></div>
                    </Col>
                </Row>
                <Row style={{margin:'auto',marginTop:'4px'}}>
                    <Col sm='12' md='12' lg='12' xl='12' className='navbar'>
                        <Link to='/SelfExamination'><div  className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Self Examination</p></div></Link>
                        <Link to='/CallAnAmbulance'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Call An Ambulance(beta)</p></div></Link>
                        <Link to='/BookAnAppointment'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Book An Appointment</p></div></Link>
                        <Link to='/CallADoctor'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Call A Doctor</p></div></Link>
                        <Link to='/MedicalHistory'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Medical History</p></div></Link>
                        <Link to='/AppointmentHistory'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Appointment History</p></div></Link>
                        <Link to='/PatientProfile'><div className='parentdiv' style={linkParent}><p className='linkattr' style={link}>Edit Profile</p></div></Link>
                    </Col>
                </Row>
            </div>
            <Row style={{margin:'auto',marginTop:'2px',display:'flex',justifyContent:'center'}}  >
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <a href='https://www.instagram.com/upliftcreativeafrica/'><img src={insta} alt='logo' style={footer} className='social'/></a>
                        <a href='https://twitter.com/uplift_africa'><img src={twitter} alt='logo' style={footer} className='social'/></a>
                        <a href='https://www.facebook.com/upliftcreativeafrica/'><img src={facebook} alt='logo' style={footer} className='social'/></a>
                        <img src={email} alt='logo' style={footer} className='social' onClick={emailHandler}/>
                        <a href=' https://www.linkedin.com/company/uplift-creative-ltd/'><img src={linkedIn} alt='logo' style={footer} className='social'/> </a>                   
                        <a href='https://www.youtube.com/channel/UCB5fIP8M7ov4VPHJsi4f-Gg'><img src={youtube} alt='logo' style={footer} className='social'/></a>
                        <a href="tel:+256785987809"><p style={helpline}>Customer Helpline: +256 785 987 809</p></a>
                    </Col>
            </Row>
        </>
    );
}


export default PatientHomePage;