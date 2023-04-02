import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
var firebaseConfig = {
    apiKey: "AIzaSyDVDZUfBJRepmdk7dd02em79FPvP7kCL7o",
    authDomain: "cabook-cab-services.firebaseapp.com",
    projectId: "cabook-cab-services",
    storageBucket: "cabook-cab-services.appspot.com",
    messagingSenderId: "439124731364",
    appId: "1:439124731364:web:88a3584d6765780ce193f1"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();