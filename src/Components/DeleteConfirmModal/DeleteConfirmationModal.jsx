import { Box } from '@mui/material';
import React from 'react';
import { Modal } from "@mui/material";
import '../Modal/Modal.css'
const DeleteConfirmationModal = ({ isDeleteModalOpen, onClose, onConfirm, heading }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        // border: "1px solid #6e85b7",
        borderRadius: "10px",
        width: "100px",
        height: "fit-content",
        overflow: "auto",
        "@media (max-width: 576px)": {
            width: "90%",
        },
    };
    return (
        <Modal open={isDeleteModalOpen}        >
            <div className="modal-top-container">
                <h4>Delete {heading}</h4>
            </div>
            <Box sx={style} className="scroll-bar">
                {/* ... Modal content ... */}
                <h2>Are you sure you want to delete this data?</h2>
                {/* <button onClick={onConfirm}>OK</button>
                <button onClick={onClose}>Cancel</button> */}

            </Box>
        </Modal>
    );
};

export default DeleteConfirmationModal;
