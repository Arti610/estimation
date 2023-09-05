import React from "react";
import Box from "@mui/material/Box";
import { RxCross2 } from "react-icons/rx";
import { Modal } from "@mui/material";
import { TextField, Button, Grid, Typography } from "@mui/material";
import './Modal.css'
const TaxAgencyModal = (props) => {
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

    return (
        <>
            <Modal
                open={props.modalOpen}
                onClose={props.closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="scroll-bar">
                    <div className="modal-top-container">
                        <h4>  {props.modalData.id
                            ? `Update ${props.heading}`
                            : `${props.heading}`}</h4>

                        <RxCross2 onClick={props.closeModal} className="modal-btn-cross" />

                    </div>
                    <form>
                        <Grid item xs={12} sm={6} md={4}>
                            <label>
                                TAX AGENCY NAME <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                type="text"
                                name="name"
                                onChange={props.handleModalInputChange}
                                value={props.modalData.name}
                                placeholder="Enter Name"
                                fullWidth
                                required
                            />
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

export default TaxAgencyModal;
