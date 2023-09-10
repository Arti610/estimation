import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getCustomerData, deleteCustomerData, createCustomerData, updateCustomerData } from '../../APIs/CustomerSlice';
import ModalComp from '../../Components/Modal/ModalComp';




const CustomerList = () => {
    const dispatch = useDispatch();
    const CustomerDataBlank = ["Data Not Found"]
    const CustomerData = useSelector((state) => state.Customer.CustomerData);
    const [modalOpen, setModalOpen] = useState(false);
    const [cookies, setCookies] = useCookies(["token"])
    const token = cookies.token;
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [countryError, setCountryError] = useState('');

    const openModal = () => {
        setModalData({
            name: "",
            address: "",
            email: "",
            contact_person: "",
            country: "",
            mobile_number: "",
            trn_number: "",
            account_status: "",
            kyc_status: "",

        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const [modalData, setModalData] = useState({
        name: "",
        address: "",
        email: "",
        contact_person: "",
        country: "",
        mobile_number: "",
        trn_number: "",
        account_status: "",
        kyc_status: "",
    });


    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        let error = '';

        switch (name) {
            case "name":
                if (!/^[A-Za-z]+$/.test(value)) {
                    error = 'Name should only contain alphabetical characters';
                }
                setNameError(error);
                break;

            case "contact_person":
                if (!/^[A-Za-z]+$/.test(value)) {
                    error = 'Person name should only contain alphabetical characters';
                }
                setLastNameError(error);
                break;
            case "country":
                if (!/^[A-Za-z]+$/.test(value)) {
                    error = 'Country name should only contain alphabetical characters';
                }
                setCountryError(error);
                break;


            case "mobile_number":
                if (!/^[0-9]+$/.test(value)) {
                    error = 'Phone number should only contain numerical digits';
                }
                setPhoneNumberError(error);
                break;

            case "email":
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                if (!emailRegex.test(value)) {
                    error = 'Invalid email address';
                }
                setEmailError(error);
                break;

            // Add more cases for other fields as needed

            default:
                break;
        }
    };

    const createOrUpdateHandler = () => {
        if (modalData.id) {
            dispatch(
                updateCustomerData(
                    {
                        id: modalData.id,
                        updatedData: {
                            name: modalData.name,
                            address: modalData.address,
                            email: modalData.email,
                            contact_person: modalData.contact_person,
                            country: modalData.country,
                            mobile_number: modalData.mobile_number,
                            trn_number: modalData.trn_number,
                            account_status: modalData.account_status,
                            kyc_status: modalData.kyc_status,
                        },
                        token
                    }
                )
            );
        } else {

            dispatch(createCustomerData({ modalData, token }));
        }
        closeModal();
        dispatch(getCustomerData(token));
    };



    const editHandler = (id) => {
        const editData = CustomerData.find((data) => data.id === id);
        if (editData) {
            setModalData(editData);
            setModalOpen(true);
        }
    };

    const deleteHandler = (id) => {
        dispatch(deleteCustomerData(id));

    };

    useEffect(() => {

        dispatch(getCustomerData(token));

    }, [dispatch, token, modalOpen]);

    const header = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Contact Person",
            accessor: "contact_person",
        },
        {
            Header: "Country",
            accessor: "country",
        },
        {
            Header: "Mobile Number",
            accessor: "mobile_number",
        },

        {
            Header: "TRN Number",
            accessor: "trn_number",
        },

    ];

    return (
        <>
            {CustomerData ? <BasicTable
                colHeader={header}
                rowData={CustomerData}
                updateHandler={editHandler}
                deleteHandler={deleteHandler}
                createHandler={openModal}
                tableHeading="All Customers"
                pageHeading = "Customer"

            />
                : <BasicTable
                    colHeader={header}
                    rowData={CustomerDataBlank}
                    updateHandler={editHandler}
                    deleteHandler={deleteHandler}
                    createHandler={openModal}
                    tableHeading="All Customers"
                    pageHeading = "Customer"

                />}
            <ModalComp modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD Customer" heading="Customer" nameError={nameError} lastNameError={lastNameError} phoneNumberError={phoneNumberError} emailError={emailError} countryError={countryError} />
        </>
    );
};
export default CustomerList;
