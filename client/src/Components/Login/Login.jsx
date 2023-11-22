import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import signUpImg from "../Assets/signupIMG.png";
import { auth } from "../../Firebase/Firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { loginModalFalse } from '../../Redux/switchPages';
import { signUpModalTrue } from '../../Redux/switchPages';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"


function Login({ closeLoginModal }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("Login")
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const handleLogin = () => {
        setLogin("")
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
                // Perform additional actions after successful login, if needed
                setIsLoading(false);
                dispatch(loginModalFalse())
                toast.success('Login successful!');
            })
            .catch((error) => {
                console.log(error);
                setLogin("Login")
                setIsLoading(false);
                toast.error('Failed to login. Please check your credentials.');
            });
    }


    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                const user = result.user;
                // Perform additional actions after successful login, if needed
                dispatch(loginModalFalse())
                toast.success('Login with Google successful!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Failed to login with Google.');
            });
    };


    const handleCreateNewAccount = ()=>{
        dispatch(loginModalFalse())
        dispatch(signUpModalTrue())
    }

    return (
        <div className="signup-main-container">
            <div className="signup-left">
                <h1>Login</h1>
                <h3>Get access to your Orders, Wishlist and Recommendations</h3>
                <div className="signup-img">
                    {/* <img src={signUpImg} alt="" /> */}
                </div>
            </div>
            <div className="signup-right">

                <input placeholder="Email" class="input" name="Email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                <input placeholder="Password" class="input" name="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />

                <button className='signup-btn' onClick={handleLogin}>{login}
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

                <button type="button" class="login-with-google-btn" onClick={handleGoogleLogin}>
                    Continue with Google
                </button>

                <span> New to Bonik? <Link style={{ color: "#e94560", fontWeight: "bold" }} onClick={handleCreateNewAccount}>Create an account</Link></span>

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

export default Login
