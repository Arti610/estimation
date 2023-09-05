import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaUserAlt, FaKey } from 'react-icons/fa'
import { BiUserCheck } from 'react-icons/bi'
import './Topbar.css'
import { useNavigate } from 'react-router-dom'
const Topbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="main-topbar">
                <div className="topbar-heading">
                    <h2>Estimation</h2>
                </div>
                <div className="topbar-profile">
                    <div className="profile">
                        <FaUserAlt />
                    </div>

                    <div className="topbar-user">
                        {/* <div className="topbar-user-element">
                            <div className="element-icon"> <BiUserCheck style={{ fontSize: '18px' }} /></div>
                            <div className="element-text"><p>Profile</p></div>
                        </div>
                        <div className="topbar-user-element" onClick={()=>navigate("/settings/changepassword")}>
                            <div className="element-icon"> <FaKey /> </div>
                            <div className="element-text" ><p>Change Password</p></div>
                        </div> */}
                        <div className="topbar-user-element" style={{ borderTop: "1px solid #c8c8c8", paddingTop: "3px" }}>
                            <div className="element-icon"><AiOutlineLogout style={{ fontSize: "16px" }} /> </div>
                            <div className="element-text"><p>Logout</p></div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Topbar