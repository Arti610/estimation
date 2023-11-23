import React from 'react'
import "../Estimation/PrintEstimation.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getupdateInquiryData } from '../../APIs/InquirySlice';


const PrintInvoice = () => {

    const token = localStorage.getItem('Token');
    const userDetailsString = localStorage.getItem('UserData')
    const userDetails = JSON.parse(userDetailsString)

    const dispatch = useDispatch()
    const { printId } = useParams()

    const InvoiceData = useSelector((state) => state.Inquiry.updateInquiryData)
    console.log("InvoiceData", InvoiceData);

    useEffect(() => {
        dispatch(getupdateInquiryData({ id: printId, token }))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            window.print()
        }, 3000);
    })

    return (
        <>
            <header className='header-print'>

            </header>

            <main className='main-print'>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <span class="header-space">
                                    <table className="header-print" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                        <tbody>
                                            {/* {apilogo ? <img style={{ height: "80px", width: "auto" }} src={ImgUrl.apilogo} alt="company logo not uploded" /> : "company logo not uploaded"} */}
                                            {/* <img style={{height:"80px", width:"auto"}}  alt="User Image" /> */}
                                            {/* <h3>{userDetails && userDetails.first_name ? userDetails.first_name : "User Name"}</h3> */}
                                            <h2 >INVOICE</h2>
                                        </tbody>
                                    </table>
                                </span>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                {/* Body for printing */}
                                <div className="print-content" >
                                    <table className='quotation-table ' >
                                        <tbody>
                                            <div>
                                                <div className='q-user-detaill'>
                                                    <div>
                                                        <div style={{ marginBlock: "10px" }}>
                                                            <tr>
                                                                <td style={{ fontWeight: "bold" }}>Inquiry Date</td>
                                                                <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.inquirydate ? InvoiceData.inquiry.inquirydate : null}</td>
                                                            </tr>
                                                        </div>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Client Reference Number</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.client_reference_no ? InvoiceData.inquiry.client_reference_no : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Name</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.customer.name ? InvoiceData.inquiry.customer.name : null}</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.email}</td> */}
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Email</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.payment_terms}</td> */}
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.customer.email ? InvoiceData.inquiry.customer.email : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Phone Number</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.payment_terms}</td> */}
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.customer.mobile_number ? InvoiceData.inquiry.customer.mobile_number : null}</td>
                                                        </tr>
                                                        <tr >
                                                            <td style={{ fontWeight: "bold" }}>Address</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.customer.address ? InvoiceData.inquiry.customer.address : null}</td>
                                                            {/* <span><b>&nbsp;:</b>&nbsp;&nbsp;&nbsp;{data.address}</span> */}
                                                        </tr>
                                                                                                         

                                                    </div>
                                                    <div style={{ textAlign: "left", width: "20rem" }}>
                                                        <div style={{ marginBlock: "10px" }}>
                                                            <tr style={{ marginBlock: "10px" }}>
                                                                <td style={{ fontWeight: "bold" }}>Submission Date </td>
                                                                <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.submission_date ? InvoiceData.inquiry.submission_date : null}</td>
                                                            </tr>
                                                        </div>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>TRN Number</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.customer.trn_number ? InvoiceData.inquiry.customer.trn_number : null}</td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Employer</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.employer.name ? InvoiceData.inquiry.employer.name : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Estimator</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.estimator.first_name + InvoiceData.inquiry.estimator.last_name ? InvoiceData.inquiry.estimator.first_name + InvoiceData.inquiry.estimator.last_name : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Sales Man</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{InvoiceData && InvoiceData.inquiry && InvoiceData.inquiry.salesman.first_name + InvoiceData.inquiry.salesman.last_name ? InvoiceData.inquiry.salesman.first_name + InvoiceData.inquiry.salesman.last_name : null}</td>
                                                        </tr>


                                                    </div>
                                                </div>

                                            </div>


                                        </tbody>
                                    </table >

                                    {/* <h2>Services</h2> */}
                                    <table className='quotation-detail-table'>
                                        <thead className='table-list'>
                                            <tr>
                                                <th>BOQ Number</th>
                                                <th>BOQ Description</th>
                                                <th>Unit</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className='q-service-body'>
                                            {InvoiceData && InvoiceData.detail?.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ paddingLeft: "8px" }}>{item.boq_number ? item.boq_number : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.boq_description ? item.boq_description : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.unit ? item.unit : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.quantity ? item.quantity : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.rate ? item.rate : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.total_price ? item.total_price : 0}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    {/* calculation table here */}

                                    {/* <div className='amount-detail'>
                                        <tr>
                                            <td style={{ fontWeight: "bold", paddingRight: "20px" }}>Net Total</td>
                                            <td>{InvoiceData && InvoiceData.NetTotal ? InvoiceData.NetTotal : 0}</td>
                                        </tr>

                                    </div> */}
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <>
                                <span class="footer-space">
                                    <table className="footer-print" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderTop: "2px solid", width: "100%" }}>
                                        <tbody>

                                            Generate by&nbsp;&nbsp;<strong>{userDetails && userDetails.first_name + userDetails.last_name ? userDetails.first_name + userDetails.last_name : "Name"}</strong>
                                            <p><span><strong>Phone :</strong>&nbsp;&nbsp;{userDetails && userDetails.phone_number ? userDetails.phone_number : "Phone No"}</span>&nbsp;&nbsp;|&nbsp;&nbsp;{userDetails && userDetails.address ? userDetails.address : "Address"}</p>
                                            <p><span><strong>Email :</strong>&nbsp;&nbsp;{userDetails && userDetails.email ? userDetails.email : "Email"}</span></p>
                                        </tbody>
                                    </table>
                                </span>
                            </>
                        </tr>
                    </tfoot>
                </table>
            </main>

            <footer className='footer-print'>

            </footer>
        </>
    )
}

export default PrintInvoice