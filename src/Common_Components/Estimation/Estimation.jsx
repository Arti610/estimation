import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Box, Grid, Modal, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import './Estimation.css'
import { useCookies } from 'react-cookie';
import { createEstimationData, createEstimationResourceData, updateEstimationData } from '../../APIs/EstimationSlice'
import { getInquiryData, getupdateInquiryData } from '../../APIs/InquirySlice';
import './Estimation.css'
import { RxCross2 } from "react-icons/rx";
import { getCatelogueData, getupdateCatelogueData } from '../../APIs/CatelogueSlice';
import { ImgUrl } from '../../Config/Config';

const Estimation = () => {
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "10px",
    height: "fit-content",
    overflow: "auto",
    "@media (max-width: 576px)": {
      width: "90%",
    },
  };
  const CateStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "1100px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    // border: "1px solid #6e85b7",
    borderRadius: "10px",
    height: "fit-content",
    overflow: "auto",
    height: "550px",
    "@media (max-width: 576px)": {
      width: "90%",
    },
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fData = new FormData();

  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
  const Inquiry = useSelector((state) => state.Inquiry.InquiryData)
  const InquiryData = useSelector((state) => state.Inquiry.updateInquiryData)
  // console.log("InquiryData",InquiryData.detail);
  const updatedEstimation = useSelector((state) => state.Estimation.updateUserData)
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);
  const [formData, setFormData] = useState({
    inquiry_no: null,
    client_reference_no: null,
    detail: [
      {
        id: null,
        boq_number: null,
        boq_description: null,
        unit: null,
        quantity: null,
        rate: null,
        total_price: null,
        inquiryno: null
      }
    ]
  })
  const [estiFormData, setEstiFormData] = useState({
    // quantity: null,
    // listPrice: null,
    // discount: null,
    // vatPercent: null,
    // estimatedRate: null,
    quantity: 0,
    list_price: 0,
    estimation_rate: 0,
  })
  const [erModal, setErModal] = useState(false)
  const openERModal = () => {
    setErModal(true)
  }
  const closeERModal = () => {
    setErModal(false)
  }
  const handleModalOpen = () => {
    openERModal()
  }
  const handleSave = () => {
  
  }
  const handleClick = (id) => {
    dispatch(getupdateCatelogueData({ id, token }))
    setCateModalOpen(false)
  }
  const handleAddMore = () => {
    setEstiFormData((prevData) => ({
      ...prevData,
      item_name: [...prevData.item_name, null],
    }));
  };
  const [cateModalOpen, setCateModalOpen] = useState(false)

  const handleModalInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleAutoComplete = (newValue, fieldName) => {
    const selectedValue = newValue ? newValue.id : null;
    dispatch(getupdateInquiryData({ token, id: newValue.id }))
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedValue,
    }));
  };
  const handleChange = (e) => {

    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangePrice = (name, value) => {
    setEstiFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0, // Convert the value to a number or set it to 0 if it's not a valid number
      estimation_rate: calculateEstimatedRate(parseFloat(value) || 0),
    }));
  };

  const calculateEstimatedRate = () => {
    const quantity = parseFloat(estiFormData.quantity) || 0;
    const listPrice = parseFloat(CatelogueData && CatelogueData.catelouge.list_price) || 0;
    const discount = parseFloat(CatelogueData && CatelogueData.catelouge.discount) || 0;
    const vatPercent = parseFloat(CatelogueData && CatelogueData.catelouge.tax.rate) || 0;

    const estimatedRate =
      quantity * listPrice - discount + ((quantity * listPrice - discount) / 100) * vatPercent;

    return estimatedRate;
  };
  useEffect(() => {
    const newEstimatedRate = calculateEstimatedRate();
    setEstiFormData((prevData) => ({
      ...prevData,
      estimation_rate: newEstimatedRate,
    }));
  }, [estiFormData.quantity, CatelogueData]);

  // const estiHandleSubmit = (e)=>{
  //   e.preventDefault()
  //   InquiryData.detail.forEach((file, index) => {
  //     fData.append(`inquiry_detail`, file.id);
  //   });
  //   // fData.append("inquiry_detail", InquiryData.detail.id);
  //   fData.append("item", CatelogueData.catelouge.id);
  //   fData.append("quantity", estiFormData.quantity);
  //   // fData.append("total_price", estiFormData.total_price);
  //   fData.append("estimation_rate", estiFormData.estimation_rate);
  //   dispatch(createEstimationResourceData({fData, token}))
  // }
  const estiHandleSubmit = (e, index) => {
    e.preventDefault();
    // Get the ID of the specific inquiry_detail at the given index
    const inquiryDetailId = InquiryData.detail[index].id;
    // Append the specific ID to your FormData
    fData.append("inquiry_detail", inquiryDetailId);
    fData.append("item", CatelogueData.catelouge.id);
    fData.append("quantity", estiFormData.quantity);
    fData.append("estimation_rate", estiFormData.estimation_rate);
    dispatch(createEstimationResourceData({ fData, token }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (updatedEstimation) {
      fData.append("client_reference_no", formData.client_reference_no);
      fData.append("Estimationdate", formData.Estimationdate);
      fData.append("submission_date", formData.submission_date);
      fData.append("customer", formData.customer);
      fData.append("employer", formData.employer);
      fData.append("source_of_Estimation", formData.source_of_Estimation);
      fData.append("department", formData.department);
      fData.append("estimator", formData.estimator);
      fData.append("salesman", formData.salesman);
      fData.append("scope_of_work", formData.scope_of_work);
      if (formData.attachments) {
        fData.append("attachments", formData.attachments);
      }
      dispatch(updateEstimationData({ fData, token, id: updatedEstimation.id }))
      alert("updated successfully")
      navigate("/settings/Estimation")
    } else {
      fData.append("client_reference_no", formData.client_reference_no);
      fData.append("Estimationdate", formData.Estimationdate);
      fData.append("submission_date", formData.submission_date);
      fData.append("customer", formData.customer);
      fData.append("employer", formData.employer);
      fData.append("source_of_Estimation", formData.source_of_Estimation);
      fData.append("department", formData.department);
      fData.append("estimator", formData.estimator);
      fData.append("salesman", formData.salesman);
      fData.append("scope_of_work", formData.scope_of_work);
      if (formData.attachments) {
        fData.append("attachments", formData.attachments);
      }
      formData.details.forEach((file, index) => {
        fData.append(`boq_number`, file.boq_number);
        fData.append(`boq_description`, file.boq_description);
        fData.append(`unit`, file.unit);
        fData.append(`quantity`, file.quantity);
        fData.append(`rate`, file.rate);
        fData.append(`total_price`, file.total_price);
      });
      dispatch(createEstimationData({ fData, token }))
      alert("created successfully")
      navigate("/sales/Estimation")

    }
  }

  useEffect(() => {
    AOS.init();
    dispatch(getInquiryData(token))
    dispatch(getCatelogueData(token))
    dispatch(updateEstimationData(token))
    if (updatedEstimation) {
      setFormData({
        client_reference_no: updatedEstimation.client_reference_no,
        Estimationdate: updatedEstimation.Estimationdate,
        submission_date: updatedEstimation.submission_date,
        customer: String(updatedEstimation.customer.id),
        employer: String(updatedEstimation.employer.id),
        source_of_Estimation: String(updatedEstimation.source_of_Estimation.id),
        department: String(updatedEstimation.department.id),
        estimator: String(updatedEstimation.estimator.id),
        salesman: String(updatedEstimation.salesman.id),
        scope_of_work: updatedEstimation.scope_of_work,
        attachments: updatedEstimation.attachments,
      });
    }
  }, [token, updatedEstimation]);

  return (
    <>
      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="registration_top_header">
          <p>
            <span className='border-bottom-heading'>
              Estimation Registration
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                INQUIRY NUMBER
              </label>
              <Autocomplete
                name="inquiry_no"
                value={
                  Inquiry &&
                  formData.inquiry_no &&
                  Inquiry.find((item) => item.id === Number(formData.inquiry_no))
                }
                onChange={(event, value) => handleAutoComplete(value, "inquiry_no")}
                // disabled = {null}
                disablePortal
                id="combo-box-demo"
                options={Inquiry}
                getOptionLabel={(option) => option.id}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Inquiry"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                ESTIMATION DATE
              </label>
              <TextField
                type="date"
                name="Estimationdate"
                onChange={handleChange}
                value={formData.Estimationdate}
                placeholder="Enter Last Name"
                fullWidth
                required

              />
            </Grid>

          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <div className="details-lable"> <label>DETAILS </label></div>
              <table className='enquiry-details-table'>
                <thead>
                  <tr >
                    <th>BOQ NUMBER</th>
                    <th>BOQ DESCRIPTION</th>
                    <th>UNIT</th>
                    <th>QUANTITY</th>
                    <th>RATE</th>
                    <th>TOTAL AMOUNT</th>
                    <th>ESTIMATION RATE</th>
                    <th>MARKUP</th>
                    <th>SALES PRICE</th>
                    <th>NET TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {InquiryData && InquiryData.detail.map((item, index) => {
                    return (
                      <tr key={index} >
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              value={item.boq_number}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.boq_number !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name="boq_description"
                              // onChange={handleChange}
                              value={item.boq_description}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.boq_description !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name="unit"
                              // onChange={handleChange}
                              value={item.unit}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.unit !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name="quantity"
                              // onChange={handleChange}
                              value={item.quantity}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.quantity !== null}
                            />
                          </div>
                        </td>
                        <td>

                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="rate"
                              // onChange={handleChange}
                              value={item.rate}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.rate !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="total_price"
                              // onChange={handleChange}
                              value={item.total_price}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.total_price !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              // value={item.boq_number}
                              onClick={handleModalOpen}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}

                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              //  value={item.boq_number}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}

                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              //  value={item.boq_number}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}

                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              //  value={item.boq_number}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}

                              fullWidth
                              required
                            />
                          </div>
                        </td>
                           {/* Estimation Rate Modal Start  */}
      <Modal
        open={erModal}
        // onClose={props.closeERModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style} >
          <div className="modal-top-container">
            <h4> ESTIMATION RESOURCE DETAILS</h4>
            <RxCross2 onClick={closeERModal} className="modal-btn-cross" />
          </div>

          {/* <button onClick={handleAddMore}>Add More</button> */}
          <form>
            <div className="estimation-resouce-details" >
              <div className="estimation-resouce-list">
                <label>
                  ITEM NAME
                </label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="item_name"
                  // value={estiFormData.item_name[index]}
                  // onChange={handleModalInputChange}
                  value={CatelogueData && CatelogueData.catelouge.name}
                  placeholder="Select Catelogue"
                  fullWidth
                  required
                  onClick={() => setCateModalOpen(true)}
                // error={Boolean(props.nameError)}
                // helperText={props.nameError}
                />

              </div>
              <div className="estimation-resouce-list">
                <label>
                  UNIT
                </label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="unit_of_measurement"
                  onChange={handleModalInputChange}
                  value={CatelogueData && CatelogueData.catelouge.unit_of_measurement}
                  // placeholder="Select Catelogue"
                  fullWidth
                  required
                // error={Boolean(props.nameError)}
                // helperText={props.nameError}
                />
              </div>
              <div className="estimation-resouce-list">
                <label>QUANTITY </label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="quantity"
                  onChange={(e) => handleChangePrice('quantity', e.target.value)}
                  fullWidth
                  required
                />



              </div>
              <div className="estimation-resouce-list">
                <label>RATE</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="list_price"
                  // onChange={handleRateInputChange}
                  value={CatelogueData && CatelogueData.catelouge.list_price}
                  fullWidth
                  required
                />
              </div>
              <div className="estimation-resouce-list">
                <label>DISCOUNT</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="discount"
                  onChange={handleModalInputChange}
                  value={CatelogueData && CatelogueData.catelouge.discount}
                  // placeholder="Select Catelogue"
                  fullWidth
                  required
                // error={Boolean(props.nameError)}
                // helperText={props.nameError}
                />

              </div>
              <div className="estimation-resouce-list">
                <label>VAT TYPE</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="vat_type"
                  onChange={handleModalInputChange}
                  value={CatelogueData && CatelogueData.catelouge.tax.name}
                  // placeholder="Select Catelogue"
                  fullWidth
                  required
                // error={Boolean(props.nameError)}
                // helperText={props.nameError}
                />
              </div>
              <div className="estimation-resouce-list">
                <label>VAT PERCENT</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="vat_percent"
                  onChange={handleModalInputChange}
                  value={CatelogueData && CatelogueData.catelouge.tax.rate}
                  // placeholder="Select Catelogue"
                  fullWidth
                  required
                // error={Boolean(props.nameError)}
                // helperText={props.nameError}
                />
              </div>
              <div className="estimation-resouce-list">
                <label>ESTIMATION</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  name="estimation_rate"
                  value={estiFormData.estimation_rate}
                  fullWidth
                  required
                  readOnly // Make it read-only to prevent user input
                />
              </div>
            </div>
            <button variant="outlined" type="submit"  onClick={(e) => estiHandleSubmit(e, index)}>
              Save
            </button>
          </form>
        </Box>
      </Modal>
      {/* Estimation Rate Modal End  */}
                      </tr>

                    )
                  })}
                </tbody>
              </table>

            </Grid>
          </Grid>
          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

            {updatedEstimation ? (

              <button type="submit" variant="contained" className="btn-bgColor">
                Update
              </button>
            ) : (

              <button type="submit" variant="contained" className="btn-bgColor">
                Create
              </button>
            )}
          </div>
        </form>

      </div>
   
      {/* Catelogue Modal Start */}
      <Modal
        open={cateModalOpen}
        // onClose={props.closeERModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={CateStyle} className="scroll-bar">
          <div className="modal-top-container">
            <h4>CETELOGUE ITEMS</h4>
            <RxCross2 onClick={() => setCateModalOpen(false)} className="modal-btn-cross" />

          </div>
          <div className="main-product-container">
            {catelogueData && catelogueData ? catelogueData.map((item, index) => (

              <div className="product-container" key={index} onClick={() => handleClick(item.id)}>
                <div className="product-image">
                  <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
                </div>
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <p><span>{item.model}</span><span>{ }</span></p>
                  {item.isactive ? "Active" : "Inactive"}
                </div>
              </div>

            )) : "Loading....."}
          </div>
        </Box>
      </Modal>
      {/* Catelogue Modal End */}
    </>
  )
}

export default Estimation