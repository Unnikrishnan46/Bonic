import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [MobileMenu, setMobileMenu] = useState(false)
    const MobileMenuStyle = {
        background: MobileMenu ? "red" : "none",
        height: MobileMenu ? "90%" : "",
        width: MobileMenu ? "80%" : "",
        zIndex: MobileMenu ? 999 : "",
        position: MobileMenu ? "absolute" : "",
        display: MobileMenu ? "flex" : "",
        flexDirection: MobileMenu ? "column" : "",
        padding: MobileMenu ? "5rem" : "",
        textAlign: MobileMenu ? "center" : "",
        background: MobileMenu ? "rgba(255, 255, 255, 0.35)" : "none",
        WebkitBackdropFilter: MobileMenu ? "blur(10px)" : "none", // For compatibility with older Safari browsers
        backdropFilter: MobileMenu ? "blur(10px)" : "none",
        border: MobileMenu ? "1px solid rgba(255, 255, 255, 0.175)" : "none",
    }
    const navlinkStyle = {
        display: MobileMenu ? "flex" : "",
        justifyContent: MobileMenu ? "center" : "",
        height: MobileMenu ? "100vh" : "",
        zIndex: MobileMenu ? 999 : "",
        alignItems: MobileMenu ? "center" : "",
        // position: MobileMenu ? "absolute" : "",
        width: MobileMenu ? "100vw" : "",
        // backgroundImage: MobileMenu ? "url('https://firebasestorage.googleapis.com/v0/b/reactecom-e773e.appspot.com/o/assets%2F3dshapebg.jpg?alt=media&token=14cf8927-5600-42c0-8208-9546274495e8')" : "none",
        backgroundImage: MobileMenu ? "repeating-linear-gradient(45deg, transparent, transparent 32px, #474bff 32px, #474bff 64px)" : "",
        backgroundColor: MobileMenu ? "#47d3ff" : "",
        color: "black"
    }
    return (
        <>
            <header className='header'>
                <div className='container d_flexs nav-contain'>
                    <div className='catgrories d_flex'>
                        <span class='fas fa-border-all' style={{ color: "#a6adb9" }}></span>
                        <h4>
                            Categories <i className='fa fa-chevron-down'></i>
                        </h4>
                    </div>

                    <div className='navlink' style={navlinkStyle}>
                        <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)} style={MobileMenuStyle}>
                            <li>
                                <Link to='/' class="animate__animated animate__bounce">home</Link>
                            </li>
                            <li>
                                <Link to='/pages'>pages</Link>
                            </li>
                            <li>
                                <Link to='/user'>user account</Link>
                            </li>
                            <li>
                                <Link to='/vendor'>vendor account</Link>
                            </li>
                            <li>
                                <Link to='/track'>track my order</Link>
                            </li>
                            <li>
                                <Link to='/contact'>contact</Link>
                            </li>
                        </ul>
                        <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
                            {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
                        </button>

                    </div>

                </div>
            </header>
        </>
    )
}

export default Navbar
