import { initializeApp } from 'firebase/app'
import {getAuth} from "firebase/auth"

const firebaseConfig = {
        apiKey:"AIzaSyBaZGriV4wJMNtQg_XSxHAR02geLfGaKYE",
        authDomain:"upliftmedicare-devpt.firebaseapp.com",
        projectId:"upliftmedicare-devpt",
        storageBucket:"upliftmedicare-devpt.appspot.com",
        messagingSenderId:"895663612882",
        appId:"1:895663612882:web:effdaca78aa389622f1e0b"
}


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)