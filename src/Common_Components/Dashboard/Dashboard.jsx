import React from 'react'
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
const Dashboard = () => {
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const CustomerData = useSelector((state) => state.Customer.CustomerData)
  const EstimationData = useSelector((state) => state.Estimation.EstimationData)
  const UserLog = useSelector((state) => state.UserLog.UserlogData)

  useEffect(() => {
    dispatch(getInquiryData(token))
    dispatch(getEstimationData(token))
    dispatch(getCustomerData(token))
    dispatch(getUserLog(token))
  }, [])
  return (
    <>
      <div className="card-container">
        <Card title="Total Customer" count={CustomerData ? CustomerData.length : 0} svg1={customersvgfirst} svg2={customersvgsecond} pic="https://th.bing.com/th/id/OIP.jDXaAhD9ijyiFihWNqFAYQHaGg?pid=ImgDet&rs=1" path='/settings/customer' />
        <Card title="Total Inquiry" count={InquiryData ? InquiryData.length : 0} svg1={inquirysvgfirst} svg2={inquirysvgsecond} pic="https://th.bing.com/th/id/OIP.w6TN1JaDuyED5jdvtFZC_wHaHa?pid=ImgDet&rs=1" path='/sales/inquiry' />
        <Card title="Total Estimation" count={EstimationData ? EstimationData.length : 0} svg1={estimationsvgfirst} svg2={estimationsvgsecond} pic='https://cdn1.iconfinder.com/data/icons/engineering-aesthetics-vol-1/256/Estimate-512.png' path='/sales/estimation' />
      </div>

      {/* <div className="log-container">
      <div className="userlog">
            <div className='userlog-heading'>  <h4>helo</h4></div>
             <div className="userlog-data">
             {UserLog ?UserLog.slice().reverse().map((item, i)=>{
              
              return(
              <div key={i} >
                 <p>{item.transactions_reference} by {item.user.email}</p>
              </div>
              )
            }):"No Logs Available"}
             </div>
            </div>
      </div> */}
    </>
  )
}

export default Dashboard

// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard