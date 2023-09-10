// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { format } from "date-fns";
// import {BasicTable} from '../../Components/Table list/BasicTable'
// import { useEffect } from 'react'
// import { deleteEstimationData, getEstimationData, getupdateEstimationData, updateEstimationData } from '../../APIs/EstimationSlice'
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
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

import React from 'react'

const EstimationList = () => {
  return (
    <div>EstimationList</div>
  )
}

export default EstimationList