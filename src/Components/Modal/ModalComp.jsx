import React from "react";
import Box from "@mui/material/Box";
import { RxCross2 } from "react-icons/rx";
import { MenuItem, Modal, Select } from "@mui/material";
import { TextField, Button, Grid, Typography } from "@mui/material";

const ModalComp = (props) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        // border: "1px solid #6e85b7",
        borderRadius: "10px",
        height: "fit-content",
        overflow: "auto",
        "@media (max-width: 576px)": {
            width: "90%",
        },
    };
    const accountType = ['Active', 'Closed', 'Suspended']
    return (
        <>
            <Modal
                open={props.modalOpen}
                onClose={props.closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="scroll-bar">
                    {/* ... Modal content ... */}
                    <div className="modal-top-container">
                        <h4>  {props.modalData.id
                            ? `Update ${props.heading}`
                            : `${props.heading}`}</h4>

                        <RxCross2 onClick={props.closeModal} className="modal-btn-cross" />

                    </div>
                    <form>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>
                                    NAME <span style={{ color: "red" }}>*</span>
                                </label>

                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="name"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.name}
                                    placeholder="Enter Name"
                                    fullWidth
                                    required
                                    error={Boolean(props.nameError)}
                                    helperText={props.nameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>
                                    TRN NUMBER <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="trn_number"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.trn_number}
                                    placeholder="Enter TRN Number"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>EMAIL <span style={{ color: "red" }}>*</span></label>

                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="email"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.email}
                                    placeholder="example@gmail.com"
                                    fullWidth
                                    required
                                    error={Boolean(props.emailError)}
                                    helperText={props.emailError}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>CONTACT PERSON <span style={{ color: "red" }}>*</span></label>

                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="contact_person"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.contact_person}
                                    placeholder="Enter Contact Person"
                                    fullWidth
                                    required
                                    error={Boolean(props.lastNameError)}
                                    helperText={props.lastNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>COUNTRY <span style={{ color: "red" }}>*</span></label>
                            
                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="country"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.country}
                                    placeholder="Enter Country Name"
                                    fullWidth
                                    required
                                    error={Boolean(props.countryError)}
                                    helperText={props.countryError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>MOBILE NUMBER <span style={{ color: "red" }}>*</span></label>

                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="mobile_number"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.mobile_number}
                                    placeholder="Enter Mobile Number"
                                    fullWidth
                                    required
                                    error={Boolean(props.phoneNumberError)}
                                    helperText={props.phoneNumberError}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <label>ACCOUNT STATUS <span style={{ color: "red" }}>*</span></label>
                                <Select
                                    name="account_status"
                                    value={props.modalData.account_status}
                                    onChange={props.handleModalInputChange}
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
                            <Grid item xs={12} sm={6} md={8}>

                                <label>ADDRESS <span style={{ color: "red" }}>*</span></label>
                                <TextField
                                    type="text"
                                    className="inputfield bg-color"
                                    name="address"
                                    onChange={props.handleModalInputChange}
                                    value={props.modalData.address}
                                    placeholder="Enter Address"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>

                        <button
                            variant="outlined"
                            type="submit"
                            style={{

                                margin: "15px",
                                float: "right",
                                fontSize: "12px",

                            }}
                            onClick={props.createOrUpdateHandler}
                        >
                            {props.modalData.id ? "UPDATE" : "CREATE"}
                        </button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComp;
