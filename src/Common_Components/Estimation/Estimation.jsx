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
import axios from 'axios'; // Import Axios if you haven't already
import api from '../../Config/Apis';
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
  const [selectedItemId, setSelectedItemId] = useState(null);
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
    cate_id: [null],
    item_name: [null],
    unit: [null],
    quantity: [null],
    list_price: [null],
    discount: [null],
    vatType: [null],
    vatPercent: [null],
    estimation_rate: [null],
    estimation_rate_total: null
  })
  const [erModal, setErModal] = useState({ erModalValue: false, i: null })
  const openERModal = () => {
    setErModal({ erModalValue: true, i: null })
  }
  const closeERModal = () => {
    setErModal({ erModalValue: false, i: null })
  }
  const handleModalOpen = (itemId) => {
    openERModal()
  }

  const handleAddMore = () => {
    const hasNullFields = estiFormData.item_name.some((itemName, myI) => {
      // Check if any of the fields in the current row is null
      return (
        itemName === null ||
        estiFormData.unit[myI] === null ||
        estiFormData.quantity[myI] === null ||
        estiFormData.list_price[myI] === null ||
        estiFormData.discount[myI] === null ||
        estiFormData.vatType[myI] === null ||
        estiFormData.vatPercent[myI] === null
      );
    });

    if (!hasNullFields) {
      setEstiFormData((prevData) => ({
        ...prevData,
        item_name: [...prevData.item_name, null],
        unit: [...prevData.unit, null],
        quantity: [...prevData.quantity, null],
        list_price: [...prevData.list_price, null],
        discount: [...prevData.discount, null],
        vatType: [...prevData.vatType, null],
        vatPercent: [...prevData.vatPercent, null],
        // estimation_rate: [...prevData.estimation_rate, null],
      }));
    } else {
      alert("Please fill in all required fields in the current row before adding a new row.");
    }
  };

  const [cateModalOpen, setCateModalOpen] = useState({ modalValue: false, index: null })

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

  const catelogModal = (e) => {
    const index = e.target.name.split("-")[1]
    setCateModalOpen({ modalValue: true, index: index })
  }

  const handleClick = async (e, myIOuter, id, token) => {
    try {
      // Make the API call using Axios

      const response = await api.get(`/catalogue/${id}`, {
        headers: {
          Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
        },
      });
      // Check if the response contains the expected data structure

      const { data } = response;
      if (data && data.catelouge && data.catelouge) {
        const { id, name, unit_of_measurement, list_price, discount, tax } = data.catelouge;

        setEstiFormData((prev) => {
          const UpdatedId = [...prev.cate_id];
          UpdatedId[myIOuter] = id;
          const UpdatedName = [...prev.item_name];
          UpdatedName[myIOuter] = name;
          const UpdatedUnit = [...prev.unit];
          UpdatedUnit[myIOuter] = unit_of_measurement;
          const Updatedrate = [...prev.list_price];
          Updatedrate[myIOuter] = list_price;
          const UpdatedDiscount = [...prev.discount];
          UpdatedDiscount[myIOuter] = discount;
          const UpdatedVatType = [...prev.vatType];
          UpdatedVatType[myIOuter] = tax.name;
          const UpdatedVatRate = [...prev.vatPercent];
          UpdatedVatRate[myIOuter] = tax.rate;
          return {
            ...prev,
            cate_id: UpdatedId,
            item_name: UpdatedName,
            unit: UpdatedUnit,
            list_price: Updatedrate,
            discount: UpdatedDiscount,
            vatType: UpdatedVatType,
            vatPercent: UpdatedVatRate,
          };
        });
      } else {
        // Handle the case where the API response is missing the expected data
        console.error('API response is missing name data');
      }

      // Close the modal
      setCateModalOpen({ modalValue: false, index: null });
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching data from the API:', error);
    }
  };

  const calculateEstimatedRate = (index) => {
    const quantity = parseFloat(estiFormData.quantity[index]) || 0;
    // const listPrice = parseFloat(CatelogueData && CatelogueData.catelouge.list_price[index]) || 0;
    // console.log("listPrice", listPrice);
    // const discount = parseFloat(CatelogueData && CatelogueData.catelouge.discount[index]) || 0;
    // const vatPercent = parseFloat(CatelogueData && CatelogueData.catelouge.tax.rate[index]) || 0;
    const listPrice = parseFloat(estiFormData.list_price[index]) || 0;
    const discount = parseFloat(estiFormData.discount[index]) || 0;
    const vatPercent = parseFloat(estiFormData.vatPercent[index]) || 0;

    const estimatedRate =
      quantity * listPrice - discount + ((quantity * listPrice - discount) / 100) * vatPercent;

    return estimatedRate;
  };

  const handleChangePrice = (name, value, myI) => {
    setEstiFormData((prevData) => {
      const updatedQuantity = [...prevData.quantity];
      const updatedEstiRate = [...prevData.estimation_rate];

      if (name === 'quantity') {
        updatedQuantity[myI] = value;
      }
      if (name === 'estimation_rate') {
        updatedEstiRate[myI] = value;
      }
      return {
        ...prevData,
        quantity: updatedQuantity,
        estimation_rate: updatedEstiRate
      };
    });
  };

  useEffect(() => {
    const newEstiFormData = { ...estiFormData };
    let totalEstimationRate = 0; // Initialize the total to 0

    estiFormData.item_name.forEach((item, myI) => {
      newEstiFormData.estimation_rate[myI] = calculateEstimatedRate(myI);
      totalEstimationRate += newEstiFormData.estimation_rate[myI]; // Add each item's estimation_rate to the total
    });

    // Round the total to two decimal places using toFixed(2)
    newEstiFormData.estimation_rate_total = parseFloat(totalEstimationRate.toFixed(2));

    setEstiFormData(newEstiFormData);
  }, [estiFormData.quantity, CatelogueData]);


  const estiHandleSubmit = (e, index, itemId) => {
    e.preventDefault();
    console.log(itemId, "itemId");

    // Find the inquiryDetail with matching itemId
    const matchingDetail = InquiryData.detail.find((detail) => detail.id === itemId);

    if (matchingDetail) {
      const inquiryDetailId = matchingDetail.id;
      fData.append("inquiry_detail", inquiryDetailId);
      // Rest of your code here
    } else {
      console.error("Matching detail not found for itemId", itemId);
    }
    // Append the specific ID to your FormData
    // fData.append("item", estiFormData.cate_id);
    // fData.append("quantity", estiFormData.quantity);
    // fData.append("estimation_rate", estiFormData.estimation_rate);
    fData.append("total_price", estiFormData.estimation_rate_total);
    estiFormData.cate_id.forEach((file, index) => {
      fData.append(`item`, file)
    })
    estiFormData.quantity.forEach((file, index) => {
      fData.append(`quantity`, file)
    })
    estiFormData.estimation_rate.forEach((file, index) => {
      fData.append(`estimation_rate`, file)
    })
    dispatch(createEstimationResourceData({ fData, token }));
    alert("Estimation Resource Details save successfully")
    setErModal({ erModalValue: false, i: itemId })
    setEstiFormData({
      cate_id: [null],
      item_name: [null],
      unit: [null],
      quantity: [null],
      list_price: [null],
      discount: [null],
      vatType: [null],
      vatPercent: [null],
      estimation_rate: [null],
      estimation_rate_total: null
    })
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
  useEffect(() => {
    console.log("estiFormData", estiFormData);

  }, [estiFormData])
  return (
    <>
      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="registration_top_header">
          <p>
            <h2>
              Estimation Registration
            </h2>
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
                              onChange={(e) => handleChangePrice(index, 'quantity', e.target.value)}
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
                            {/* <TextField
                              name="estimation_rate"
                              onClick={() => handleModalOpen(item.id)}
                              onChange={(e) => handleChangePrice('estimation_rate', e.target.value, index)}

                              fullWidth
                              required
                            /> */}
                            <TextField
                              name="estimation_rate"
                              onClick={() => {
                                handleModalOpen(item.id); // Call handleModalOpen with item.id
                                setSelectedItemId(item.id); // Set the selected item ID in state
                              }}
                              onChange={(e) => handleChangePrice('estimation_rate', e.target.value, index)}
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
                          open={erModal.erModalValue}
                          // onClose={props.closeERModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >

                          <Box sx={style} >
                            <div className="modal-top-container">
                              <h4> ESTIMATION RESOURCE DETAILS</h4>
                              <RxCross2 onClick={closeERModal} className="modal-btn-cross" />
                            </div>


                            <form>
                              {estiFormData.item_name.map((item, myI) => {
                                const myIOuter = myI;
                                return (
                                  <div className="estimation-resouce-details" >
                                    <div className="estimation-resouce-list">
                                      <label>
                                        ITEM NAME
                                      </label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`item_name-${myI}`}
                                        // value={estiFormData.item_name[index]}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.item_name[myI]}
                                        placeholder="Select Catelogue"
                                        fullWidth
                                        required
                                        onClick={(e, myI) => catelogModal(e, myI)}
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
                                        name={`unit_of_measurement${myI}`}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.unit[myI]}
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
                                        name={`quantity${myI}`}
                                        onChange={(e) => handleChangePrice('quantity', e.target.value, myI)}
                                        // value={estiFormData && estiFormData.quantity[myI]} 
                                        fullWidth
                                        required
                                      />

                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>RATE</label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`list_price${myI}`}
                                        // onChange={handleRateInputChange}
                                        value={estiFormData && estiFormData.list_price[myI]}
                                        fullWidth
                                        required
                                      />
                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>DISCOUNT</label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`discount${myI}`}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.discount[myI]}
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

                                        name={`vat_type${myI}`}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.vatType[myI]}
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
                                        name={`vat_percent${myI}`}
                                        // onChange={handleModalInputChange}
                                        // value={CatelogueData && CatelogueData.catelouge.tax.rate}
                                        value={estiFormData && estiFormData.vatPercent[myI]}
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
                                        name={`estimation_rate${myI}`}
                                        value={estiFormData.estimation_rate[myI]}
                                        fullWidth
                                        required
                                        readOnly // Make it read-only to prevent user input
                                      />
                                    </div>
                                    {/* Catelogue Modal Start */}
                                    <Modal
                                      open={cateModalOpen.modalValue}
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
                                            <div className="product-container" key={index} onClick={(e) => handleClick(e, myIOuter, item.id)}>
                                              {console.warn("iiiiiiii", myIOuter)}
                                              <div className="product-image">
                                                <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
                                              </div>
                                              <div className="product-details">
                                                <h3>{item.name}</h3>
                                                <p><span>{item.model}</span></p>
                                                {item.isactive ? "Active" : "Inactive"}
                                              </div>
                                            </div>
                                          )) : "Loading....."}

                                        </div>
                                      </Box>
                                    </Modal>
                                    {/* Catelogue Modal End */}
                                  </div>

                                )
                              })}
                              <div className="estimation-resouce-list">
                                <label>ESTIMATION RATE</label>
                                <TextField
                                  type="text"
                                  className="inputfield bg-color"
                                  fullWidth
                                  required
                                  value={estiFormData.estimation_rate_total} // Display the total
                                  readOnly // Make it read-only to prevent user input
                                />
                              </div>
                              <div style={{ padding: "10px" }}> <button onClick={handleAddMore}>Add More</button></div>
                              <button
                                variant="outlined"
                                type="submit"
                                onClick={(e) => estiHandleSubmit(e, index, selectedItemId)} // Use selectedItemId
                              >
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


    </>
  )
}

export default Estimation