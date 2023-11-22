import React from 'react'
import './PrintEstimation.css'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getupdateEstimationData } from '../../APIs/EstimationSlice';


const PrintEstimation = () => {

    const token = localStorage.getItem('Token');
    const userDetailsString = localStorage.getItem('UserData')
    const userDetails = JSON.parse(userDetailsString)

    const dispatch = useDispatch()
    const { printId } = useParams()

    const EstimationData = useSelector((state) => state.Estimation.updateEstimationData)
    console.log("EstimationData", EstimationData);

    useEffect(() => {
        window.print()
        dispatch(getupdateEstimationData({ id: printId, token }))
    }, [])
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
                                            <div style={{ textAlign: "center" }}>  <h2 >ESTIMATE</h2></div>

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
                                                                <td style={{ fontWeight: "bold" }}>Estimation Date</td>
                                                                <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.estimation_date ? EstimationData.estimation_header.estimation_date : null}</td>
                                                            </tr>
                                                        </div>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Customer Name</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.name ? EstimationData.estimation_header.inquiry_no.customer.name : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Email</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.email ? EstimationData.estimation_header.inquiry_no.customer.email : null}</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.email}</td> */}
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>TRN Number</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.payment_terms}</td> */}
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.trn_number ? EstimationData.estimation_header.inquiry_no.customer.trn_number : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Employer</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.employer.name ? EstimationData.estimation_header.inquiry_no.employer.name : null}</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.total_days}</td> */}
                                                        </tr>
                                                    </div>
                                                    <div style={{ textAlign: "left", width: "20rem" }}>
                                                        <div style={{ marginBlock: "10px" }}>
                                                            <tr style={{ marginBlock: "10px" }}>
                                                                <td style={{ fontWeight: "bold" }}>Inquiry Date </td>
                                                                <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.inquirydate ? EstimationData.estimation_header.inquiry_no.inquirydate : null}</td>
                                                            </tr>
                                                        </div>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Contact Person</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.city}</td> */}
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.contact_person ? EstimationData.estimation_header.inquiry_no.customer.contact_person : null}</td>
                                                        </tr>
                                                        <tr >
                                                            <td style={{ fontWeight: "bold" }}>Address</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.address ? EstimationData.estimation_header.inquiry_no.customer.address : null}</td>
                                                            {/* <span><b>&nbsp;:</b>&nbsp;&nbsp;&nbsp;{data.address}</span> */}
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Country</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.country ? EstimationData.estimation_header.inquiry_no.customer.country : null}</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.country}</td> */}
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "bold" }}>Phone</td>
                                                            <td><b>&nbsp;:&nbsp;</b>{EstimationData && EstimationData.estimation_header && EstimationData.estimation_header.inquiry_no.customer.mobile_number ? EstimationData.estimation_header.inquiry_no.customer.mobile_number : null}</td>
                                                            {/* <td><b>&nbsp;:&nbsp;&nbsp;&nbsp;</b>{data.phone}</td> */}
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
                                                <th>Unit</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Total Amount</th>
                                                <th>Estimation Rate</th>
                                                <th>Markup</th>
                                                <th>Taxable</th>
                                                <th>VAT Type</th>
                                                <th>VAT Percent</th>
                                                <th>Sales Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className='q-service-body'>
                                            {EstimationData && EstimationData.estimation_details?.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ paddingLeft: "8px" }}>{item.inquirydetail.boq_number ? item.inquirydetail.boq_number : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.inquirydetail.unit ? item.inquirydetail.unit : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.inquirydetail.quantity ? item.inquirydetail.quantity : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.inquirydetail.rate ? item.inquirydetail.rate : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.inquirydetail.total_price ? item.inquirydetail.total_price : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.estimation_rate ? item.estimation_rate : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.markup ? item.markup : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.taxable ? item.taxable : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.vat_tax.name ? item.vat_tax.name : null}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.vat_tax.rate ? item.vat_tax.rate : 0}</td>
                                                    <td style={{ paddingLeft: "8px" }}>{item.salesprice ? item.salesprice : 0}</td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                    {/* calculation table here */}

                                    <div className='amount-detail'>
                                        <tr>
                                            <td style={{ fontWeight: "bold", paddingRight: "20px" }}>Net Total</td>
                                            <td>{EstimationData && EstimationData.NetTotal ? EstimationData.NetTotal : 0}</td>
                                        </tr>

                                    </div>
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
                                            
                                            Printed by&nbsp;&nbsp;<strong>{userDetails && userDetails.first_name + userDetails.last_name ? userDetails.first_name + userDetails.last_name :"Name"}</strong>
                                            <p><span><strong>Phone :</strong>&nbsp;&nbsp;{userDetails && userDetails.phone_number ? userDetails.phone_number : "Phone No"}</span>&nbsp;&nbsp;|&nbsp;&nbsp;{userDetails && userDetails.address ? userDetails.address :  "Address"}</p>
                                            <p><span><strong>Email :</strong>&nbsp;&nbsp;{userDetails && userDetails.email ? userDetails.email :"Email"}</span></p>
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

export default PrintEstimation