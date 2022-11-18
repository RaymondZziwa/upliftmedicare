import SignUp from "./SignUp/signUp";
import PatientHomePage from "./Patient/Patient"
import ProfilePage from "./Patient/Profile";
import {Container} from 'react-bootstrap'
import { Route } from 'react-router-dom'
import Login from "./Login/Login";
import AppointmentHistory from "./Patient/AppointmentHistory";
import MedicalHistory from "./Patient/MedicalHistory";
import CallADoctor from "./Patient/CallADoctor";

function App() {
  return (
    <div className="App">
        <Route path='/Register'>
          <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
              <div style={{maxWidth: '400px'}}>
                <SignUp />
              </div>
          </Container>
        </Route>
        <Route path='/AppointmentHistory'>
              <AppointmentHistory />
        </Route>
        <Route path='/MedicalHistory'>
            <MedicalHistory />
        </Route>
        <Route path='/PatientDashboard'>
            <PatientHomePage />
        </Route>
        <Route path='/CallADoctor'>
            <CallADoctor />
        </Route>
        <Route path='/PatientProfile'>
            <ProfilePage />
        </Route>
        <Route path='/Login'>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
              <div style={{maxWidth: '400px'}}>
                <Login />
              </div>
          </Container>
        </Route>
    </div>
  );
}

export default App;
