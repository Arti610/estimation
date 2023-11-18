import React, { useState } from 'react'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getInquiryData } from '../../APIs/InquirySlice'
import { getEstimationData } from '../../APIs/EstimationSlice'
import { getCustomerData } from '../../APIs/CustomerSlice'
import { useCookies } from 'react-cookie'
import './Dashboard.css'
import { PiUsersFourBold } from "react-icons/pi";
import { getUserLog } from '../../APIs/UserlogSlice'
import customersvgfirst from '../../assets/customer_svg_01.svg'
import customersvgsecond from '../../assets/customer_svg_02.svg'
import estimationsvgfirst from '../../assets/estimation_svg_01.svg'
import estimationsvgsecond from '../../assets/estimation_svg_02.svg'
import inquirysvgfirst from '../../assets/inquiry_svg_01.svg'
import inquirysvgsecond from '../../assets/inquiry_svg_02.svg'
import { FaBriefcase, FaUsers } from 'react-icons/fa'
import { TbReportSearch } from 'react-icons/tb'
import { HiMiniCalculator } from 'react-icons/hi2'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { CgMenuGridR } from 'react-icons/cg'
import { getCatelogueData } from '../../APIs/CatelogueSlice'
import { getEmployerData } from '../../APIs/EmployerSlice'
import { getUserData } from '../../APIs/UserSlice'
const Dashboard = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('Token');
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const CustomerData = useSelector((state) => state.Customer.CustomerData)
  const EstimationData = useSelector((state) => state.Estimation.EstimationData)
  const UserLog = useSelector((state) => state.UserLog.UserlogData)
  const UserData = useSelector((state) => state.User.UserData)
  const EmployerData = useSelector((state) => state.Employer.EmployerData)
  const CatalogueData = useSelector((state) => state.Catelogue.CatelogueData)
 

  useEffect(() => {
    dispatch(getInquiryData(token))
    dispatch(getEstimationData(token))
    dispatch(getCustomerData(token))
    dispatch(getCatelogueData(token))
    dispatch(getEmployerData(token))
    dispatch(getUserData(token))
    dispatch(getUserLog(token))
  }, [])

  return (
    <>
      <div className='registration-card-container'>
          <Card url = "/dashboard/sales/catelogue" text = "Catalogue" icon = {<CgMenuGridR/>} count = {CatalogueData ? CatalogueData.length : 0}/> 
          <Card url = "/dashboard/sales/inquiry" text = "Inquiries" icon = {<TbReportSearch/>} count = {InquiryData ? InquiryData.length : 0}/>
          <Card url = "/dashboard/sales/estimation" text = "Estimation" icon = {<HiMiniCalculator/>} count = {EstimationData ? EstimationData.length : 0}/>
          <Card url = "/dashboard/settings/users" text = "Users" icon = {<PiUsersFourBold />} count = {UserData ? UserData.length : 0}/>
          <Card url = "/dashboard/settings/customer" text = "Customers" icon={<FaUsers/>} count = {CustomerData ?  CustomerData.length : 0}/>
          <Card url = "/dashboard/settings/employer" text = "Employer" icon={<FaBriefcase/>} count = {EmployerData ? EmployerData.length : 0}/>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Dashboard
