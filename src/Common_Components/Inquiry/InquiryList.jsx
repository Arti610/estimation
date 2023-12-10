import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { BasicTable } from '../../Components/Table list/BasicTable'
import { useEffect } from 'react'
import { deleteInquiryData, getInquiryData, getupdateInquiryData, updateInquiryData } from '../../APIs/InquirySlice'
import { Badge, MenuItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../Config/Apis'
import { ToastContainer, toast } from 'react-toastify'
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal'
import { MdLocalPrintshop } from 'react-icons/md'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from '../../Components/DropdownMenu'


const InquiryList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const token = localStorage.getItem('Token');
  const userDetailsString = localStorage.getItem('UserData')
  const userDetails = JSON.parse(userDetailsString)


  const InquiryDataBlank = ["Data Not Found"]
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)

  const header = [

    {
      Header: "Inquiry No",
      accessor: "id",
    },
    {
      Header: "Client Reference No",
      accessor: "client_reference_no",
    },
    {
      Header: "Inquiry Date",
      accessor: "inquirydate",
      Cell: ({ value }) => {
        if (value && !isNaN(new Date(value))) {
          return format(new Date(value), "dd/MM/yyyy");
        }
        // Handle cases where the date is missing or invalid
      },
    },
    {
      Header: "Submission Date",
      accessor: "submission_date",
      Cell: ({ value }) => {
        if (value && !isNaN(new Date(value))) {
          return format(new Date(value), "dd/MM/yyyy");
        }
        // Handle cases where the date is missing or invalid
      },
    },

    {
      Header: "Customer",
      accessor: "customer.name",
    },
    {
      Header: "Employer",
      accessor: "employer.name",
    },
    {
      Header: "Source Of Inquiry",
      accessor: "source_of_inquiry.name",
    },
    {
      Header: "Department",
      accessor: "department.name",
    },
    // {
    //   Header: "Estimator",
    //   accessor: "estimator.first_name",
    // },
    // {
    //   Header: "Salesman",
    //   accessor: "salesman.first_name",
    // },
    // {
    //   Header: "Print",
    //   accessor: "action",
    //   Cell: ({ row }) => {
    //     return (
    //       <Link to={`/dashboard/sales/print-invoice/${row.original.id}`} target="_blank"><MdLocalPrintshop style={{ color: "#9d8656", fontSize: "18px" }} /></Link>
    //     )
    //   }
    // }
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <DropdownMenu menus={userDetails && userDetails.user_type === "Admin" ?
            <>
              <MenuItem disableRipple><Link to={`/dashboard/sales/print-invoice/${row.original.id}`} target="_blank" style={{color:"black"}}><PrintIcon />Print</Link></MenuItem>
              <MenuItem onClick={() => editHandler(row.original.id)} disableRipple><EditIcon />Edit</MenuItem>
              <MenuItem onClick={() => deleteHandler(row.original.id)} ><DeleteIcon sx={{ fontSize: "40px" }} /><span>Delete</span></MenuItem>
            </>
            :
            <>
              <MenuItem disableRipple><PrintIcon /><Link to={`/dashboard/sales/print-invoice/${row.original.id}`} target="_blank">Print</Link></MenuItem>
              <MenuItem onClick={() => editHandler(row.original.id)} disableRipple><EditIcon />Edit</MenuItem>
            </>
          } />
        );
      },
    }
  ];

  const createHandler = () => {
    navigate("/dashboard/sales/inquiry-registration")
  }

  const editHandler = (inqId) => {
    dispatch(getupdateInquiryData({ id: inqId, token }))
    navigate(`/dashboard/sales/inquiry-registration/${inqId}`)
  }

  const deleteHandler = (id) => {
    setDeleteId(id)
    setDeleteModalOpen(true)
  };

  const deleteDataHandler = async () => {
    if (deleteId) {
      try {
        const response = await api.delete(`/delete_inquiry/${deleteId}`, { headers: { Authorization: `token ${token}` } })
        if (response.statusText === "OK" || response.status === "200") {
          setDeleteModalOpen(false)
          toast.success("Deleted Successfully")
          dispatch(getInquiryData(token))
        }
      } catch {
        throw console.error();
      }
    }
  }

  useEffect(() => {
    dispatch(getInquiryData(token))
  }, [])

  return (
    <>
      {InquiryData ?
        <BasicTable
         actionFlag={true}
          colHeader={header}
          rowData={InquiryData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="All Inquiries"
          pageHeading='Inquiry'
        />
        : <BasicTable
         actionFlag={true}
          colHeader={header}
          rowData={InquiryDataBlank}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="All Inquiries"
          pageHeading='Inquiry'
        />}

      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Inquiry" deleteData={deleteDataHandler} />
      <ToastContainer />
    </>
  )
}

export default InquiryList