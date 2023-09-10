import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserData, getUserData, updateUserData } from '../../APIs/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai'
import { getDepartmentData } from '../../APIs/DepartmentSlice';
import { getCustomerData } from '../../APIs/CustomerSlice'
import { getSourceOfInquiryData } from '../../APIs/SourceOfInquirySlice'
import './Inquiry.css'
import { useCookies } from 'react-cookie';
import { getEmployerData } from '../../APIs/EmployerSlice';
import { createInquiryData, deleteInquiryDetailsData, deleteInquiryDetailsDataFailed, deleteInquiryDetailsDataSuccess, updateInquiryData, updateInquiryDetails } from '../../APIs/InquirySlice'

const Inquiry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fData = new FormData();
  const stateStaus = useSelector((state)=>state.Inquiry.status)
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
  const Department = useSelector((state) => state.Department.DepartmentData)
  const Employer = useSelector((state) => state.Employer.EmployerData)
  const Customer = useSelector((state) => state.Customer.CustomerData)
  const SourceOfInquiry = useSelector((state) => state.SourceOfInquiry.SourceOfInquiryData)
  const Estimator_salesman = useSelector((state) => state.User.UserData)
  const updatedInquiry = useSelector((state) => state.Inquiry.updateInquiryData)
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1); // -1 means no row is being edited initially
const [status, setStatus] = useState(stateStaus)

  const [formData, setFormData] = useState({
    client_reference_no: null,
    inquirydate: null,
    submission_date: null,
    customer: null,
    employer: null,
    source_of_inquiry: null,
    department: null,
    estimator: null,
    salesman: null,
    scope_of_work: null,
    attachments: null,
    details: [
      {
        boq_number: null,
        boq_description: null,
        quantity: null,
        unit: null,
        rate: null,
        total_price: null,
      },
    ],
  })


  // const deleteDetailsHandler = (index) => {
  //   dispatch(deleteInquiryDetailsData({ token, id: formData.details[index].id }));
  // };

  // // Memoize the status variable using useMemo
  // const memoizedStatus = useMemo(() => stateStaus, [stateStaus]);
  const deleteDetailsHandler = useCallback((index) => {
    dispatch(deleteInquiryDetailsData({ token, id: formData.details[index].id }));
  }, [dispatch, formData.details, token, ]);
  
  // Now, deleteDetailsHandler will be memoized and will only change when its dependencies change.
  
  const handleDocRender = () => {
    setFormData((prevState) => ({
      ...prevState,
      details: [
        ...prevState.details, {}]
    }))
  }
  const handleDocRemove = (index) => {
    const newFormVal = { ...formData };
    newFormVal.details.splice(index, 1);
    setFormData(newFormVal);
  };

  const handleDocEdit = (index) => {

    setIsUpdating(true);
    setEditingIndex(index);
  };
  const handleSaveDetails = (index) => {
    dispatch(
      updateInquiryDetails({
        id: formData.details[index].id,
        details: formData.details[index],
        token,
      })
    );
    setIsUpdating(false);
    setEditingIndex(index);

  };


  const handleAutoComplete = (newValue, fieldName) => {
    const selectedValue = newValue ? newValue.id : null;

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
    console.log(formData, 'formDaata');
  };
  const handleChangePrice = (index, name, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = {
      ...newDetails[index],
      [name]: value,
    };

    // Calculate Total Price
    const quantity = parseFloat(newDetails[index].quantity);
    const rate = parseFloat(newDetails[index].rate);

    if (!isNaN(quantity) && !isNaN(rate)) {
      newDetails[index].total_price = (quantity * rate).toFixed(2);
    } else {
      newDetails[index].total_price = '';
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      details: newDetails,
    }));
  }
  const handleImageChange = (e) => {
    const { files } = e.target;

    setFormData((previous) => ({
      ...previous,
      attachments: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (updatedInquiry) {
      fData.append("client_reference_no", formData.client_reference_no);
      fData.append("inquirydate", formData.inquirydate);
      fData.append("submission_date", formData.submission_date);
      fData.append("customer", formData.customer);
      fData.append("employer", formData.employer);
      fData.append("source_of_inquiry", formData.source_of_inquiry);
      fData.append("department", formData.department);
      fData.append("estimator", formData.estimator);
      fData.append("salesman", formData.salesman);
      fData.append("scope_of_work", formData.scope_of_work);
      if (formData.attachments) {
        fData.append("attachments", formData.attachments);
      }
      dispatch(updateInquiryData({ fData, token, id: updatedInquiry.inquiry.id }))
      alert("updated successfully")
      navigate("/sales/inquiry")
    } else {
      fData.append("client_reference_no", formData.client_reference_no);
      fData.append("inquirydate", formData.inquirydate);
      fData.append("submission_date", formData.submission_date);
      fData.append("customer", formData.customer);
      fData.append("employer", formData.employer);
      fData.append("source_of_inquiry", formData.source_of_inquiry);
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
      dispatch(createInquiryData({ fData, token }))
      alert("created successfully")
      navigate("/sales/inquiry")

    }
  }


  useEffect(() => {
    AOS.init();
    dispatch(getDepartmentData(token));
    dispatch(getEmployerData(token))
    dispatch(getCustomerData(token))
    dispatch(getSourceOfInquiryData(token))
    dispatch(getUserData(token))
    dispatch(updateInquiryData(token))

    if (updatedInquiry) {
      setFormData({
        client_reference_no: updatedInquiry.inquiry.client_reference_no,
        inquirydate: updatedInquiry.inquiry.inquirydate,
        submission_date: updatedInquiry.inquiry.submission_date,
        customer: String(updatedInquiry.inquiry.customer.id),
        employer: String(updatedInquiry.inquiry.employer.id),
        source_of_inquiry: String(updatedInquiry.inquiry.source_of_inquiry.id),
        department: String(updatedInquiry.inquiry.department.id),
        estimator: String(updatedInquiry.inquiry.estimator.id),
        salesman: String(updatedInquiry.inquiry.salesman.id),
        scope_of_work: updatedInquiry.inquiry.scope_of_work,
        details: updatedInquiry.detail,
      });
    }
  }, [token, updatedInquiry]);

  return (
    <>
      <div

        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="registration_top_header">
          <p>
            <h2 className='border-bottom-heading'>
              Inquiry Registration
            </h2>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                CLIENT REF NUMBER <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                name="client_reference_no"
                onChange={handleChange}
                value={formData.client_reference_no}
                placeholder="Ex: 42365212"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                INQUIRY DATE <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="date"
                name="inquirydate"
                onChange={handleChange}
                value={formData.inquirydate}
                placeholder="Enter Last Name"
                fullWidth
                required

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                SUBMISSION DATE <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="date"
                name="submission_date"
                onChange={handleChange}
                value={formData.submission_date}
                placeholder="example@gmail.com"
                fullWidth
                required

              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                CUSTOMER <span style={{ color: "red" }}>*</span>
              </label>
              <Autocomplete
                name="customer"
                value={
                  Customer &&
                  formData.customer &&
                  Customer.find((item) => item.id === Number(formData.customer))
                }
                onChange={(event, value) => handleAutoComplete(value, "customer")}

                disablePortal
                id="combo-box-demo"
                options={Customer}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Department"
                    {...params}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label>
                EMPLOYER <span style={{ color: "red" }}>*</span>
              </label>
              <Autocomplete
                name="employer"
                value={
                  Employer &&
                  formData.employer &&
                  Employer.find((item) => item.id === Number(formData.employer))
                }
                onChange={(event, value) => handleAutoComplete(value, "employer")}
                disablePortal
                id="combo-box-demo"
                options={Employer}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Employer"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                SOURCE OF INQUIRY <span style={{ color: "red" }}>*</span>
              </label>
              <Autocomplete
                name="source_of_inquiry"
                value={
                  SourceOfInquiry &&
                  formData.source_of_inquiry &&
                  SourceOfInquiry.find((item) => item.id === Number(formData.source_of_inquiry))
                }
                onChange={(event, value) => handleAutoComplete(value, "source_of_inquiry")}

                disablePortal
                id="combo-box-demo"
                options={SourceOfInquiry}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Department"
                    {...params}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={4}>
              <label>
                DEPARTMENT <span style={{ color: "red" }}>*</span>
              </label>
              <Autocomplete
                name="department"
                value={
                  Department &&
                  formData.department &&
                  Department.find((item) => item.id === Number(formData.department))
                }
                onChange={(event, value) => handleAutoComplete(value, "department")}
                disablePortal
                id="combo-box-demo"
                options={Department}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Department"
                    {...params}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label>
                ESTIMATOR <span style={{ color: "red" }}>*</span>
              </label>

              <Autocomplete
                name="estimator"
                value={
                  Estimator_salesman &&
                  formData.estimator &&
                  Estimator_salesman.find((item) => item.id === Number(formData.estimator))
                }
                onChange={(event, value) => handleAutoComplete(value, "estimator")}

                disablePortal
                id="combo-box-demo"
                options={Estimator_salesman}
                getOptionLabel={(option) => option.first_name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Estimator"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                SALESMAN <span style={{ color: "red" }}>*</span>
              </label>

              <Autocomplete
                name="salesman"
                value={
                  Estimator_salesman &&
                  formData.salesman &&
                  Estimator_salesman.find((item) => item.id === Number(formData.salesman))
                }
                onChange={(event, value) => handleAutoComplete(value, "salesman")}

                disablePortal
                id="combo-box-demo"
                options={Estimator_salesman}
                getOptionLabel={(option) => option.first_name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Salesman"
                    {...params}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>ATTACHMENT <span style={{ color: "red" }}>*</span></label>
              <div className="App">
                <label htmlFor="upload-photo">
                  <TextField
                    className="bg-color"
                    id="upload-photo"
                    name="profile_image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    required={!updatedInquiry}
                    style={{ width: "100%" }}
                  />
                </label>{" "}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <label>
                SCOPE OF WORK <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                name="scope_of_work"
                onChange={handleChange}
                value={formData.scope_of_work}
                placeholder="Scope of Work"
                fullWidth
                required
              />

            </Grid>

          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <div className="details-lable"><label>DETAILS <span style={{ color: "red" }}>*</span></label></div>

              {formData.details.map((item, index) => {
                const isDisabled = !isUpdating || editingIndex !== index;

                return (
                  <div key={index} className='details-container'>
                    <div className="action-btn">
                      {updatedInquiry &&
                        <p>
                          {isDisabled ?
                            <BiSolidEditAlt onClick={() => handleDocEdit(index)} title="Edit" className='delete-update-handle-btn' style={{ color: "#7c5e1e" }} />
                            :
                            <button onClick={() => handleSaveDetails(index)} style={{ marginInline: "10px" }}>Save</button>
                          }
                        </p>}
                      {updatedInquiry ? <p onClick={() => deleteDetailsHandler(index)}><AiFillDelete className='delete-update-handle-btn' title='Delete' style={{ color: "red" }} /></p> :
                        <p onClick={() => handleDocRemove(index)}>
                          <AiOutlineClose className='delete-update-handle-btn' title='Delete' style={{ color: "red" }} />
                        </p>
                      }

                    </div>

                    <Grid container spacing={2} key={index} sx={{ mb: "10px" }}>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          BOQ NUMBER <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="boq_number"
                          // onChange={handleChange}
                          value={item.boq_number}
                          onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                          placeholder="Ex: 523689"
                          fullWidth
                          required
                          disabled={updatedInquiry && isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          BOQ DESCRIPTION <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="boq_description"
                          // onChange={handleChange}
                          value={item.boq_description}
                          onChange={(e) => handleChangePrice(index, 'boq_description', e.target.value)}
                          placeholder="Ex: "
                          fullWidth
                          required
                          disabled={updatedInquiry && isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          UNIT <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="unit"
                          // onChange={handleChange}
                          onChange={(e) => handleChangePrice(index, 'unit', e.target.value)}
                          value={item.unit}
                          // placeholder="Ex: "
                          fullWidth
                          required
                          disabled={updatedInquiry && isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          QUANTITY <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="quantity"
                          onChange={(e) => handleChangePrice(index, 'quantity', e.target.value)}
                          value={item.quantity}
                          placeholder="Ex: 5"
                          fullWidth
                          required
                          className='quantity1'
                          disabled={updatedInquiry && isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          RATE  <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="rate"
                          onChange={(e) => handleChangePrice(index, 'rate', e.target.value)}
                          value={item.rate}
                          placeholder="Ex: 10"
                          fullWidth
                          required
                          disabled={updatedInquiry && isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <label>
                          TOTAL PRICE <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                          name="total_price"
                          value={item.total_price}
                          fullWidth
                          required
                          disabled // To prevent user input in this field
                        />
                      </Grid>
                    </Grid>
                  </div>
                )
              })}
              {updatedInquiry ? null : <p className="AddMore"
               onClick={handleDocRender}>Add More +</p>}
            </Grid>
          </Grid>
          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

            {updatedInquiry ? (

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

export default Inquiry