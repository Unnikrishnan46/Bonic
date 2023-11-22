import React, { useState } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import "./Dashboard.css"

function Dashboard() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    console.log("working")
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (sidebar && mainContent) {
      sidebar.style.left = event.target.checked ? "-100%" : "0";
      mainContent.style.marginLeft = event.target.checked ? "0" : "";
      const mainContentHeader = mainContent.querySelector("header");
      if (mainContentHeader) { 
        mainContentHeader.style.left = event.target.checked ? "0" : "";
        mainContentHeader.style.width = event.target.checked ? "100%" : "";
        mainContentHeader.style.right = event.target.checked ? "0" : "";
      }
    }
  };

  const handleToggleClick = () => {
    setCheckboxChecked(!checkboxChecked);
    handleCheckboxChange({ target: { checked: !checkboxChecked } });
  };


  return (
    <>
      <AdminSidebar />
      <input type="checkbox" name='' id='sidebar-toggle' onChange={handleCheckboxChange} checked={checkboxChecked} />
      <label htmlFor="sidebar-toggle" className='body-label' onClick={handleToggleClick}></label>
    </>
  )
}

export default Dashboard
