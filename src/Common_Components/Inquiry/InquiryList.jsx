import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { BasicTable } from '../../Components/Table list/BasicTable'
import { useEffect } from 'react'
import { deleteInquiryData, getInquiryData, getupdateInquiryData, updateInquiryData } from '../../APIs/InquirySlice'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const InquiryList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const token = localStorage.getItem('Token');
  const InquiryDataBlank = ["Data Not Found"]
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const header = [

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
    {
      Header: "Estimator",
      accessor: "estimator.first_name",
    },
    {
      Header: "Salesman",
      accessor: "salesman.first_name",
    },
    {
      Header: "Scope Of Work",
      accessor: "scope_of_work",
    },

  ];

  const createHandler = () => {
    navigate("/dashboard/sales/inquiry-registration")
  }
  const editHandler = (id) => {
    dispatch(getupdateInquiryData({ id, token }))
    navigate("/dashboard/sales/inquiry-registration")
  }

  const deleteHandler = (id) => {
    dispatch(deleteInquiryData(id))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getInquiryData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };

  useEffect(() => {
    dispatch(getInquiryData(token))
  }, [])
  return (
    <>
      {InquiryData ?
        <BasicTable
          colHeader={header}
          rowData={InquiryData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="All Inquiries"
          pageHeading='Inquiry'
        />
        : <BasicTable
          colHeader={header}
          rowData={InquiryDataBlank}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="All Inquiries"
          pageHeading='Inquiry'
        />}
    </>
  )
}

export default InquiryList