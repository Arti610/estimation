import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserData, getUserData, updateUserData } from '../../APIs/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete,  Grid, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai'
import { getDepartmentData } from '../../APIs/DepartmentSlice';
import { getCustomerData } from '../../APIs/CustomerSlice'
import { getSourceOfInquiryData } from '../../APIs/SourceOfInquirySlice'
import './Inquiry.css'
import { getEmployerData } from '../../APIs/EmployerSlice';
import { createInquiryData, deleteInquiryDetailsData, getupdateInquiryData, updateInquiryData, updateInquiryDetails } from '../../APIs/InquirySlice'
import api from '../../Config/Apis';
import { toast } from 'react-toastify';
import CommonLoading from '../../Components/Loader/CommonLoading'

const Inquiry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fData = new FormData();

  const { inqId } = useParams()

  const token = localStorage.getItem('Token');
  const Department = useSelector((state) => state.Department.DepartmentData)
  const Employer = useSelector((state) => state.Employer.EmployerData)
  const Customer = useSelector((state) => state.Customer.CustomerData)
  const SourceOfInquiry = useSelector((state) => state.SourceOfInquiry.SourceOfInquiryData)
  const Estimator_salesman = useSelector((state) => state.User.UserData)
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1); // -1 means no row is being edited initially
  const [isLoading, setIsLoading] = useState(false)

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
console.log("formdata", formData);
  const deleteDetailsHandler = useCallback((index, id) => {
    dispatch(deleteInquiryDetailsData({ token, id: formData.details[index].id }));
    dispatch(getupdateInquiryData({ id, token }))
  }, [dispatch, formData.details, token,]);

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inqId) {
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
      // dispatch(updateInquiryData({ fData, token, id: inqId }))
      try {
        setIsLoading(true)
        const response = await api.put(`/inquiry/${inqId}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })
        
        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201" ) {
          setIsLoading(false)
          toast.success("Inquiry updated successfully !")
          navigate("/dashboard/sales/inquiry")
        }
      } catch (error) {
        
      }
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
      // dispatch(createInquiryData({ fData, token }))
      try {
        setIsLoading(true)
        const response = await api.post(`/inquiry`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })

        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201") {

         setIsLoading(false)
          toast.success("Inquiry created successfully !")
          navigate("/dashboard/sales/inquiry")
        }
      } catch (error) {
        throw error
      } 

    }
  }

  const handleInquiryUser = async () => {
    try {
      // setLoading(true)
      const response = await api.get(`/inquiry/${inqId}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const updateInquiryBYId = response.data;
      console.log("updateInquiryBYId",updateInquiryBYId);
      if (inqId) {
        setFormData({
          client_reference_no: updateInquiryBYId &&  updateInquiryBYId.inquiry && updateInquiryBYId.inquiry.client_reference_no ? updateInquiryBYId.inquiry.client_reference_no : null,
          inquirydate: updateInquiryBYId && updateInquiryBYId.inquiry && updateInquiryBYId.inquiry.inquirydate ? updateInquiryBYId.inquiry.inquirydate : null,
          submission_date: updateInquiryBYId && updateInquiryBYId.inquiry.submission_date ? updateInquiryBYId.inquiry.submission_date : null,
          customer: updateInquiryBYId && updateInquiryBYId.inquiry.customer.id ? updateInquiryBYId.inquiry.customer.id : null,
          employer: updateInquiryBYId && updateInquiryBYId.inquiry.employer.id ? updateInquiryBYId.inquiry.employer.id : null,
          source_of_inquiry: updateInquiryBYId && updateInquiryBYId.inquiry.source_of_inquiry.id ? updateInquiryBYId.inquiry.source_of_inquiry.id : null,
          department: updateInquiryBYId && updateInquiryBYId.inquiry.department.id ? updateInquiryBYId.inquiry.department.id : null,
          estimator: updateInquiryBYId && updateInquiryBYId.inquiry.estimator.id ? updateInquiryBYId.inquiry.estimator.id : null,
          salesman: updateInquiryBYId && updateInquiryBYId.inquiry.salesman.id ? updateInquiryBYId.inquiry.salesman.id : null,
          scope_of_work: updateInquiryBYId && updateInquiryBYId.inquiry.scope_of_work ? updateInquiryBYId.inquiry.scope_of_work : null,
          details: updateInquiryBYId && updateInquiryBYId.detail ? updateInquiryBYId.detail : null,
        });
      }
      } catch (error) {

    }
  }

  useEffect(() => {
    AOS.init();
    dispatch(getDepartmentData(token));
    dispatch(getEmployerData(token))
    dispatch(getCustomerData(token))
    dispatch(getUserData(token))
    dispatch(getSourceOfInquiryData(token))
    handleInquiryUser()
  }, [token]);

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
                options={Customer ? Customer : []}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Customer"
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
                options={Employer ? Employer : []}
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
                options={SourceOfInquiry ? SourceOfInquiry : []}
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
                options={Department ? Department : []}
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
                options={Estimator_salesman ? Estimator_salesman : []}
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
                options={Estimator_salesman ? Estimator_salesman : []}
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
                    required={!inqId}
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
                  <div key={index} className='inquiry-details-container'>
                    <div className="action-btn">


                      <div className="btn-width">
                        {inqId &&
                          <div>
                            {isDisabled ?
                              <div onClick={() => handleDocEdit(index)} className='btn-style'>
                                <BiSolidEditAlt title="Edit" style={{ color: "#7c5e1e" }} />
                              </div>
                              :
                              <div onClick={() => handleSaveDetails(index)} className='btn-style'>
                                <button style={{ marginInline: "10px" }}>Save</button>
                              </div>}
                          </div>
                        }
                        {inqId ?
                          <div onClick={() => deleteDetailsHandler(index)} className='btn-style'>
                            <AiFillDelete title='Delete' style={{ color: "red" }} />
                          </div>
                          :
                          <div onClick={() => handleDocRemove(index)} className='btn-style'>
                            <AiOutlineClose title='Delete' style={{ color: "red" }} />
                          </div>
                        }
                      </div>
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
                          disabled={inqId && isDisabled}
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
                          // placeholder="Ex: "
                          fullWidth
                          required
                          disabled={inqId && isDisabled}
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
                          disabled={inqId && isDisabled}
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
                          disabled={inqId && isDisabled}
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
                          disabled={inqId && isDisabled}
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
              {inqId ? null : <p className="AddMore"
                onClick={handleDocRender}>Add More +</p>}
            </Grid>
          </Grid>
          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

           {isLoading ? <CommonLoading/> : inqId ? (

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

