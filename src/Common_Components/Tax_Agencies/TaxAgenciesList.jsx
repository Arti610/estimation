import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';

import TaxAgencyModal from '../../Components/Modal/TaxAgencyModal';
import { getTaxAgencyData, createTaxAgencyData, updateTaxAgencyData, deleteTaxAgencyData } from '../../APIs/TaxAgencySlice';



const TaxAgenciesList = () => {
  const dispatch = useDispatch();
  const TaxAgencyDataBlank = ["Data Not Found"]
  const TaxAgencyData = useSelector((state) => state.TaxAgency.TaxAgencyData);
  const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('Token');
  const [modalData, setModalData] = useState({
    name: "",
  });
  const openModal = () => {
    setModalData({
      name: "",
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

  const createOrUpdateHandler = () => {
    if (modalData.id) {
      dispatch(
        updateTaxAgencyData(
          {
            id: modalData.id,
            updatedData: {
              name: modalData.name,


            },
            token
          }
        )
      );
    } else {
      if (modalData.name === "") {
        return (
          <p>Name should not be empty !</p>
        )
      }
      if (modalData.rate === "") {
        return (
          <p>Rate should not be empty !</p>
        )
      }

      dispatch(createTaxAgencyData({ modalData, token }));
    }
    closeModal();
    dispatch(getTaxAgencyData(token));
  };


  const editHandler = (id) => {
    const editData = TaxAgencyData.find((data) => data.id === id);
    if (editData) {
      setModalData(editData);
      setModalOpen(true);
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteTaxAgencyData(id))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getTaxAgencyData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };
  useEffect(() => {

    dispatch(getTaxAgencyData(token));

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

  ];

  return (
    <>
      {TaxAgencyData ? (
        <BasicTable
          colHeader={header}
          rowData={TaxAgencyData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={openModal}
          tableHeading="All Tax Agencies"
          pageHeading='Tax Agency'
        />
      ) : (<BasicTable
        colHeader={header}
        rowData={TaxAgencyDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={openModal}
        tableHeading="All Tax Agencies"
        pageHeading='Tax Agency'
      />)}

      <TaxAgencyModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD TAX ACGENCY" heading="Tax Agency" />
    </>
  );
};
export default TaxAgenciesList;
