import React from 'react'
import logo from "../Assets/logo.png";
import profile from "../Assets/profile-1.jpg"
function AdminSidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-brand">
                <div className="brand-flex">
                    <img src={logo} style={{ width: "40px" }} alt="" />
                    <div className="brand-icons">
                        <span className='las la-bell'></span>
                        <span className='las la-user-circle'></span>
                    </div>
                </div>
            </div>
            <div className="sidebar-main">
                <div className="sidebar-user">
                    <img src={profile} alt="" />
                    <div>
                        <h3>SaM</h3>
                        <span>erayamcode2004@gmail.com</span>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <div className="menu-head">
                        <span>DashBoard</span>
                    </div>
                    <ul>
                        <li>
                            <a href="/admin/dashboard">
                                <span className="las la-balance-scale"></span>
                                Finance
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <span className="las la-chart-pie"></span>
                                Analytics
                            </a>
                        </li>
                    </ul>

                    <div className="menu-head">
                        <span>Applications</span>
                    </div>
                    <ul>
                        <li>
                            <a href="/admin/all-products">
                                <span className="las la-calendar"></span>
                                All Products
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <span className="las la-users"></span>
                                contacts
                            </a>
                        </li>
                        <li>
                            <a href="/admin/add-product">
                                <span className="las la-shopping-cart"></span>
                                Add Products
                            </a>
                        </li>
                        <li>
                            <a href="/admin/add-category">
                                <span className="las la-envelope"></span>
                                Add Category
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <span className="las la-check-circle"></span>
                                Tasks
                            </a>
                        </li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default AdminSidebar
