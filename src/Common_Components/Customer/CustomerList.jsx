import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {
  BasicTable,
  // Import other necessary components
} from '../../Components/Table list/BasicTable';
import {
  getCustomerData,
  deleteCustomerData,
  createCustomerData,
  updateCustomerData,
} from '../../APIs/CustomerSlice';
import ModalComp from '../../Components/Modal/ModalComp';
import { ToastContainer, toast } from 'react-toastify';
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal';

const CustomerList = () => {

  const dispatch = useDispatch();
  const CustomerDataBlank = ["Data Not Found"];

  const CustomerData = useSelector((state) => state.Customer.CustomerData);
  const status = useSelector((state) => state.Customer.status);

  // State for controlling the modal
  const [modalOpen, setModalOpen] = useState(false);

  // State variables for form input and validation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryError, setCountryError] = useState('');
  const token = localStorage.getItem('Token');

  // Function to open the modal for adding or editing data
  const openModal = () => {
    // Set initial data for the modal form
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

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // State for holding form input data
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

  // Function to handle input changes and perform validation
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
          error = 'Name should only contain alphabetic and spaces';
        }
        setNameError(error);
        break;

      case "contact_person":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Person name should only contain alphabetic';
        }
        setLastNameError(error);
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

  // Function to handle creating or updating customer data
  const createOrUpdateHandler = () => {
    if (modalData.id) {
      // Dispatch an update action if 'id' exists in modalData
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
      if (status.update === "succeeded") {
        toast.success("Customer update successfully !")
      }
    } else {
      // Dispatch a create action if 'id' does not exist in modalData
      dispatch(createCustomerData({ modalData, token }));
      if (status.create === "succeeded") {
        toast.success("Customer create successfully !")
      }
    }
    // Close the modal and refresh customer data
    closeModal();
    dispatch(getCustomerData(token));
  };

  // Function to handle editing data
  const editHandler = (id) => {
    const editData = CustomerData.find((data) => data.id === id);
    if (editData) {
      setModalData(editData);
      setModalOpen(true);
    }
  };

  // Function to handle deleting data
  const deleteHandler = (id) => {
    dispatch(deleteCustomerData({ id, token }))
    setDeleteId(id)
    setDeleteModalOpen(true)
  };

  const deleteDataHandler = () =>{
    
  }
  // Use useEffect to fetch customer data on component mount or when the modal is open
  useEffect(() => {
    dispatch(getCustomerData(token));
  }, [dispatch, token, modalOpen]);

  // Define column headers for the table
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
      Header: "TRN Number",
      accessor: "trn_number",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Address",
      accessor: "address",
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
      Header: "Contact Person",
      accessor: "contact_person",
    },
  ];

  // Render the component
  return (
    <>
      {status.get === 'succeeded' && CustomerData ? (
        // Render your table and other UI elements here when data is loaded successfully
        <BasicTable
          colHeader={header}
          rowData={CustomerData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Customers"
          pageHeading="Customer"
        />
      ) : (
        // Render a message or placeholder when data is not available or while loading
        <BasicTable
          colHeader={header}
          rowData={CustomerDataBlank}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Customers"
          pageHeading="Customer"
        />
      )}
      {/* Render the modal for adding/editing data */}
      <ModalComp
        modalOpen={modalOpen}
        handleModalInputChange={handleModalInputChange}
        createOrUpdateHandler={createOrUpdateHandler}
        openModal={openModal}
        closeModal={closeModal}
        modalData={modalData}
        label="ADD Customer"
        heading="Customer"
        nameError={nameError}
        lastNameError={lastNameError}
        phoneNumberError={phoneNumberError}
        emailError={emailError}
        countryError={countryError}
      />
      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Estimation" deleteData={deleteDataHandler} />
      <ToastContainer />
    </>
  );
};

export default CustomerList;
