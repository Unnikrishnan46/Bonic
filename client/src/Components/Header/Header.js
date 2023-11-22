import React,{useEffect,useState} from 'react'
import Search from './Search'
import Navbar from './Navbar'
import Head from './Head'
import "./Header.css"

function Header({userData,handleSignOut}) {
    const [adminRoute,setAdminRoute] = useState(false)
    useEffect(()=>{
        if(window.location.pathname === '/admin'){
          setAdminRoute(true)
        }else{
          setAdminRoute(false)
        }
      },[])
    return (
        <>
            <Head />
            {adminRoute ? "" : <Search userData={userData} handleSignOut={handleSignOut}/> }
            <Navbar />
        </>
    )
}

export default Header
