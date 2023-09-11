// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import { RxCross2 } from "react-icons/rx";
// import { MenuItem, Modal, Select } from "@mui/material";
// import { TextField, Button, Grid, Typography } from "@mui/material";
// import CatelogueModal from "./CatelogueModal";
// import { useDispatch, useSelector } from "react-redux";
// import './EstimationRateModal.css'
// import { getupdateCatelogueData } from "../../APIs/CatelogueSlice";
// const EstimationRateModal = (props) => {
//     const style = {
//         position: "absolute",
//         top: "20%",
//         left: "50%",
//         // width:"1000 px",
//         transform: "translate(-50%, -50%)",

//         backgroundColor: "#fff",
//         // border: "1px solid #6e85b7",
//         borderRadius: "10px",
//         height: "fit-content",
//         overflow: "auto",
//         "@media (max-width: 576px)": {
//             width: "90%",
//         },
//     };
//     const dispatch = useDispatch()
//     const [cookies, setCookies] = useState(['token'])
//     const token = cookies.token;
//     const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)


//     const [formData, setFormData] = useState({
//         name: [null]
//     });
//     const [openModal, setOpenModal] = useState(false)
//     const modalOpen = () => {
//         setOpenModal(true)
//     }
//     const modalClose = () => {
//         setOpenModal(false)
//     }

//     const handleAddMore = () => {
//         setFormData((prevData) => ({
//             ...prevData,
//             name: [...prevData.name, null],
//         }));
//     };
    
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission here, e.g., send data to the server
//         console.log(formData);
//     };
//     const handleCateModal = (index) => {
//         console.log("index", index);
//         modalOpen(index)

//         // setFormData((prevData) => {
//         //     const updatedData = [...prevData.name]; // Assuming 'prevData.name' is an array
//         //     // Assuming 'CatelogueData.catelouge.name' is the new value to be added at 'index'
//         //     console.log("CatelogueData.catelouge.name",CatelogueData);
//         //     updatedData[index] = CatelogueData.catelouge.name;       
//         //     return {
//         //       ...prevData,
//         //       name: updatedData
//         //     };
//         //   });
//     }
//     const handleClick = (id, index) => {
//         dispatch(getupdateCatelogueData({ token, id, index: index }))
//         // DataHandle()
//         modalClose()
//         // cateloguePromise(id)
//     }
//     // const cateloguePromise = (id) => {
        
//     //     return new Promise((resolve, reject) => {
//     //         console.log("idtttttttt", id);
//     //         dispatch(getupdateCatelogueData({ token, id }))
//     //         setTimeout(() => {
//     //             const data = CatelogueData;
//     //             console.log("data", data);
//     //             // Check if CatelogueData is not null and contains the expected properties
//     //             if (data && data.catelouge && data.catelouge.name !== null) {
//     //                 resolve(data);
//     //             } else {
//     //                 reject(new Error("Invalid CatelogueData"));
//     //             }
//     //         }, 2000); // Introduce a 1-second delay using setTimeout
//     //     });
//     // };

//     // const DataHandle = (index) => {
//     //     // Using the Promise
//     //     cateloguePromise()
//     //         .then((result) => {
//     //             console.log("Success:", result); // Handle success
//     //             // setFormData((prevData) => {
//     //             //     const updatedData = [...prevData.name]; // Assuming 'prevData.name' is an array
//     //             //     console.log("CatelogueData.catelouge.name", CatelogueData);
//     //             //     updatedData[index] = CatelogueData.catelouge.name;
//     //             //     return {
//     //             //         ...prevData,
//     //             //         name: updatedData,
//     //             //     };
//     //             // });
//     //         })
//     //         .catch((error) => {
//     //             console.log("Error:", error.message); // Handle error and display the error message
//     //         });
//     // }


//     return (
//         <>
//             <Modal
//                 open={props.erModal}
//                 // onClose={props.closeERModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >

//                 <Box sx={style} >
//                     <div className="modal-top-container">
//                         <h4> ESTIMATION RESOURCE DETAILS</h4>
//                         <RxCross2 onClick={props.closeERModal} className="modal-btn-cross" />

//                     </div>
//                     <form onSubmit={handleFormSubmit}>
//                         {formData.name.map((item, index) => (
//                             <div key={index} className="estimation-resouce-details">
//                                 {/* Render your form fields here */}
//                                 {/* Use index to differentiate fields when rendering */}
//                                 <div className="estimation-resouce-list">
//                                     <label>ITEM NAME</label>
//                                     <input
//                                         type="text"
//                                         className="inputfield bg-color"
//                                         name={`name-${index}`}
//                                         value={CatelogueData && CatelogueData.catelouge.name}
//                                         // value={formData.name[index]}
//                                         // value={item.name}
//                                         placeholder="Select Catalogue"
//                                         fullWidth
//                                         required
//                                         onClick={() => handleCateModal(index)}
//                                     // Add onChange handler if needed
//                                     />
//                                 </div>
//                                 {/* Repeat similar code for other fields */}
//                                 <CatelogueModal handleClick={handleClick} openModal={openModal} modalOpen={modalOpen} modalClose={modalClose} index={index} />
//                             </div>
//                         ))}
//                         <button type="submit">Save</button>
//                     </form>
//                     <button onClick={handleAddMore}>Add More</button>
//                     {/* <form>
                     
//                          <div className="estimation-resouce-details">
//                          <div className="estimation-resouce-list">
//                              <label>
//                                  ITEM NAME
//                              </label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="name"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.name}
//                                  placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                                  onClick={handleCateModal}
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />

//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>
//                                  UNIT
//                              </label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="unit_of_measurement"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.unit_of_measurement}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />
//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>QUANTITY </label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="quantity"
//                                  // onChange={props.handleModalInputChange}
//                                  // value={props.modalData.name}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />

//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>RATE</label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="list_price"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.list_price}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />

//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>DISCOUNT</label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="discount"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.discount}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />

//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>VAT TYPE</label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  // name="name"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.tax.name}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />
//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>VAT PERCENT</label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  // name="name"
//                                  // onChange={props.handleModalInputChange}
//                                  value={CatelogueData && CatelogueData.catelouge.tax.rate}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />
//                          </div>
//                          <div className="estimation-resouce-list">
//                              <label>ESTIMATION</label>
//                              <TextField
//                                  type="text"
//                                  className="inputfield bg-color"
//                                  name="name"
//                                  // onChange={props.handleModalInputChange}
//                                  // value={props.modalData.name}
//                                  // placeholder="Select Catelogue"
//                                  fullWidth
//                                  required
//                              // error={Boolean(props.nameError)}
//                              // helperText={props.nameError}
//                              />
//                          </div>
//                      </div>
                      

//                         <button variant="outlined" type="submit">
//                             Save
//                         </button>
//                     </form> */}
//                 </Box>
//             </Modal>
//         </>
//     );
// };

// export default EstimationRateModal;


