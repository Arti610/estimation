import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import CommonLoading from '../../Components/Loader/CommonLoading';
import api from '../../Config/Apis';

const ForgetPasswordOTP = () => {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState('');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isOtpVisibility, setIsOtpVisibility] = useState(false)
    const [isOtpMessage, setIsOtpMessage] = useState(null)

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const email = localStorage.getItem('user.email');
        if (OTP) {
            try {
                const response = await api.post(
                    `verify_otp`,
                    { email: email, otp: OTP },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    setIsLoading(false)
                    navigate('/forget_password/reset_password');
                }
                if (response.status === 400) {

                    setMsg(response.data.msg);
                }
            } catch (e) {
                if (e.response.status === 400) {
                    setIsLoading(false)
                    setMsg(e.response.data.Message);
                } else {
                    setMsg('Something went wrong');
                }
            }
        } else {
            setIsLoading(false)
            setMsg('Invalid OTP');
        }
    };

    const handleResendOTP = async () => {
        const email = localStorage.getItem('user.email');
        setIsLoading(true)
        try {
            const response = await api.post(
                `generate_otp`,
                { email: email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                setIsLoading(false)
                setIsOtpVisibility(true)
                setIsOtpMessage('OTP resend successfully, check your email and verify OTP !');
                setTimeout(() => {
                    setIsOtpVisibility(false)
                }, 3000);
            }
            if (response.status === 400) {
                setMsg(response.data.msg);
            }
        } catch (e) {
            setMsg('Something went wrong while resending OTP');
        }
    };

    return (
        <>
            <section className="login-section login-page">
                <div className="login-left-container">
                    <h1>WELCOME BACK !</h1>
                    <p>You can sign in to access with your existing profile</p>
                </div>
                <div className="login-right-container">
                    <div className="login-module-container">
                        <div className="login-portal-container">
                            <h2 style={{ color: '#826426' }}>PORTAL</h2>
                            <p style={{ color: '#222222', fontSize: '12.5px', fontWeight: 'bold' }}>
                                PLEASE ENTER OTP BELOW:
                            </p>
                        </div>
                        <div className="container">
                            <h1
                                className="login-header"
                                style={{
                                    fontSize: '1.3rem',
                                }}
                            >
                                Forgot Your Password ?
                            </h1>
                            <p
                                style={{
                                    color: '#bebb9c',
                                    fontWeight: '300',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    marginTop: '0.5rem',
                                    lineSpacing: '0.5rem',
                                    wordSpacing: '0.1rem',
                                }}
                            >
                                Enter your OTP and verify
                            </p>

                            <form className="login-form">
                                <div style={{ marginBlock: "2.5rem" }}>
                                    <input
                                        value={OTP}
                                        name="OTP"
                                        type="number"
                                        onChange={(e) => {
                                            setOTP(e.target.value);
                                        }}
                                        className="input-field"
                                        id="OTPname"
                                        placeholder="Enter Your OTP"
                                        required
                                        style={{ '-moz-appearance': 'textfield' }}
                                    />

                                    <p
                                        style={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            marginTop: '0.5rem',
                                            lineSpacing: '0.5rem',
                                            wordSpacing: '0.1rem',
                                        }}
                                    >
                                        {msg ? msg : null}
                                    </p>
                                    <Link style={{ color: 'black', fontSize: '1rem' }}>
                                        <p onClick={handleResendOTP}>Resend OTP</p>
                                    </Link>
                                    {isLoading ? <CommonLoading /> : null}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button
                                        className="login-button"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '45%',
                                            backgroundColor: 'transparent',
                                            border: '1px solid #bebb9e',
                                            color: '#bebb9c',
                                            marginTop: '8px',
                                            fontWeight: '400',
                                        }}
                                        onClick={() => navigate('/')}
                                    >
                                        <BsArrowLeftShort style={{ fontSize: '25px' }} />
                                        &nbsp;&nbsp;<span>Back to Login</span>
                                    </button>
                                    <button className="login-button" style={{ width: '45%', marginTop: '8px' }} onClick={handleVerifyOTP}>
                                        Verify OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile View */}
            <div className="login-right-container-mobile">
                <div >
                    <div >
                        <h2 style={{ color: '#826426' }}>PORTAL</h2>
                        <p style={{ color: '#222222', fontSize: '12.5px', fontWeight: 'bold' }}>
                            PLEASE ENTER OTP BELOW:
                        </p>
                    </div>
                    <div className="forget-password-container">
                        <h1 className="login-header" style={{ fontSize: '1.3rem', }}>Forgot Your Password ?</h1>
                        <p
                            style={{
                                color: '#bebb9c',
                                fontWeight: '300',
                                fontSize: '0.9rem',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                                lineSpacing: '0.5rem',
                                wordSpacing: '0.1rem',
                            }}
                        >
                            Enter your OTP and verify
                        </p>

                        <form className="login-form">
                            <div className='form-group'>
                                <input
                                    value={OTP}
                                    name="OTP"
                                    type="number"
                                    onChange={(e) => {
                                        setOTP(e.target.value);
                                    }}
                                    className="input-field"
                                    id="OTPname"
                                    placeholder="Enter Your OTP"
                                    required
                                    style={{ '-moz-appearance': 'textfield' }}
                                />

                                <p
                                    style={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        marginTop: '0.5rem',
                                        lineSpacing: '0.5rem',
                                        wordSpacing: '0.1rem',
                                    }}
                                >
                                    {msg ? msg : null}
                                </p>
                                <Link style={{ color: 'black', fontSize: '1rem' }}>
                                    <p onClick={handleResendOTP}>Resend OTP</p>
                                </Link>
                                {isLoading ? <CommonLoading /> : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    className="login-button"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '45%',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #bebb9e',
                                        color: '#bebb9c',
                                        marginTop: '8px',
                                        fontWeight: '400',
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    <BsArrowLeftShort style={{ fontSize: '25px' }} />
                                    &nbsp;&nbsp;<span>Back to Login</span>
                                </button>
                                <button className="login-button" style={{ width: '45%', marginTop: '8px' }} onClick={handleVerifyOTP}>
                                    Verify OTP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgetPasswordOTP;
