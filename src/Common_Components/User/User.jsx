import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserData, getUserData, updateUserData } from '../../APIs/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Grid, IconButton, ImageList, ImageListItem, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { getDepartmentData } from '../../APIs/DepartmentSlice';
import './User.css';
import { ImgUrl } from '../../Config/Config';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
import api from '../../Config/Apis';
import { toast } from 'react-toastify';
import CommonLoading from '../../Components/Loader/CommonLoading'

const User = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fData = new FormData();
  const token = localStorage.getItem('Token');

  const { userId } = useParams()

  const [showpass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");


  const accountType = ['Active', 'Closed', 'Suspended']
  const userType = ['Admin', 'Operator', 'Customer']

  const Department = useSelector((state) => state.Department.DepartmentData)
  const updatedUser = useSelector((state) => state.User.updateUserData)

  const [formData, setFormData] = useState({
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    address: null,
    profile_image: null,
    imgFile: null,
    password: null,
    user_type: null,
    department: null,
    account_status: null,
  })

  const passwordHandler = () => {
    setShowPass(!showpass)
  }

  const confirmPassHandler = () => {
    setShowConfirmPass(!showConfirmPass)
  }

  const handleAutoComplete = (newValue, fieldName) => {
    const selectedValue = newValue ? newValue.id : null;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirm_password") {
      // Update confirm password field
      setConfirmPassword(value);

      // Check if confirm password matches password
      if (value !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    } else {
      // Update other form fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // Validation
      let error = '';

      switch (name) {
        case "first_name":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = 'Name should only contain alphabetic';
          }
          setNameError(error);
          break;

        case "last_name":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = 'Last name should only contain alphabetic';
          }
          setLastNameError(error);
          break;

        case "password":
          if (value.length < 8) {
            error = 'Password must be at least 8 characters long';
          } else if (!/[A-Z]/.test(value)) {
            error = 'Password must contain at least one uppercase letter';
          } else if (!/[a-z]/.test(value)) {
            error = 'Password must contain at least one lowercase letter';
          } else if (!/\d/.test(value)) {
            error = 'Password must contain at least one digit';
          } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(value)) {
            error = 'Password must contain at least one symbol';
          }
          setPasswordError(error);
          break;

        case "phone_number":
          if (!/^[0-9]+$/.test(value)) {
            error = 'Phone number should only contain numeric';
          }
          setPhoneNumberError(error);
          break;

        case "email":
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if (!emailRegex.test(value)) {
            error = 'Invalid email address';
          }
          setEmailError(error);
          break;

        // Add more cases for other fields as needed

        default:
          break;
      }
    }

  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files) {
      formData.imgFile = null;
    }
    setFormData((previous) => ({
      ...previous,
      profile_image: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userId) {
      fData.append("first_name", formData.first_name);
      fData.append("last_name", formData.last_name);
      fData.append("email", formData.email);
      fData.append("phone_number", formData.phone_number);
      fData.append("address", formData.address);
      fData.append("department", formData.department);
      fData.append("user_type", formData.user_type);
      fData.append("account_status", formData.account_status);
      if (formData.profile_image) {
        fData.append("profile_image", formData.profile_image);
      }
      try {
        setIsLoading(true)
        const response = await api.put(`/updateuser/${userId}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })

        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201" ) {
          navigate('/dashboard/settings/users')
          setIsLoading(false)
          toast.success("User update successfully")
        }
      } catch (error) {
        
      }
    } else {
      fData.append("first_name", formData.first_name);
      fData.append("last_name", formData.last_name);
      fData.append("email", formData.email);
      fData.append("phone_number", formData.phone_number);
      fData.append("address", formData.address);
      fData.append("profile_image", formData.profile_image);
      fData.append("department", formData.department);
      fData.append("user_type", formData.user_type);
      fData.append("password", formData.password);
      fData.append("account_status", formData.account_status);
      try {
        setIsLoading(true)
        const response = await api.post(`/createuser`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })

        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201") {

          navigate('/dashboard/settings/users')
          setIsLoading(false)
          toast.success("User create successfully")
        }
      } catch (error) {
        
      } 
    }
  }

  const handleUpdateUser = async () => {
    try {
      
      const response = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const updatedUserById = response.data;

      setFormData({
        first_name: updatedUserById.first_name ? updatedUserById.first_name : null,
        last_name: updatedUserById.last_name ? updatedUserById.last_name : null,
        email: updatedUserById.email ? updatedUserById.email : null,
        phone_number: updatedUserById.phone_number ? updatedUserById.phone_number : null,
        address: updatedUserById.address ? updatedUserById.address : null,
        imgFile: updatedUserById.profile_image ? updatedUserById.profile_image : null,
        password: updatedUserById.password ? updatedUserById.password : null,
        user_type: updatedUserById.user_type ? updatedUserById.user_type : null,
        department: updatedUserById.department.id ? updatedUserById.department.id : null,
        account_status: updatedUserById.account_status ? updatedUserById.account_status : null,
      });
    }catch(error){
      
    }
  }
  
  useEffect(() => {
    AOS.init();
    handleUpdateUser()
    dispatch(getDepartmentData(token))
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
              User Registration
            </h2>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                FIRST NAME <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                placeholder="Enter First Name"
                fullWidth
                required
                error={Boolean(nameError)}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                LAST NAME <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                placeholder="Enter Last Name"
                fullWidth
                required
                error={Boolean(lastNameError)}
                helperText={lastNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                EMAIL <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="example@gmail.com"
                fullWidth
                required
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                PHONE NUMBER<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
                placeholder="Enter Phone Number"
                fullWidth
                required
                error={Boolean(phoneNumberError)}
                helperText={phoneNumberError}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
              <label>
                ADDRESS<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="address"
                onChange={handleChange}
                value={formData.address}
                placeholder="Enter Address"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>USER TYPE <span style={{ color: "red" }}>*</span></label>
              <Select
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                fullWidth
                required
              >
                {userType.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
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
              <label>ACCOUNT TYPE <span style={{ color: "red" }}>*</span></label>
              <Select
                name="account_status"
                value={formData.account_status}
                onChange={handleChange}
                fullWidth
                required
              >
                {accountType.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>


            <Grid item xs={12} sm={6} md={4}>
              <label>UPLOAD PHOTO <span style={{ color: "red" }}>*</span></label>
              <div className="App">
                <label htmlFor="upload-photo">
                  <TextField
                    className="bg-color"
                    id="upload-photo"
                    name="profile_image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    required={!userId}
                    style={{ width: "100%" }}
                  />
                </label>{" "}
              </div>
            </Grid>
            {!userId && <Grid item xs={12} sm={6} md={4}>
              <label>
                PASSWORD <span style={{ color: "red" }}>*</span>
                <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>Generate a strong password.</span>
              </label>
              <TextField
                type={showpass ? "text" : "password"}
                className="inputfield bg-color"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter Password"
                fullWidth
                required
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={passwordHandler}>
                        {showpass ? <MdVisibility /> : <MdVisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>}
            {!userId &&
              <Grid item xs={12} sm={6} md={4}>
                <label>
                  CONFIRM PASSWORD <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  type={showConfirmPass ? "text" : "password"}
                  className="inputfield bg-color"
                  name="confirm_password"
                  onChange={handleChange}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  fullWidth
                  required
                  error={Boolean(confirmPasswordError)}
                  helperText={confirmPasswordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={confirmPassHandler}>
                          {showConfirmPass ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

              </Grid>}

          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <div style={{ marginBlock: "5%" }}>
                <ImageList
                  sx={{ width: 400, height: "auto" }}
                  cols={2}
                  rowHeight={"auto"}
                >
                  <ImageListItem>
                    {formData.imgFile && (
                      <img
                        src={`${ImgUrl}${formData.imgFile}`}
                        alt="Uploaded file"
                        loading="lazy"
                      // required={!updatedUser}
                      />
                    )}
                    {formData.profile_image && (
                      <img
                        src={URL.createObjectURL(formData.profile_image)}
                        alt="Uploaded file"
                        loading="lazy"
                      // required={!updatedUser}
                      />
                    )}
                  </ImageListItem>
                </ImageList>
              </div>
              {/* <div className='user-image'>
             
               <FcBusinessman style={{fontSize:"270px"}}/>
                </div> */}
            </Grid>
          </Grid>
          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

          {isLoading ? <CommonLoading/> :  userId ? (
              // If updatedData exists, it's an update form, show the "Update" button
              <button type="submit" variant="contained" className="btn-bgColor">
                Update
              </button>
            ) : (
              // If updatedData is null, it's a new form, show the "Create" button
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

export default User