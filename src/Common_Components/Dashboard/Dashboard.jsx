import React, { useState } from 'react'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getInquiryData } from '../../APIs/InquirySlice'
import { getEstimationData } from '../../APIs/EstimationSlice'
import { getCustomerData } from '../../APIs/CustomerSlice'
import './Dashboard.css'
import { PiUsersFourBold } from "react-icons/pi";
import { getUserLog } from '../../APIs/UserlogSlice'
import { FaBriefcase, FaUsers } from 'react-icons/fa'
import { TbReportSearch } from 'react-icons/tb'
import { HiMiniCalculator } from 'react-icons/hi2'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { CgMenuGridR } from 'react-icons/cg'
import { getCatelogueData } from '../../APIs/CatelogueSlice'
import { getEmployerData } from '../../APIs/EmployerSlice'
import { getUserData, getupdateUserData } from '../../APIs/UserSlice'
import { ImgUrl } from '../../Config/Config'
import { userLogout } from '../../APIs/LoginSlice'
import { AiFillCheckCircle } from 'react-icons/ai'
const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const CustomerData = useSelector((state) => state.Customer.CustomerData)
  const EstimationData = useSelector((state) => state.Estimation.EstimationData)
  const UserLog = useSelector((state) => state.UserLog.UserlogData)
  const UserData = useSelector((state) => state.User.UserData)
  const EmployerData = useSelector((state) => state.Employer.EmployerData)
  const CatalogueData = useSelector((state) => state.Catelogue.CatelogueData)
  console.log("UserLog", UserLog);
  const token = localStorage.getItem('Token');
  // Retrieve user data from localStorage
  const userDetailsString = localStorage.getItem('UserData');
  // Parse the JSON string to get an object
  const userDetails = JSON.parse(userDetailsString);


  const editProfile = () => {
    const id = userDetails.id

    if (id) {
      dispatch(getupdateUserData({ id: id, token }))
      navigate(`/dashboard/edit-profile/${id}`)
    }
  }

  useEffect(() => {
    dispatch(getInquiryData(token))
    dispatch(getEstimationData(token))
    dispatch(getCustomerData(token))
    dispatch(getCatelogueData(token))
    dispatch(getEmployerData(token))
    dispatch(getUserData(token))
    dispatch(getUserLog(token))
    dispatch(getupdateUserData({id: userDetails.id, token}))
  }, [])

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-left-container">
          <div className="registration-card-wrapper">
            <h1 className="dashboard-header">My Registrations</h1>
            <div className='registration-card-container'>
              <Card url="/dashboard/sales/catelogue" text="Catalogue" icon={<CgMenuGridR />} count={CatalogueData ? CatalogueData.length : 0} />
              <Card url="/dashboard/sales/inquiry" text="Inquiries" icon={<TbReportSearch />} count={InquiryData ? InquiryData.length : 0} />
              <Card url="/dashboard/sales/estimation" text="Estimation" icon={<HiMiniCalculator />} count={EstimationData ? EstimationData.length : 0} />
              <Card url="/dashboard/settings/users" text="Users" icon={<PiUsersFourBold />} count={UserData ? UserData.length : 0} />
              <Card url="/dashboard/settings/customer" text="Customers" icon={<FaUsers />} count={CustomerData ? CustomerData.length : 0} />
              <Card url="/dashboard/settings/employer" text="Employer" icon={<FaBriefcase />} count={EmployerData ? EmployerData.length : 0} />
            </div>
          </div>
          <div className="status-container">
            <div className="registration-card-wrapper">
              <h1 className="dashboard-header">User Log</h1>
              <div className='userlog-container'>
              {UserLog ? UserLog.data.slice().reverse().map((item, i) => {
                  return (
                    <>
                      <p>
                        <span>{item.transactions_reference}</span>
                        {/* <span>at&nbsp;{new Date(item.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(/(\d{1,2}\/\d{1,2}\/\d{4}), (\d{1,2}:\d{1,2}:\d{1,2})/, '$1 $2')}</span> */}
                        <span>at {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Etc/GMT',
                      }).format(new Date(item.timestamp))}</span>
                      </p>

                    </>
                  )
                }) : "No logs available"}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-right-container">
          <div className="user-dp-container">
            <div className="imgBx">
              <img src={`${ImgUrl}${userDetails && userDetails.profile_image ? userDetails.profile_image : null}`} alt="" />
            </div>
            <div className="user-detail-container">
              <h4>Hello, <span>{`${userDetails && userDetails.first_name ? userDetails.first_name : "User"} ${userDetails && userDetails.last_name ? userDetails.last_name : "Name"}`}</span> </h4>
              <button onClick={editProfile}>
                <div>
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  <span>My Account</span>
                </div>
              </button>
              <button onClick={editProfile}>
                <div>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linejoin="round" stroke-width="32" d="M218.1 167.17c0 13 0 25.6 4.1 37.4-43.1 50.6-156.9 184.3-167.5 194.5a20.17 20.17 0 00-6.7 15c0 8.5 5.2 16.7 9.6 21.3 6.6 6.9 34.8 33 40 28 15.4-15 18.5-19 24.8-25.2 9.5-9.3-1-28.3 2.3-36s6.8-9.2 12.5-10.4 15.8 2.9 23.7 3c8.3.1 12.8-3.4 19-9.2 5-4.6 8.6-8.9 8.7-15.6.2-9-12.8-20.9-3.1-30.4s23.7 6.2 34 5 22.8-15.5 24.1-21.6-11.7-21.8-9.7-30.7c.7-3 6.8-10 11.4-11s25 6.9 29.6 5.9c5.6-1.2 12.1-7.1 17.4-10.4 15.5 6.7 29.6 9.4 47.7 9.4 68.5 0 124-53.4 124-119.2S408.5 48 340 48s-121.9 53.37-121.9 119.17zM400 144a32 32 0 11-32-32 32 32 0 0132 32z"></path></svg>
                  <span>Change Password</span>
                </div>
              </button>
              <p>Status :&nbsp;<AiFillCheckCircle />&nbsp;<span>{userDetails && userDetails.account_status ? userDetails.account_status : "Account Status"}</span> </p>

            </div>
          </div>
        </div>


      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboard
