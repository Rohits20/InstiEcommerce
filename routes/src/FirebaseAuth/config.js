import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB87opAREW7OaXm5lAr-1fIXeIkmZo8Nkk",
    authDomain: "marketplace-1b0e7.firebaseapp.com",
    projectId: "marketplace-1b0e7",
    storageBucket: "marketplace-1b0e7.appspot.com",
    messagingSenderId: "251422942715",
    appId: "1:251422942715:web:bcc811f01d2861f2f2975e",
    measurementId: "G-RQ092J7EE1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
