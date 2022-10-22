import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup,
signInWithEmailAndPassword,  createUserWithEmailAndPassword,
 sendPasswordResetEmail,  signOut,
} from "firebase/auth";
import {
 getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import axios from "axios";


const firebaseConfig = {
    apiKey: "AIzaSyCtD9xC7riZW-hQVZa1O_Nh6bIyzBFCQIQ",
    authDomain: "ding-e63c6.firebaseapp.com",
    projectId: "ding-e63c6",
    storageBucket: "ding-e63c6.appspot.com",
    messagingSenderId: "1041959870305",
    appId: "1:1041959870305:web:dae865b90337827b362f20",
    measurementId: "G-YT9WEK468Z"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth(app);


  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
      const idToken = await user.getIdToken();

      axios.post("http://192.168.1.106:5000/spotify/login",{
        uid: user.uid,
        name: user.displayName,
        email: user.email
      },
      {
        Authorization: `Bearer ${idToken}`
      })

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    console.log("funge")
  };


export default signInWithGoogle;