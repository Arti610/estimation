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
import { getCatelogueData } from '../../APIs/CatelogueSlice';
import { ImgUrl } from '../../Config/Config';
import api from '../../Config/Apis';
import { getTaxData } from '../../APIs/TaxSlice';
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
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
  const fData = new FormData();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [myInqIndex, setMyInqIndex] = useState({ index: null })
  const [estiRateTrue, setEstiRateTrue] = useState({ estistate: true })
  const [erModal, setErModal] = useState({ erModalValue: false, i: null })
  const [cateModalOpen, setCateModalOpen] = useState({ modalValue: false, index: null })
  const Inquiry = useSelector((state) => state.Inquiry.InquiryData)
  const InquiryData = useSelector((state) => state.Inquiry.updateInquiryData)
  const updatedEstimation = useSelector((state) => state.Estimation.updateUserData)
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);
  const taxData = useSelector((state)=>state.Tax.TaxData)
  const [formData, setFormData] = useState({
    inquiry_no: null,
    estimation_date: null,
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
    ],
    estimation_rate: null
  })
  const [estimationDetails, setEstimationDetails] = useState({
    inquiry_detail_id: [null],
    estimation_rate: [null],
    vat_tax: [null],
    sales_price: [null],
    markup: [null],
    markup_value: [null],
    gross_price: [null],
    taxable: [null],
    vat_type: [null],
    vat_percentage: [null],
    vat_amount: [null],
    sales_price: [null]
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

  const openERModal = () => {
    setErModal({ erModalValue: true, i: null })
  }
  const closeERModal = () => {
    setErModal({ erModalValue: false, i: null })
    setFormData({
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
    setEstiRateTrue({ estistate: true })
  }
  const handleModalOpen = (itemId, index) => {
    setMyInqIndex({ index: index })
    setEstiRateTrue({ estistate: false })
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
      const response = await api.get(`/catalogue/${id}`, {
        headers: {
          Authorization: `token fdd22927687fd443a5623e7137ff466623111a59`,
        },
      });
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
  const handleEstimationDetails = (name, value, index) => {
    setEstimationDetails((prevData) => {
      const updatedMarkup = [...prevData.markup];
      const updatedMarkupValue = [...prevData.markup_value];
      const updatedGrossPrice = [...prevData.gross_price];
      const updatedTaxable = [...prevData.taxable];
      const updatedVatType = [...prevData.vat_type];
      const updatedVatPercentage = [...prevData.vat_percentage];
      const updatedVatAmount = [...prevData.vat_amount];
      const updatedSalesPrice = [...prevData.sales_price];

      if (name === 'markup') {
        updatedMarkup[index] = value;
      }
      if (name === 'markup_value') {
        updatedMarkupValue[index] = value;
      }
      if (name === 'gross_price') {
        updatedGrossPrice[index] = value;
      }
      if (name === 'taxable') {
        updatedTaxable[index] = value;
      }
      if (name === 'vat_type') {
        updatedVatType[index] = value;
      }
      if (name === 'vat_percentage') {
        updatedVatPercentage[index] = value;
      }
      if (name === 'vat_amount') {
        updatedVatAmount[index] = value;
      }
      if (name === 'sales_price') {
        updatedSalesPrice[index] = value;
      }

      return {
        ...prevData,
        markup: updatedMarkup,
        markup_value: updatedMarkupValue,
        gross_price: updatedGrossPrice,
        taxable: updatedTaxable,
        vat_type: updatedVatType,
        vat_percentage: updatedVatPercentage,
        vat_amount: updatedVatAmount,
        sales_price: updatedSalesPrice
      };
    });
  };
  const handleEstimationDetailsAPI = (index)=>{
    if (taxData) {
      const { id, name, rate } = taxData;
      setEstiFormData((prev) => {
        const UpdatedId = [...prev.id];
        UpdatedId[index] = id;
        const UpdatedVatType = [...prev.vat_type];
        UpdatedId[index] = name;
        const UpdatedVatPercentage = [...prev.vat_percentage];
        UpdatedName[index] = rate;
        
        return {
          ...prev,
          id: UpdatedId,
          vat_type: UpdatedVatType,
          vat_percentage: UpdatedVatPercentage,
     
        };
      });
    } 

     } 
  
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
    setEstimationDetails((prev) => {
      // ...prev,
      // [estimation_rate[myInqIndex.index]]: estimation_rate_total
      const updatevalue = [...prev.estimation_rate]
      updatevalue[myInqIndex.index] = estiFormData.estimation_rate_total
      console.log('updatevalue/////', updatevalue);
      return {
        ...prev,
        estimation_rate: updatevalue,
      };
    });


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
    setEstiRateTrue({ estistate: true })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (updatedEstimation) {
      fData.append("inquiry_no", formData.inquiry_no);
      fData.append("estimation_date", formData.estimation_date);
      fData.append("inquirydetail", formData.inquirydetail);
      fData.append("vat_tax", formData.vat_tax);
      fData.append("markup", formData.markup);
      fData.append("taxable", formData.taxable);
      fData.append("NetTotal", formData.NetTotal);
      fData.append("salesprice", formData.salesprice);
      fData.append("estimation_rate", formData.estimation_rate);

      dispatch(updateEstimationData({ fData, token, id: updatedEstimation.id }))
      alert("updated successfully")
      navigate("/settings/Estimation")
    } else {
      fData.append("inquiry_no", formData.inquiry_no);
      fData.append("estimation_date", formData.estimation_date);
      fData.append("inquirydetail", formData.inquirydetail);
      fData.append("vat_tax", formData.vat_tax);
      fData.append("markup", formData.markup);
      fData.append("taxable", formData.taxable);
      fData.append("NetTotal", formData.NetTotal);
      fData.append("salesprice", formData.salesprice);
      fData.append("estimation_rate", formData.estimation_rate);

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
    dispatch(getTaxData(token))
    if (updatedEstimation) {
      setFormData({
        inquiry_no: String(updatedEstimation.inquiry_no.id),
        estimation_date: updatedEstimation.estimation_date,
        inquirydetail: String(updatedEstimation.inquirydetail.id),
        vat_tax: String(updatedEstimation.vat_tax.id),
        markup: updatedEstimation.markup,
        taxable: updatedEstimation.taxable,
        NetTotal: updatedEstimation.NetTotal,
        salesprice: updatedEstimation.salesprice,
        estimation_rate: updatedEstimation.estimation_rate,
      });
    }
  }, [token, updatedEstimation]);
  useEffect(() => {
    console.log("estimationDetails", estimationDetails);
  }, [estimationDetails])
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
                    <th>MARKUP VALUE</th>
                    <th>GROSS PRICE</th>
                    <th>TAXABLE</th>
                    <th>VAT TYPE</th>
                    <th>VAT PERCENTAGE</th>
                    <th>VAT AMOUNT</th>
                    <th>SALES PRICE</th>
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
                            <TextField
                              name="estimation_rate"
                              onClick={() => {
                                handleModalOpen(item.id, index); // Call handleModalOpen with item.id
                                setSelectedItemId(item.id); // Set the selected item ID in state
                              }}
                              onChange={(e) => handleChangePrice('estimation_rate', e.target.value, index)}
                              fullWidth
                              required
                              value={estiRateTrue.estistate ? estimationDetails.estimation_rate[index] : null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.markup${index}`}
                              onChange={(e) => handleEstimationDetails('markup', e.target.value, index)}
                              placeholder='Ex: 5%'
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.markup_value${index}`}
                              onChange={(e) => handleEstimationDetails('markup_value', e.target.value, index)}
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.gross_price${index}`}
                              onChange={(e) => handleEstimationDetails('gross_price', e.target.value, index)}
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.taxable${index}`}
                              onChange={(e) => handleEstimationDetails('taxable', e.target.value, index)}
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            {/* <TextField
                              name={`item.vat_type${index}`}
                              onChange={(e) => handleEstimationDetails('vat_type', e.target.value, index)}
                              fullWidth
                              required
                            /> */}
                            <Autocomplete
                              name="inquiry_no"
                              value={
                                taxData &&  formData.vat_type &&
                                taxData.find((item) => item.id === Number(formData.vat_type))
                              }
                              onChange={(event, value) => handleAutoComplete(value, "vat_type")}
                              // disabled = {null}
                              disablePortal
                              id="combo-box-demo"
                              options={taxData}
                              getOptionLabel={(option) => option.name}
                              required
                              renderInput={(params) => (
                                <TextField
                                  className="bg-color"
                                  placeholder="Select Vat Type"
                                  {...params}
                                />
                              )}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.vat_percentage${index}`}
                              onChange={(e) => handleEstimationDetails('vat_percentage', e.target.value, index)}
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.vat_amount${index}`}
                              onChange={(e) => handleEstimationDetails('vat_amount', e.target.value, index)}
                              fullWidth
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.sales_price${index}`}
                              onChange={(e) => handleEstimationDetails('sales_price', e.target.value, index)}
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
                                            <div className="product-container-modal" key={index} onClick={(e) => handleClick(e, myIOuter, item.id)}>

                                              <div className="product-image">
                                                <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
                                              </div>
                                              <div className="product-details">
                                                <h4>{item.name}</h4>
                                                {/* <p><span>{item.model}</span></p>
                                                {item.isactive ? "Active" : "Inactive"} */}
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
                                  value={estiFormData.estimation_rate_total}
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