import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {format} from 'date-fns'
import { BasicTable } from '../../Components/Table list/BasicTable'
import { useEffect } from 'react'
import { deleteInquiryData, getInquiryData, getupdateInquiryData, updateInquiryData } from '../../APIs/InquirySlice'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const InquiryList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;
  const InquiryDataBlank = ["Data Not Found"]
  const InquiryData = useSelector((state) => state.Inquiry.InquiryData)
  const header = [

    {
      Header: "Client Reference No",
      accessor: "client_reference_no",
    },
    {
      Header: "Inquiry Data",
      accessor: "inquirydate",
      Cell: ({ value }) => {
        if (value && !isNaN(new Date(value))) {
          return format(new Date(value), "dd/MM/yyyy");
        }
        return "Invalid Date"; // Handle cases where the date is missing or invalid
      },
    },
    {
      Header: "Submission Data",
      accessor: "submission_date",
      Cell: ({ value }) => {
        if (value && !isNaN(new Date(value))) {
          return format(new Date(value), "dd/MM/yyyy");
        }
        return "Invalid Date"; // Handle cases where the date is missing or invalid
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
    navigate("/sales/inquiry-registration")
  }
  const editHandler = (id) => {
    dispatch(getupdateInquiryData({ id, token }))
    navigate("/sales/inquiry-registration")
  }
  const deleteHandler = (id) => {
    dispatch(deleteInquiryData({ id, token }))
  }

  useEffect(() => {
    dispatch(getInquiryData(token))
  }, [])
  return (
    <>
      { InquiryData ?
        <BasicTable
          colHeader={header}
          rowData={InquiryData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          tableHeading="Inquiry"
        />
        :    <BasicTable
        colHeader={header}
        rowData={InquiryDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={createHandler}
        tableHeading="Inquiry"
      />}
    </>
  )
}

export default InquiryList