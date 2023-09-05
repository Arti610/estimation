import React, { useState } from 'react'
import "./Sidebar.css"
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai"
import { AiFillSetting, AiOutlineUserSwitch, AiFillAccountBook, AiOutlineContacts, AiOutlineRobot, AiFillSignal, AiOutlineCustomerService } from 'react-icons/ai'
import { FaAngleDown, FaAngleRight, FaUsers } from 'react-icons/fa'
import { MdLocalFireDepartment, MdRealEstateAgent } from 'react-icons/md'
import { HiReceiptTax } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Topbar from '../Topbar/Topbar'

const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation();

    // Function to determine if a link is active
    const isLinkActive = (path) => {
        return location.pathname === path;
    };
    return (
        <div className="main-container">
            <div className="topbar-container">
                <div className="topbar">
                    <Topbar />
                </div>
            </div>
            <div className="content-container">
                <div className="sidebar">
                    <div className={`sidebar-element ${isLinkActive("/dashboard") ? 'active' : ''}`} onClick={() => navigate("/dashboard")}>
                        <div className="sidebar-icons " ><AiFillDashboard /></div>
                        <div className="sidebar-title">Dashboard</div>

                    </div>
                    <div className={`sidebar-element sidebar-element-sales ${isLinkActive("/sales/catelogue") || isLinkActive("/sales/inquiry") || isLinkActive("/sales/estimation") ? 'active' : ''}`} >
                        <div className='sidebar-icons'><AiFillSignal /></div>
                        <div className="sidebar-title">Sales</div>
                        <div className="sidebar-submenus">
                            <div className="submenu" onClick={() => navigate("/sales/catelogue")}>
                                <div className="submenu-icons"><AiOutlineRobot /></div>
                                <div className="submenu-title">Catelogue</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/sales/inquiry")}>
                                <div className="submenu-icons"><AiOutlineRobot /></div>
                                <div className="submenu-title">Inquiry</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/sales/estimation")}>
                                <div className="submenu-icons"><AiFillAccountBook /></div>
                                <div className="submenu-title">Estimation</div>
                            </div>
                        </div>
                    </div>
                    <div className={`sidebar-element sidebar-element-sales ${isLinkActive("/settings/customer") || isLinkActive("/settings/employer") || isLinkActive("/settings/department") || isLinkActive("/settings/source-of-inquiry") || isLinkActive("/settings/users") || isLinkActive("/settings/tax") || isLinkActive("/settings/tax-agencies") ? 'active' : ''}`}>
                        <div className="sidebar-icons"><AiFillSetting /></div>
                        <div className="sidebar-title">Settings</div>
                        <div className="sidebar-submenus">
                            <div className="submenu" onClick={() => navigate("/settings/customer")}>
                                <div className="submenu-icons"><AiOutlineCustomerService /></div>
                                <div className="submenu-title">Customer</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/employer")}>
                                <div className="submenu-icons"><AiOutlineUserSwitch /></div>
                                <div className="submenu-title">Employer</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/department")}>
                                <div className="submenu-icons"><MdLocalFireDepartment /></div>
                                <div className="submenu-title">Department</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/source-of-inquiry")}>
                                <div className="submenu-icons"><AiOutlineContacts /></div>
                                <div className="submenu-title">Source of Inquiry</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/users")}>
                                <div className="submenu-icons"><FaUsers /></div>
                                <div className="submenu-title">Users</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/tax")}>
                                <div className="submenu-icons"><MdRealEstateAgent /></div>
                                <div className="submenu-title">Tax</div>
                            </div>
                            <div className="submenu" onClick={() => navigate("/settings/tax-agencies")}>
                                <div className="submenu-icons"><HiReceiptTax /></div>
                                <div className="submenu-title">Tax Agency</div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="contentbar"><Outlet /></div>
            </div>
        </div>
    );
};

export default Sidebar;
