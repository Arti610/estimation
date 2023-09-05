// import React, { useEffect } from "react";
// import Box from "@mui/material/Box";
// import { RxCross2 } from "react-icons/rx";
// import { Autocomplete, Modal } from "@mui/material";
// import { TextField, Button, Grid, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { getTaxAgencyData } from "../../APIs/TaxAgencySlice";
// import { useCookies } from "react-cookie";
// import './Modal.css'
// const TaxModal = (props) => {
//     const style = {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         backgroundColor: "#fff",
//         borderRadius: "10px",
//         height: "fit-content",
//         overflow: "auto",
//         "@media (max-width: 576px)": {
//             width: "90%",
//         },
//     };
//     const dispatch = useDispatch()


//     const [cookies, setCookies] = useCookies(["token"])
//     const token = cookies.token;
//     useEffect(() => {
//         dispatch(props.getTaxAgencyData(token))

//     }, [])
//     return (
//         <>
//             <Modal
//                 open={props.modalOpen}
//                 onClose={props.closeModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style} className="scroll-bar">
//                     <div className="modal-top-container">
//                         <h4>  {props.modalData.id
//                             ? `Update ${props.heading}`
//                             : `${props.heading}`}</h4>

//                         <RxCross2 onClick={props.closeModal} className="modal-btn-cross" />

//                     </div>
//                     <form>


//                         <Grid item xs={12} sm={6} md={4}>
//                             <label>
//                                 TAX NAME <span style={{ color: "red" }}>*</span>
//                             </label>
//                             <TextField
//                                 type="text"
//                                 className="inputfield bg-color"
//                                 name="name"
//                                 onChange={props.handleModalInputChange}
//                                 value={props.modalData.name}
//                                 placeholder="Enter Name"
//                                 fullWidth
//                                 required
//                                 error={Boolean(props.nameError)}
//                                 helperText={props.nameError}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={4}>
//                             <label>
//                                 RATE <span style={{ color: "red" }}>*</span>
//                             </label>
//                             <TextField
//                                 type="text"
//                                 className="inputfield bg-color"
//                                 name="rate"
//                                 onChange={props.handleModalInputChange}
//                                 value={props.modalData.rate}
//                                 placeholder="Enter Rate"
//                                 fullWidth
//                                 required
//                                 error={Boolean(props.rateError)}
//                                 helperText={props.rateError}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={4}>
//                             <label>
//                                 TAX AGENCIES NAME <span style={{ color: "red" }}>*</span>
//                             </label>

//                             <Autocomplete
//                                 name="agency"
//                                 value={
//                                     props.Agency &&
//                                     props.modalData.agency &&
//                                     props.Agency.find((item) => item.id === Number(props.modalData.agency))
//                                 }
//                                 onChange={(event, value) => props.handleAutoComplete(value, "agency")}
//                                 disablePortal
//                                 id="combo-box-demo"
//                                 options={props.Agency}
//                                 getOptionLabel={(option) => option.name}
//                                 required
//                                 renderInput={(params) => (
//                                     <TextField
//                                         className="bg-color"
//                                         placeholder="Select Agency"
//                                         {...params}
//                                     />
//                                 )}
//                             />
//                         </Grid>

//                         <button
//                             variant="outlined"
//                             type="submit"
//                             style={{


//                                 margin: "15px",
//                                 float: "right",
//                                 fontSize: "12px",


//                             }}
//                             onClick={props.createOrUpdateHandler}
//                         >
//                             {props.modalData.id ? "UPDATE" : "CREATE"}
//                         </button>
//                     </form>
//                 </Box>
//             </Modal>
//         </>
//     );
// };

// export default TaxModal;
