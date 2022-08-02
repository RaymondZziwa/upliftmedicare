import { AuthErrorCodes } from 'firebase/auth';
import {Row ,Col ,Form ,Card, FormControl} from 'react-bootstrap'
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

    return(
        <>
            <Row style={{margin:'auto',marginTop:'10px',display:'flex',justifyContent:'center'}}>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <div style={userNameParent}><p style={userName}>Raymond</p></div>
                </Col>
            </Row>
            <Row style={{margin:'auto',marginTop:'10px'}}>
                <Col sm='12' md='12' lg='12' cl='12'  style={{margin:'auto'}}>
                    <div style={linkParent}><p style={link}>Self Examination</p></div>
                    <div style={linkParent}><p style={link}>Call An Ambulance(beta)</p></div>
                    <div style={linkParent}><p style={link}>Book An Appointment</p></div>
                    <div style={linkParent}><p style={link}>Call A Doctor</p></div>
                    <div style={linkParent}><p style={link}>Medical History</p></div>
                    <div style={linkParent}><p style={link}>Appointment History</p></div>
                    <div style={linkParent}><p style={link}>Edit Profile</p></div>
                </Col>
            </Row>
        </>
    );
}


export default PatientHomePage;