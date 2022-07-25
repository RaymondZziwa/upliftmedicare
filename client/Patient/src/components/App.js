import SignUp from "./SignUp/signUp";
import PatientHomePage from "./Patient/Patient"
import {Container} from 'react-bootstrap'
import { Route } from 'react-router-dom'
import Login from "./Login/Login";

function App() {
  return (
    <div className="App">
        <Route path='/register'>
          <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
              <div style={{maxWidth: '400px'}}>
                <SignUp />
              </div>
          </Container>
        </Route>
        <Route path='/PatientDashboard'>
            <PatientHomePage />
        </Route>

        <Route path='/login'>
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
