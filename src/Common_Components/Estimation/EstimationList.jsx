import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from "date-fns";
import { BasicTable } from '../../Components/Table list/BasicTable'
import { useEffect } from 'react'
import { deleteEstimationData, getEstimationData, getupdateEstimationData, updateEstimationData } from '../../APIs/EstimationSlice'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const EstimationList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('Token');
  const EstimationDataBlank = ["Data Not Found"]
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
      Header: "Employer",
      accessor: "inquiry_no.employer.name",
    },
    {
      Header: "Source Of Inquiry",
      accessor: "inquiry_no.source_of_inquiry.name",
    },
    {
      Header: "Department",
      accessor: "inquiry_no.department.name",
    },
    {
      Header: "Estimator",
      accessor: "inquiry_no.estimator.first_name",
    },
    {
      Header: "Salesman",
      accessor: "inquiry_no.salesman.first_name",
    },
    {
      Header: "Scope Of Work",
      accessor: "inquiry_no.scope_of_work",
    },

  ];

  const createHandler = () => {
    navigate("/dashboard/sales/Estimation-registration")
  }
  const editHandler = (id) => {
    dispatch(getupdateEstimationData({ id, token }))
    navigate("/dashboard/sales/Estimation-registration")
  }

  const deleteHandler = (id) => {
    console.log("id delete", id);
    dispatch(deleteEstimationData({token, id}))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getEstimationData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };
  useEffect(() => {
    dispatch(getEstimationData(token))
  }, [])
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
    </>
  )
}

export default EstimationList

// import React from 'react'

// const EstimationList = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [cookies, setCookies] = useCookies(["token"])
//   const token = cookies.token;

// const EstimationData = useSelector((state)=>state.Estimation.EstimationData)
// const header = [

//   {
//     Header: "Estimation Data",
//     accessor: "estimation_date",
//     Cell: ({ value }) => {
//       return format(new Date(value), "dd/MM/yyyy");
//     },
//   },

//   {
//     Header: "Customer",
//     accessor: "customer.name",
//   },
//   {
//     Header: "Employer",
//     accessor: "employer.name",
//   },
//   {
//     Header: "Source Of Estimation",
//     accessor: "source_of_Estimation.name",
//   },
//   {
//     Header: "Department",
//     accessor: "department.name",
//   },
//   {
//     Header: "Estimator",
//     accessor: "estimator.first_name",
//   },
//   {
//     Header: "Salesman",
//     accessor: "salesman.first_name",
//   },
//   {
//     Header: "Scope Of Work",
//     accessor: "scope_of_work",
//   },

// ];

// const createHandler = ()=>{
//   navigate("/sales/Estimation-registration")
// }
// const editHandler = (id) =>{
//   dispatch(getupdateEstimationData({id, token}))
//   navigate("/sales/Estimation-registration")
// }
// const deleteHandler = (id) =>{
//   dispatch(deleteEstimationData({id, token}))
// }

// useEffect(()=>{
//   dispatch(getEstimationData(token))
// },[])
//   return (
//    <>
//    {EstimationData ? (
//         <BasicTable
//           colHeader={header}
//           rowData={EstimationData}
//           updateHandler={editHandler}
//           deleteHandler={deleteHandler}
//           createHandler={createHandler}
//           tableHeading="Estimation"
// tableHeading="All Estimations"
// pageHeading='Estimation'
//         />
//       ) : ("loading")}
//    </>
//   )
// }

// export default EstimationList