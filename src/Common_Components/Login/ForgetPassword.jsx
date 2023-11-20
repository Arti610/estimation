import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs'
import CommonLoading from "../../Components/Loader/CommonLoading"
import api from '../../Config/Apis';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const [useremail, setUserEmail] = useState("")
    const [msg, setmsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isOtpVisibility, setIsOtpVisibility] = useState(false)
    const [isOtpMessage, setIsOtpMessage] = useState(null)

    const handleForgetPassword = async (e) => {
        e.preventDefault()
        if (useremail) {
            localStorage.setItem('user.email', useremail)
            setmsg('')
            setIsLoading(true)
            try {
                const response = await api.post(`generate_otp`, { email: useremail },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                if (response.status === 200) {

                    setIsLoading(false)
                    setIsOtpVisibility(true)
                    setIsOtpMessage('OTP send successfully, check your email and verify OTP !')
                    setTimeout(() => {
                        navigate('/forget_password/verify_otp')
                    }, 4000);
                }

            }

            catch (e) {
                if (e.response.status === 400) {
                    setIsLoading(false)
                    setmsg(e.response.data.Message)
                }
                else {
                    setmsg('something went wrong')
                }
            }

        } else {
            setmsg('please enter your email')
        }
    }


    return (
        <section className="login-section login-page">

            <div className="login-left-container">
                <h1>WELCOME BACK !</h1>
                <p>You can sign in to access with your existing profile</p>
            </div>
            <div className="login-right-container">
                <div className="login-module-container">

                    <div className="login-portal-container">
                        <h2 style={{ color: "#826426" }}>PORTAL</h2>
                        <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE ENTER YOUR EMAIL BELOW:</p>
                    </div>
                    <div className="container">
                            <h1 className="login-header" style={{ fontSize: "1.3rem" }}>Forgot Your Password ?</h1>
                            <p style={{
                                color: "#bebb9c",
                                fontWeight: "300",
                                fontSize: "0.9rem",
                                textAlign: "center",
                                marginTop: "0.5rem",
                                lineSpacing: "0.5rem",
                                wordSpacing: "0.1rem"
                            }}>Enter your e-mail address and we'll send you a OTP to reset your password</p>

                            <form className="login-form" >
                                <div style={{ marginBlock: "2.5rem" }}>
                                    <input
                                        value={useremail}
                                        name="useremail"
                                        onChange={(e) => { setUserEmail(e.target.value) }}
                                        className="input-field"
                                        id="username"
                                        type="text"
                                        placeholder="Enter Your Email"
                                        required
                                    />
                                    <p style={{ color: "red", fontWeight: "bold", fontSize: "0.9rem", marginTop: "0.5rem", lineSpacing: "0.5rem", wordSpacing: "0.1rem" }}>{msg ? msg : null}</p>
                                </div>
                                {isLoading ? <CommonLoading /> : null}
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                                    <button className="login-button" style={{ display: "flex", alignItems: "center", width: "45%", backgroundColor: "transparent", border: "1px solid #bebb9e", color: "#bebb9c", marginTop: '8px', fontWeight: "400", }} onClick={() => navigate('/')}>
                                        <BsArrowLeftShort style={{ fontSize: "25px" }} />&nbsp;&nbsp;<span>Back to Login</span>
                                    </button>
                                    <button className="login-button" style={{ width: "45%", marginTop: '8px' }} onClick={handleForgetPassword}>
                                        Send OTP
                                    </button>
                                </div>
                            </form>

                        </div>
                   
            </div>
            </div>
        </section>
    )
}

export default ForgetPassword