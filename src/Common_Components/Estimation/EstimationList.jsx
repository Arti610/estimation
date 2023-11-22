import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from "date-fns";
import { BasicTable } from '../../Components/Table list/BasicTable'
import { useEffect } from 'react'
import { deleteEstimationData, getEstimationData, getupdateEstimationData, updateEstimationData } from '../../APIs/EstimationSlice'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Config/Apis';
import { ToastContainer, toast } from 'react-toastify';
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal';
import { MenuItem } from '@mui/material';
const EstimationList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('Token');
  const EstimationDataBlank = ["Data Not Found"]

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const EstimationData = useSelector((state) => state.Estimation.EstimationData)


  const header = [
    {
      Header: "Serial No",
      accessor: (row, index) => index + 1,
      id: "serialNumber", // A unique ID for this column
    },
    {
      Header: "Estimation Date",
      accessor: "estimation_date",
      Cell: ({ value }) => {
        if (value && !isNaN(new Date(value))) {
          return format(new Date(value), "dd/MM/yyyy");
        }
        // Handle cases where the date is missing or invalid
      },
    },

    {
      Header: "Client Ref Number",
      accessor: "inquiry_no.client_reference_no",
    },
    {
      Header: "Customer",
      accessor: "inquiry_no.customer.name",
    },

    {
      Header: "Department",
      accessor: "inquiry_no.department.name",
    },

    {
      Header: "Salesman",
      accessor: "inquiry_no.salesman.first_name",
    },
    {
      Header: "Net Amount",
      accessor: "net_total",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
      
                <Link to={`/dashboard/sales/print-estimation/${row.original.id}`} target="_blank">Print</Link>
             
        )
          
          } 
        }
  ];

  const createHandler = () => {
    navigate("/dashboard/sales/Estimation-registration")
  }
  const editHandler = (id) => {
    navigate(`/dashboard/sales/Estimation-registration/${id}`)
  }

  const deleteHandler = (id) => {
    setDeleteId(id)
    setDeleteModalOpen(true)
  };

  const deleteDataHandler = () => {
    if (deleteId) {
      try {
        const response = api.delete(`/delete_estimation/${deleteId}`,
          {
            headers: { Authorization: `token ${token}` }
          })
        if (response.status === "OK" || response.statusText === "200") {
          setDeleteModalOpen(false)
          toast.success("Deleted successfully")
          dispatch(getEstimationData(token))
        }
      } catch (error) {
        throw error
      }

    }
  }
  useEffect(() => {
    dispatch(getEstimationData(token))
  }, [])
  console.log("EstimationData", EstimationData);
  return (
    <>
      {EstimationData ? (
        <BasicTable
          colHeader={header}
          rowData={EstimationData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="All Estimations"
          pageHeading='Estimation'
          showEditIcon={false}
        />
      ) : (<BasicTable
        colHeader={header}
        rowData={EstimationDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={createHandler}
        tableHeading="All Estimations"
        pageHeading='Estimation'
      />)}

      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Estimation" deleteData={deleteDataHandler} />
      <ToastContainer />
    </>
  )
}

export default EstimationList
