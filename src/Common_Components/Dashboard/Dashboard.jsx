import React, { useState } from 'react'
import Card from '../../Components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getInquiryData } from '../../APIs/InquirySlice'
import { getEstimationData } from '../../APIs/EstimationSlice'
import { getCustomerData } from '../../APIs/CustomerSlice'
import { useCookies } from 'react-cookie'
import './Dashboard.css'
import { getUserLog } from '../../APIs/UserlogSlice'
import customersvgfirst from '../../assets/customer_svg_01.svg'
import customersvgsecond from '../../assets/customer_svg_02.svg'
import estimationsvgfirst from '../../assets/estimation_svg_01.svg'
import estimationsvgsecond from '../../assets/estimation_svg_02.svg'
import inquirysvgfirst from '../../assets/inquiry_svg_01.svg'
import inquirysvgsecond from '../../assets/inquiry_svg_02.svg'
import { FaUsers } from 'react-icons/fa'
import { TbReportSearch } from 'react-icons/tb'
import { HiMiniCalculator } from 'react-icons/hi2'
const Dashboard = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('Token');
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const CustomerData = useSelector((state) => state.Customer.CustomerData)
  const EstimationData = useSelector((state) => state.Estimation.EstimationData)
  const UserLog = useSelector((state) => state.UserLog.UserlogData)
  const [logToggle, setLogToggle]= useState(false)

  useEffect(() => {
    dispatch(getInquiryData(token))
    dispatch(getEstimationData(token))
    dispatch(getCustomerData(token))
    dispatch(getUserLog(token))
  }, [])
  const Customerstyle = {
    fontSize: '60px',
    borderRadius: '50%',
    color: "#0378e9",
    padding: '12px',
    backgroundColor: '#e4f5ff'
  }
  const inquiryStyle = {
    fontSize: '60px',
    borderRadius: '50%',
    color: "#8763f8",
    padding: '12px',
    backgroundColor: '#f5f0ff'
  }
  const estimationStyle = {
    fontSize: '60px',
    borderRadius: '50%',
    color: "#3cd856",
    padding: '12px',
    backgroundColor: '#ccecde'
  }
  return (
    <>
      <div className="dashboard-data-container">
        <div className="card-container">
          <Card
            title="Total Customer"
            count={CustomerData ? CustomerData.length : 0}
            path='/dashboard/settings/customer'
            svg2 ={customersvgsecond}
            icon={<FaUsers style={Customerstyle} />
            }
          />

          <Card title="Total Inquiry"
            count={InquiryData ? InquiryData.length : 0}
            path='/dashboard/sales/inquiry'
            svg2={inquirysvgfirst}
            icon={<TbReportSearch style={inquiryStyle} />}
          />
          <Card title="Total Estimation"
            count={EstimationData ? EstimationData.length : 0}
            path='/dashboard/sales/estimation'
            svg2={estimationsvgfirst}
            icon={<HiMiniCalculator style={estimationStyle} />}
          />
        </div>
        <div className='userlog-heading'><h4>{logToggle ? 'Collapse' : 'Expand '}&nbsp;<span style={{ color: "#2e8de1", borderBottom: "2px solid #2e8de1", cursor:"pointer" }} onClick={()=>setLogToggle(!logToggle)}>User Log</span></h4></div>
        <div className="log-container" style={{ display: logToggle ? 'block' : 'none' }}>
          <div className="userlog">
            <div className="userlog-data">
              {UserLog && UserLog.length > 0 ? (
                UserLog.slice().reverse().map((item, i) => {
                  // Determine which CSS class to apply based on whether the index is even or odd
                  const rowClass = i % 2 === 0 ? 'red-bg' : 'no-bg';

                  return (
                    <div key={i} className={rowClass}>
                      <p>{item.transactions_reference} by {item.user ? item.user.email : ''}</p>
                    </div>
                  );
                })
              ) : (
                // Handle the case when UserLog is empty or undefined
                <div>No data available</div>
              )}


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
