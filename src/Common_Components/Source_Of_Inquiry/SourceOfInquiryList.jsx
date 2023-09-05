import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getSourceOfInquiryData, deleteSourceOfInquiryData, createSourceOfInquiryData, updateSourceOfInquiryData } from '../../APIs/SourceOfInquirySlice';
import SourceOfInquiryModal from '../../Components/Modal/SourceOfInquiryModal';


const SourceOfInquiryList = () => {
  const dispatch = useDispatch();
  const SourceOfInquiryDataBlank = ["Data Not Found"]
  const SourceOfInquiryData = useSelector((state) => state.SourceOfInquiry.SourceOfInquiryData);
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
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
    } else {


      dispatch(createSourceOfInquiryData({ modalData, token }));
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
    dispatch(deleteSourceOfInquiryData(id));

  };

  useEffect(() => {

    dispatch(getSourceOfInquiryData(token));

  }, [dispatch, token, modalOpen]);

  const header = [
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
          tableHeading="Source Of Inquiry"
        />
      ) : <BasicTable
        colHeader={header}
        rowData={SourceOfInquiryDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={openModal}
        tableHeading="Source Of Inquiry"
      />}

      <SourceOfInquiryModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} handleAutoComplete={handleAutoComplete} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD SOURCE OF INQUIRY" heading="Source Of Inquiry" />
    </>
  );
};
export default SourceOfInquiryList;
