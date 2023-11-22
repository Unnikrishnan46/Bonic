import React, { useState } from 'react'
import logo from '../Assets/logo.svg'
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import { useSelector ,useDispatch} from 'react-redux';
import {signUpModalTrue} from "../../Redux/switchPages";
import {signUpModalFalse} from "../../Redux/switchPages";
import { loginModalTrue } from '../../Redux/switchPages';
import { loginModalFalse } from '../../Redux/switchPages';
import "./Header.css"

function Search({ userData,handleSignOut}) {
    const [searchQuery,setSearchQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false);
    const page = useSelector((state)=>state.switchPages)
    const dispatch  = useDispatch()

    const cartState = useSelector((state)=>state.cartStates)

    const handleSearchQuery = ()=>{
        console.log("span clicked")
        window.location.href = `/v1/all-products/?search=${searchQuery}`
    }
    

    const onOpenModal = () => {
        dispatch(signUpModalTrue())
        handleMouseLeave();
    };

    const onCloseModal = () => {
        dispatch(signUpModalFalse())
    };

    const openLoginModal = ()=>{
        dispatch(loginModalTrue())
        handleMouseLeave();
    }

    const closeLoginModal= ()=>{
        dispatch(loginModalFalse())
    }




    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };



    
    // window.addEventListener("scroll", function () {
    //     const search = document.querySelector(".search")
    //     search.classList.toggle("active", window.scrollY > 100)
    // })
    return (
        <>
            <section className='search'>
                <div className="contsiner c_flex">
                    <div className="logo width">
                        <img src={logo} alt="" />
                    </div>

                    <div className="search-box f_flex">
                        <i className='fa fa-search'></i>
                        <input type="text" placeholder='Search and hit enter...' onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                        <span><Link to={`/v1/all-products/?search=${searchQuery}`}>Search</Link></span>
                    </div>

                    <div className="icon f_flex width cart-user-icons">
                        <div
                            className="icon f_flex width suiii"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <i className='fa fa-user icon-circle'></i>
                            {/* <p>{userData}</p> */}
                            {showDropdown && (
                                <div className="dropdown-menu" onMouseEnter={handleMouseEnter}>
                                    <ul>
                                        {userData === undefined ? <li><span>New customer?</span>     <Link to="" style={{ color: "#0f3460", fontWeight: "700" }} onClick={onOpenModal}>Sign Up</Link></li> : "" }
                                        <li><Link to="/v1/wishlist"><i class="fas fa-heart"></i>   Wishlist</Link></li>
                                        <li><Link to="/profile"><i class="fas fa-user-circle"></i>   Profile</Link></li>
                                        <li><Link to="/v1/orders"><i class="fab fa-shopify"></i>   Order</Link></li>
                                        {userData === undefined ?<li><Link to="" onClick={openLoginModal}><i class="fas fa-sign-in-alt"></i>   Login</Link></li> : "" }
                                        {userData !== undefined ?<li><Link to="" onClick={handleSignOut}><i class="fas fa-sign-out-alt"></i>   Logout</Link></li> : "" }
                                    </ul>
                                </div>
                            )}
                        </div>



                        <div className="cart">
                            <Link to="/cart">
                                <i className='fa fa-shopping-bag icon-circle'></i>
                                {cartState && cartState.cartCount > 0 ? <span>{cartState.cartCount}</span> : ""}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Signup Modal */}
                <Modal open={page.signUpModal} onClose={onCloseModal} center classNames="modal-suii" animationDuration={0}>
                    <Signup onCloseModal={onCloseModal}/>
                </Modal>
                {/* Signup Modal */}


                {/* loginModal */}
                <Modal open={page.loginModal} onClose={closeLoginModal} center classNames="modal-suii" animationDuration={0}>
                    <Login/>
                </Modal>
                {/* loginModal */}

            </section>
        </>
    )
}

export default Search
