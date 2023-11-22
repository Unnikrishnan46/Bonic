import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import signUpImg from "../Assets/signupIMG.png";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../Firebase/Firebase"
import { ToastContainer, toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { signUpModalFalse } from '../../Redux/switchPages';
import { loginModalTrue } from '../../Redux/switchPages';
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css";

function Signup({onCloseModal}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signUp, setSignUp] = useState("Sign Up")

  const dispatch  = useDispatch()


  const handleSubmission = () => {
    setSignUp("")
    setIsLoading(true)
    if (!username || !email || !password) {
      setSignUp("Sign Up")
      setIsLoading(false)
      toast.warning('Please fill all fields.');
      return null;
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential)
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username
      })
      sendEmailVerification(user)
        .then((response) => {
          setSignUp("Sign Up")
          setIsLoading(false)
          toast.success('Verification email sent. Please check your email.');
        })
        .catch((error) => {
          setSignUp("")
          setIsLoading(false)
          console.log(error);
          toast.error('Failed to send verification email.');
        });
    }).catch((error) => {
      console.log(error)
      setSignUp("")
      setIsLoading(false)
      toast.error("This email is already registered");
    })
  }


  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(signUpModalFalse())
        window.location.href="/";
        // Additional code after successful Google sign-up
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to sign up with Google.');
      });
  };


  const handleExistUser = ()=>{
    dispatch(signUpModalFalse());
    dispatch(loginModalTrue());
  }


  return (
    <div className="signup-main-container">
      <div className="signup-left">
        <h1>Looks like you're new here!</h1>
        <h3>Sign up with your email to get started</h3>
        <div className="signup-img">
          {/* <img src={signUpImg} alt="" /> */}
        </div>
      </div>
      <div className="signup-right">

        <input placeholder="Username" class="input" name="Username" type="text" onChange={(e) => { setUsername(e.target.value) }} />
        <input placeholder="Email" class="input" name="Email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder="Password" class="input" name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />

        <button className='signup-btn' onClick={handleSubmission}>{signUp}
          {isLoading ?
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
            :
            <div class="arrow-wrapper">
              <div class="arrow"></div>
            </div>}
        </button>

        <p>or</p>

        <button type="button" class="login-with-google-btn" onClick={handleGoogleSignup}>
          Sign in with Google
        </button>

        <span> Existing User? <Link onClick={handleExistUser}>Login</Link></span>

      </div>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />



    </div>
  )
}

export default Signup
