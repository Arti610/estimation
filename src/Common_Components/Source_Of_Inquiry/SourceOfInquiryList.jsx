import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getSourceOfInquiryData, deleteSourceOfInquiryData, createSourceOfInquiryData, updateSourceOfInquiryData } from '../../APIs/SourceOfInquirySlice';
import SourceOfInquiryModal from '../../Components/Modal/SourceOfInquiryModal';
import { ToastContainer, toast } from 'react-toastify';


const SourceOfInquiryList = () => {

  const dispatch = useDispatch();
  const SourceOfInquiryDataBlank = ["Data Not Found"]

  const SourceOfInquiryData = useSelector((state) => state.SourceOfInquiry.SourceOfInquiryData);
  const status = useSelector((state) => state.SourceOfInquiry.status);
  console.log(status);

  const token = localStorage.getItem('Token');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    description: "",
  });

  const openModal = () => {
    setModalData({
      name: "",
      description: "",
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
  };

  const handleAutoComplete = (newValue, fieldName) => {
    const selectedValue = newValue ? newValue.id : null;
    setModalData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedValue,
    }));
  };

  const createOrUpdateHandler = () => {
    if (modalData.id) {
      dispatch(
        updateSourceOfInquiryData(
          {
            id: modalData.id,
            updatedData: {
              name: modalData.name,
              description: modalData.description,
            },
            token
          }
        )
      );
      if(status.update === "succeeded"){
        toast.success("Source of Inquiry update successfully !")
      }
    } else {
      dispatch(createSourceOfInquiryData({ modalData, token }));
      if(status.create === "succeeded"){
        toast.success("Source of Inquiry create successfully !")
      }
    }
    closeModal();
    dispatch(getSourceOfInquiryData(token));
  };

  const editHandler = (id) => {
    const editData = SourceOfInquiryData.find((data) => data.id === id);
    if (editData) {
      setModalData(editData);
      setModalOpen(true);
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteSourceOfInquiryData({id, token}))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getSourceOfInquiryData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };
  
  useEffect(() => {
    dispatch(getSourceOfInquiryData(token));
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
      Header: "Description",
      accessor: "description",
    }

  ];

  return (
    <>
    
      {SourceOfInquiryData ? (
        <BasicTable
          colHeader={header}
          rowData={SourceOfInquiryData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Source Of Inquiries"
          pageHeading='Source Of Inquiry'
        />
      ) : <BasicTable
        colHeader={header}
        rowData={SourceOfInquiryDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={openModal}
        tableHeading="All Source Of Inquiries"
        pageHeading='Source Of Inquiry'
      />}

      <SourceOfInquiryModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} handleAutoComplete={handleAutoComplete} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD SOURCE OF INQUIRY" heading="Source Of Inquiry" />
      <ToastContainer/>
    </>
  );
};
export default SourceOfInquiryList;
