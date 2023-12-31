import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {
    Autocomplete,
    Box,
    Grid,
    Modal,
    TextField,
} from '@mui/material';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { RxCross2 } from 'react-icons/rx';
import {
    getTaxData,
    deleteTaxData,
    createTaxData,
    updateTaxData,
    getupdateTaxData,
} from '../../APIs/TaxSlice';
import { getTaxAgencyData } from '../../APIs/TaxAgencySlice';
import { ToastContainer, toast } from 'react-toastify';

const TaxList = () => {

    const dispatch = useDispatch();
    const TaxDataBlank = ["Data Not Found"]

    const TaxData = useSelector((state) => state.Tax.TaxData)
    const TaxDataStatus = useSelector((state) => state.Tax.status)
    const updatedTaxData = useSelector((state) => state.Tax.updateTaxData);
    const Agency = useSelector((state) => state.TaxAgency.TaxAgencyData);

    const token = localStorage.getItem('Token');
    
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [nameError, setNameError] = useState('');
    const [rateError, setRateError] = useState('');
    const [taxDataHandler, setTaxDataHandler] = useState(false)
    const [modalData, setModalData] = useState({
        name: null,
        rate: null,
        agency: null,
    });

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTaxDataHandler(true)
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        // Validation
        let error = '';

        switch (name) {
            case 'name':
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Name should only contain alphabetical characters';
                }
                setNameError(error);
                break;
            case 'rate':
                if (!/^[0-9]+$/.test(value)) {
                    error = 'Rate should only contain numerical digits';
                }
                setRateError(error);
                break;
            default:
                break;
        }
    };
    
    const handleAutoComplete = (newValue, fieldName) => {
        const selectedValue = newValue ? newValue.id : null;

        setModalData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: selectedValue,
        }));
    };

    const createOrUpdateHandler = () => {
        if (updatedTaxData) {
            const updatedFields = {
                name: modalData.name,
                rate: modalData.rate,
                agency: modalData.agency,
            };

            dispatch(updateTaxData({
                id: updatedTaxData.id,
                updatedData: updatedFields,
                token,
            }));
            if(TaxDataStatus.update === "succeeded"){
                toast.success("Tax update successfully !")
            }
            setTaxDataHandler(true)

        } else {
            dispatch(createTaxData({ modalData, token }));
            if(TaxDataStatus.create === "succeeded"){
                toast.success("Tax create successfully !")
            }
        }
        closeModal();
        dispatch(getTaxData(token));
    };


    const editHandler = (id) => {
        setTaxDataHandler(false)
        dispatch(getupdateTaxData({ id, token }));
        setModalOpen(true);
    };

    const deleteHandler = (id) => {

        dispatch(deleteTaxData({ id, token }))
            .then(() => {
                // Once the delete action is completed successfully, dispatch the get action
                dispatch(getTaxData(token));
            })
            .catch((error) => {
                // Handle any errors from the delete operation
                alert("wait")
            });
    };

    useEffect(() => {
        dispatch(getTaxData(token));
        dispatch(getTaxAgencyData(token));
        if (updatedTaxData) {
            setModalData({
                name: updatedTaxData.name,
                rate: updatedTaxData.rate,
                agency: String(updatedTaxData.agency.id),  // Set the whole agency object
            });
        }
        if (taxDataHandler) {
            setModalData({
                name: null,
                rate: null,
                agency: null  // Set the whole agency object
            });
        }
    }, [dispatch, token, modalOpen, updatedTaxData]);

    const header = [
        {
            Header: "Serial No",
            accessor: (row, index) => index + 1,
            id: "serialNumber", // A unique ID for this column
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Rate',
            accessor: 'rate',
        },
        {
            Header: 'Agency',
            accessor: 'agency.name',
        },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '10px',
        height: 'fit-content',
        overflow: 'auto',
        '@media (max-width: 576px)': {
            width: '90%',
        },
    };

    return (
        <>
            <ToastContainer />
          
            {TaxData ? (
                <BasicTable
                    colHeader={header}
                    rowData={TaxData}
                    updateHandler={editHandler}
                    deleteHandler={deleteHandler}
                    createHandler={openModal}
                    tableHeading="All Taxes"
                    pageHeading='Tax'
                />
            ) : (
                <BasicTable
                    colHeader={header}
                    rowData={TaxDataBlank}
                    updateHandler={editHandler}
                    deleteHandler={deleteHandler}
                    createHandler={openModal}
                    tableHeading="All Taxes"
                    pageHeading='Tax'
                />
            )}

            <Modal
                open={modalOpen}
                // onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="scroll-bar">
                    <div className="modal-top-container">
                        <h4>
                            {updatedTaxData
                                ? `Update Tax`
                                : `Tax`}
                        </h4>
                        <RxCross2 onClick={closeModal} className="modal-btn-cross" />
                    </div>
                    <form>
                        <Grid item xs={12} sm={6} md={4}>
                            <label>
                                TAX NAME <span style={{ color: 'red' }}>*</span>
                            </label>
                            <TextField
                                type="text"
                                className="inputfield bg-color"
                                name="name"
                                onChange={handleModalInputChange}
                                value={modalData.name}
                                placeholder="Enter Name"
                                fullWidth
                                required
                                error={Boolean(nameError)}
                                helperText={nameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <label>
                                RATE <span style={{ color: 'red' }}>*</span>
                            </label>
                            <TextField
                                type="text"
                                className="inputfield bg-color"
                                name="rate"
                                onChange={handleModalInputChange}
                                value={modalData.rate}
                                placeholder="Enter Rate"
                                fullWidth
                                required
                                error={Boolean(rateError)}
                                helperText={rateError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <label>
                                TAX AGENCIES NAME <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Autocomplete
                                name="agency"
                                // value={modalData.agency}
                                value={
                                    Agency &&
                                    modalData.agency &&
                                    Agency.find((item) => item.id === Number(modalData.agency))
                                }
                                onChange={(event, value) => handleAutoComplete(value, 'agency')}
                                disablePortal
                                id="combo-box-demo"
                                options={Agency ? Agency : []}
                                getOptionLabel={(option) => option.name}
                                required
                                renderInput={(params) => (
                                    <TextField className="bg-color" placeholder="Select Agency" {...params} />
                                )}
                            />
                        </Grid>
                        <button
                            variant="outlined"
                            type="submit"
                            style={{
                                margin: '15px',
                                float: 'right',
                                fontSize: '12px',
                            }}
                            onClick={createOrUpdateHandler}
                        >
                            {updatedTaxData ? 'UPDATE' : 'CREATE'}
                        </button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default TaxList;
