import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getEmployerData, deleteEmployerData, createEmployerData, updateEmployerData } from '../../APIs/EmployerSlice';
import EmployerModal from '../../Components/Modal/EmployerModal';


const EmployerList = () => {
    const dispatch = useDispatch();
    const EmployerDataBlank = ["Data Not Found"]
    const EmployerData = useSelector((state) => state.Employer.EmployerData);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('Token');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [modalData, setModalData] = useState({
        name: "",
        email: "",
        address: "",
        country: ""
    });

    const openModal = () => {
        setModalData({
            name: "",
            email: "",
            address: "",
            country: ""
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        let error = '';

        switch (name) {
            case "name":
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Name should only contain alphabetic';
                }
                setNameError(error);
                break;


            case "country":
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = 'Country name should only contain alphabetic';
                }
                setCountryError(error);
                break;


            case "mobile_number":
                if (!/^[0-9]+$/.test(value)) {
                    error = 'Phone number should only contain numeric';
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
                updateEmployerData(
                    {
                        id: modalData.id,
                        updatedData: {
                            name: modalData.name,
                            email: modalData.email,
                            address: modalData.address,
                            country: modalData.country,
                        },
                        token
                    }
                )
            );
        } else {


            dispatch(createEmployerData({ modalData, token }));
        }
        closeModal();
        dispatch(getEmployerData(token));
    };



    const editHandler = (id) => {
        const editData = EmployerData.find((data) => data.id === id);
        if (editData) {
            setModalData(editData);
            setModalOpen(true);
        }
    };

    const deleteHandler = (id) => {
        dispatch(deleteEmployerData({id, token}))
          .then(() => {
            // Once the delete action is completed successfully, dispatch the get action
            dispatch(getEmployerData(token));
          })
          .catch((error) => {
            // Handle any errors from the delete operation
            alert("wait")
          });
      };
    useEffect(() => {

        dispatch(getEmployerData(token));

    }, [dispatch, token, modalOpen]);

    const header = [
        {
            Header: "Serial No",
            accessor: (row, index) => index + 1,
            id: "serialNumber", // A unique ID for this column
          },
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
            Header: "Country",
            accessor: "country",
        }
    ];

    return (
        <>
            {EmployerData ? (
                <BasicTable
                    colHeader={header}
                    rowData={EmployerData}
                    updateHandler={editHandler}
                    deleteHandler={deleteHandler}
                    createHandler={openModal}
                    tableHeading="All Employers"
                    pageHeading='Employer'
                />
            ) : <BasicTable
                colHeader={header}
                rowData={EmployerDataBlank}
                updateHandler={editHandler}
                deleteHandler={deleteHandler}
                createHandler={openModal}
                tableHeading="All Employers"
                pageHeading='Employer'
            />}

            <EmployerModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD EMPLOYER" heading="Employer" nameError={nameError} emailError={emailError} phoneNumberError={phoneNumberError} countryError={countryError} />
        </>
    );
};
export default EmployerList;
