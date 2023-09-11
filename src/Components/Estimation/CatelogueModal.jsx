// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import { RxCross2 } from "react-icons/rx";
// import { MenuItem, Modal, Select } from "@mui/material";
// import { getCatelogueData, getupdateCatelogueData } from "../../APIs/CatelogueSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { ImgUrl } from "../../Config/Config";

// const CatelogueModal = (props) => {
//     const style = {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         width: "1100px",
//         transform: "translate(-50%, -50%)",
//         backgroundColor: "#fff",
//         // border: "1px solid #6e85b7",
//         borderRadius: "10px",
//         height: "fit-content",
//         overflow: "auto",
//         height: "550px",
//         "@media (max-width: 576px)": {
//             width: "90%",
//         },
//     };
//     const dispatch = useDispatch()
//     const [cookies, setCookies] = useState(['token'])
//     const token = cookies.token;
//     const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);

//     useEffect(() => {
//         dispatch(getCatelogueData(token));
//     }, []);
//     return (
//         <>
//             <Modal
//                 open={props.openModal}
//                 // onClose={props.closeERModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >

//                 <Box sx={style} className="scroll-bar">
//                     <div className="modal-top-container">
//                         <h4>CETELOGUE ITEMS</h4>
//                         <RxCross2 onClick={props.modalClose} className="modal-btn-cross" />

//                     </div>
//                     <div className="main-product-container">
//                         {catelogueData && catelogueData ? catelogueData.map((item, index) => (

//                             <div className="product-container" key={index} onClick={() => props.handleClick(item.id)}>
//                                 <div className="product-image">
//                                     <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
//                                 </div>
//                                 <div className="product-details">
//                                     <h3>{item.name}</h3>
//                                     <p><span>{item.model}</span><span>{ }</span></p>
//                                     {item.isactive ? "Active" : "Inactive"}
//                                 </div>
//                             </div>

//                         )) : "Loading....."}
//                     </div>
//                 </Box>
//             </Modal>
//         </>
//     );
// };

// export default CatelogueModal;
