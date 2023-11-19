import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getDepartmentData, deleteDepartmentData, createDepartmentData, updateDepartmentData } from '../../APIs/DepartmentSlice';
import DepartmentModal from '../../Components/Modal/DepartmentModal';
import { ToastContainer, toast } from 'react-toastify';
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal';
import api from '../../Config/Apis';


const DepartmentList = () => {

  const dispatch = useDispatch();
  const DepartmentDataBlank = ["Data Not Found"]

  const DepartmentData = useSelector((state) => state.Department.DepartmentData);
  const status = useSelector((state) => state.Department.status);

  const token = localStorage.getItem('Token');

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
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
      if (status.update === "succeeded") {
        toast.success("Department update successfully !")
      }
    } else {
      dispatch(createDepartmentData({ modalData, token }));
      if (status.create === "succeeded") {
        toast.success("Department create successfully !")
      }
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
    setDeleteId(id)
    setDeleteModalOpen(true)
  };

  const deleteDataHandler = async () => {
    if (deleteId) {
      // dispatch(deleteUser({ id: deleteId, token }));
      try {
          const response = await api.delete(`/delete_department/${deleteId}`, { headers: { Authorization: `token ${token}` } });
          if (response.status === "200" || response.statusText === "OK") {
              setDeleteModalOpen(false);
              toast.success("Deleted successfully");
              dispatch(getDepartmentData(token))
          }
          return response
      } catch (error) {
          throw error
      }
  }
  }

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
      <ToastContainer />
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
      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Department" deleteData={deleteDataHandler} />

    </>
  );
};
export default DepartmentList;
