import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Register.css";
import { ImgUrl } from "../../Config/Config";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import api from "../../Config/Apis";
import { ToastContainer, toast } from "react-toastify";
import CommonLoading from "../../Components/Loader/CommonLoading";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fData = new FormData();
  const token = localStorage.getItem("Token");

  const { userId } = useParams();

  const [showpass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const accountType = ["Active", "Closed", "Suspended"];
  const userType = ["Admin", "Operator", "Customer"];

  const updatedUser = useSelector((state) => state.User.updateUserData);

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
    account_status: null,
  });

  const passwordHandler = () => {
    setShowPass(!showpass);
  };

  const confirmPassHandler = () => {
    setShowConfirmPass(!showConfirmPass);
  };

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
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    } else {
      // Update other form fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // Validation
      let error = "";

      switch (name) {
        case "first_name":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Name should only contain alphabetic";
          }
          setNameError(error);
          break;

        case "last_name":
          if (!/^[A-Za-z\s]+$/.test(value)) {
            error = "Last name should only contain alphabetic";
          }
          setLastNameError(error);
          break;

        case "password":
          if (value.length < 8) {
            error = "Password must be at least 8 characters long";
          } else if (!/[A-Z]/.test(value)) {
            error = "Password must contain at least one uppercase letter";
          } else if (!/[a-z]/.test(value)) {
            error = "Password must contain at least one lowercase letter";
          } else if (!/\d/.test(value)) {
            error = "Password must contain at least one digit";
          } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(value)) {
            error = "Password must contain at least one symbol";
          }
          setPasswordError(error);
          break;

        case "phone_number":
          if (!/^[0-9]+$/.test(value)) {
            error = "Phone number should only contain numeric";
          }
          setPhoneNumberError(error);
          break;

        case "email":
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if (!emailRegex.test(value)) {
            error = "Invalid email address";
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
    e.preventDefault();
    if (userId) {
      fData.append("first_name", formData.first_name);
      fData.append("last_name", formData.last_name);
      fData.append("email", formData.email);
      fData.append("phone_number", formData.phone_number);
      fData.append("address", formData.address);
      fData.append("user_type", formData.user_type);
      fData.append("account_status", formData.account_status);
      if (formData.profile_image) {
        fData.append("profile_image", formData.profile_image);
      }
      try {
        setIsLoading(true);
        const response = await api.put(`/updateuser/${userId}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        });

        if (
          response.statusText === "OK" ||
          response.status === "200" ||
          response.statusText === "Created" ||
          response.status === "201"
        ) {
          navigate("/dashboard/settings/users");
          setIsLoading(false);
          toast.success("User update successfully");
        }
      } catch (error) {}
    } else {
      fData.append("first_name", formData.first_name);
      fData.append("last_name", formData.last_name);
      fData.append("email", formData.email);
      fData.append("phone_number", formData.phone_number);
      fData.append("address", formData.address);
      fData.append("profile_image", formData.profile_image);
      fData.append("user_type", formData.user_type);
      fData.append("password", formData.password);
      fData.append("account_status", formData.account_status);
      try {
        setIsLoading(true);
        const response = await api.post(`/createuser`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        });

        if (
          response.statusText === "OK" ||
          response.status === "200" ||
          response.statusText === "Created" ||
          response.status === "201"
        ) {
          navigate("/dashboard/settings/users");
          setIsLoading(false);
          toast.success("User create successfully");
        } else {
          toast.error("All users with this email already exist !");
        }
      } catch (error) {}
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const updatedUserById = response.data;

      setFormData({
        first_name: updatedUserById.first_name
          ? updatedUserById.first_name
          : null,
        last_name: updatedUserById.last_name ? updatedUserById.last_name : null,
        email: updatedUserById.email ? updatedUserById.email : null,
        phone_number: updatedUserById.phone_number
          ? updatedUserById.phone_number
          : null,
        address: updatedUserById.address ? updatedUserById.address : null,
        imgFile: updatedUserById.profile_image
          ? updatedUserById.profile_image
          : null,
        password: updatedUserById.password ? updatedUserById.password : null,
        user_type: updatedUserById.user_type ? updatedUserById.user_type : null,
        account_status: updatedUserById.account_status
          ? updatedUserById.account_status
          : null,
      });
    } catch (error) {}
  };

  useEffect(() => {
    AOS.init();
    handleUpdateUser();
  }, [token]);

  return (
    <>
      <ToastContainer />
      <div className="login-section register-page">
        <div className="login-left-container">
          <h1>WELCOME BACK!</h1>
          <p>You can sign in to access with your existing profile</p>
        </div>

        <div className="register-right-container">
          <div className="register-module-container">
            <div className="login-portal-container">
              <h2 style={{ color: "#826426" }}>PORTAL</h2>
              <p
                style={{
                  color: "#222222",
                  fontSize: "12.5px",
                  fontWeight: "bold",
                }}
              >
                PLEASE REGISTER YOUR ACCOUNT BELOW:
              </p>
            </div>

            <div className="register-container">
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
                      placeholder="First Name"
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
                      placeholder="Last Name"
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
                    <label>
                      USER TYPE <span style={{ color: "red" }}>*</span>
                    </label>
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
                      ACCOUNT TYPE <span style={{ color: "red" }}>*</span>
                    </label>
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

                  <Grid item xs={12} sm={6} md={4}>
                    <label>
                      UPLOAD PHOTO <span style={{ color: "red" }}>*</span>
                    </label>
                    <label htmlFor="upload-photo">
                      <TextField
                        className="bg-color"
                        id="upload-photo"
                        name="profile_image"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                        style={{ width: "100%" }}
                      />
                    </label>{" "}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {!userId && (
                    <Grid item xs={12} sm={6} md={4}>
                      <label>
                        PASSWORD <span style={{ color: "red" }}>*</span>
                        {/* <p style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>Generate a strong password.</p> */}
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
                                {showpass ? (
                                  <MdVisibility />
                                ) : (
                                  <MdVisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )}
                  {!userId && (
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
                                {showConfirmPass ? (
                                  <MdVisibility />
                                ) : (
                                  <MdVisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={4} md={4}>
                    <ImageList
                      sx={{ width: 200, height: "auto" }}
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
                  </Grid>
                </Grid>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    gap: "30px",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
                    <CommonLoading />
                  ) : (
                    <button
                      className="login-button"
                      style={{ width: "fit-content", marginTop: "8px" }}
                    >
                      Register
                    </button>
                  )}
                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        color: "#836628",
                        fontSize: "0.95rem",
                        fontWeight: "bold",
                      }}
                    >
                      Back to login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
