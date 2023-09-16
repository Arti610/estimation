import React from 'react';
import "./Sidebar.css";
import { AiFillDashboard, AiFillSetting, AiOutlineCustomerService, AiOutlineUserSwitch, AiFillAccountBook, AiOutlineContacts, AiOutlineRobot, AiFillSignal } from 'react-icons/ai';
import { FaAngleDown, FaAngleRight, FaUsers } from 'react-icons/fa';
import { MdLocalFireDepartment, MdRealEstateAgent } from 'react-icons/md';
import { HiReceiptTax } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';

const Sidebar = () => {
    const navigate = useNavigate();
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
                    <Link to="/dashboard" className={`sidebar-element ${isLinkActive("/dashboard") ? 'active' : ''}`}>
                        <div className="sidebar-icons"><AiFillDashboard /></div>
                        <div className="sidebar-title">Dashboard</div>
                    </Link>
                    <Link to="/dashboard/sales" className={`sidebar-element sidebar-element-sales ${isLinkActive("/dashboard/sales") ? 'active' : ''}`}>
                        <div className='sidebar-icons'><AiFillSignal /></div>
                        <div className="sidebar-title">Sales</div>
                        <div className="sidebar-submenus">
                            <Link to="/dashboard/sales/catelogue" className="submenu">
                                <div className="submenu-icons"><AiOutlineRobot /></div>
                                <div className="submenu-title">Catelogue</div>
                            </Link>
                            <Link to="/dashboard/sales/inquiry" className="submenu">
                                <div className="submenu-icons"><AiOutlineRobot /></div>
                                <div className="submenu-title">Inquiry</div>
                            </Link>
                            <Link to="/dashboard/sales/estimation" className="submenu">
                                <div className="submenu-icons"><AiFillAccountBook /></div>
                                <div className="submenu-title">Estimation</div>
                            </Link>
                        </div>
                    </Link>
                    <Link to="/dashboard/settings" className={`sidebar-element sidebar-element-sales ${isLinkActive("/dashboard/settings") ? 'active' : ''}`}>
                    {/* <div className={`sidebar-element sidebar-element-sales ${isLinkActive("/settings/customer") || isLinkActive("/settings/employer") || isLinkActive("/settings/department") || isLinkActive("/settings/source-of-inquiry") || isLinkActive("/settings/users") || isLinkActive("/settings/tax") || isLinkActive("/settings/tax-agencies") ? 'active' : ''}`}> */}
                        <div className="sidebar-icons"><AiFillSetting /></div>
                        <div className="sidebar-title">Settings</div>
                        <div className="sidebar-submenus">
                            <Link to="/dashboard/settings/customer" className="submenu">
                                <div className="submenu-icons"><AiOutlineCustomerService /></div>
                                <div className="submenu-title">Customer</div>
                            </Link>
                            <Link to="/dashboard/settings/employer" className="submenu">
                                <div className="submenu-icons"><AiOutlineUserSwitch /></div>
                                <div className="submenu-title">Employer</div>
                            </Link>
                            <Link to="/dashboard/settings/department" className="submenu">
                                <div className="submenu-icons"><MdLocalFireDepartment /></div>
                                <div className="submenu-title">Department</div>
                            </Link>
                            <Link to="/dashboard/settings/source-of-inquiry" className="submenu">
                                <div className="submenu-icons"><AiOutlineContacts /></div>
                                <div className="submenu-title">Source of Inquiry</div>
                            </Link>
                            <Link to="/dashboard/settings/users" className="submenu">
                                <div className="submenu-icons"><FaUsers /></div>
                                <div className="submenu-title">Users</div>
                            </Link>
                            <Link to="/dashboard/settings/tax" className="submenu">
                                <div className="submenu-icons"><MdRealEstateAgent /></div>
                                <div className="submenu-title">Tax</div>
                            </Link>
                            <Link to="/dashboard/settings/tax-agencies" className="submenu">
                                <div className="submenu-icons"><HiReceiptTax /></div>
                                <div className="submenu-title">Tax Agency</div>
                            </Link>
                        </div>
                    {/* </div> */}
                    </Link>
                </div>
                <div className="contentbar"><Outlet /></div>
            </div>
        </div>
    );
};

export default Sidebar;
