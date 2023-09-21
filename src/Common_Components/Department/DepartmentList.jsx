import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getDepartmentData, deleteDepartmentData, createDepartmentData, updateDepartmentData } from '../../APIs/DepartmentSlice';
import DepartmentModal from '../../Components/Modal/DepartmentModal';


const DepartmentList = () => {
  const dispatch = useDispatch();
  const DepartmentDataBlank = ["Data Not Found"]
  const DepartmentData = useSelector((state) => state.Department.DepartmentData);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('Token');
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
        updateDepartmentData(
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


      dispatch(createDepartmentData({ modalData, token }));
    }
    closeModal();
    dispatch(getDepartmentData(token));
  };



  const editHandler = (id) => {
    const editData = DepartmentData.find((data) => data.id === id);
    if (editData) {
      setModalData(editData);
      setModalOpen(true);
    }
  };


  const deleteHandler = (id) => {
    dispatch(deleteDepartmentData({id, token}))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getDepartmentData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };

  useEffect(() => {

    dispatch(getDepartmentData(token));

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
      {DepartmentData ? (
        <BasicTable
          colHeader={header}
          rowData={DepartmentData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Departments"
          pageHeading='Department'
          />
          ) : <BasicTable
          colHeader={header}
          rowData={DepartmentDataBlank}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Departments"
          pageHeading='Department'
      />}

      <DepartmentModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} handleAutoComplete={handleAutoComplete} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD DEPARTMENT" heading="Department" />
    </>
  );
};
export default DepartmentList;
