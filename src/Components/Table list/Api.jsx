// import axios from "axios";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useTable, useGlobalFilter, usePagination } from "react-table";
// import "./table.css";
// import { Checkbox } from "./Checkbox";
// import { GlobalFilter } from "./GlobalFilter";
// import { useDownloadExcel } from "react-export-table-to-excel";
// import { useReactToPrint } from "react-to-print";
// // import { CSVLink } from "react-csv";

// const Api = () => {
//   const [apidata, setApidata] = useState([]);
//   const [head, setHead] = useState({});
//   const myRef = useRef();
//   const getData = async () => {
//     const res = await api.get("https://jsonplaceholder.typicode.com/todos");
//     const coll = res.data;
//     myRef.current = res.data;
//     console.data(myRef, "MyRef");
//     setApidata(coll);

//     console.log(apidata);

//     const COLUMNS = [
//       {
//         Header: "USER ID",

//         accessor: "userId",
//       },
//       {
//         Header: "ID",

//         accessor: "id",
//       },
//       {
//         Header: "TITLE",

//         accessor: "title",
//       },
//       {
//         Header: "COMPLEATED",

//         accessor: "completed",
//       },
//     ];
//     setHead(COLUMNS);
//   };

//   useEffect(() => {
//     const getdata = async () => {
//       const res = await api.get("https://jsonplaceholder.typicode.com/todos");
//       myref.current = res.data;
//       setApiData(myref);
//       console.log(myref.current, "myref.current");
//       console.log(apiData, "col");
//     };
//     getdata();
//   }, []);

//   console.log(head, "head");

//   const columns = useMemo(() => head, [head]); // Use head as a dependency for useMemo
//   const data = useMemo(() => apidata, [apidata]);

//   const tableRef = useRef(null);
//   const [densityState, setDensityState] = useState("");
//   const handleState = (e) => {
//     console.log(e.target.value);

//     switch (e.target.value) {
//       case "density1":
//         setDensityState("density1");
//         break;
//       case "density2":
//         setDensityState("density2");
//         break;
//       case "density3":
//         setDensityState("density3");
//         break;

//       default:
//         setDensityState("");
//         break;
//     }
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     page,
//     nextPage,
//     previousPage,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,

//     state,
//     setGlobalFilter,
//     allColumns,
//     getToggleHideAllColumnsProps,
//   } = useTable(
//     {
//       data,
//       columns,
//     },
//     useGlobalFilter,
//     usePagination
//   );
//   const { pageIndex } = state;
//   const { globalFilter } = state;
//   const { onDownload } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: "Users table",
//     sheet: "Users",
//   });
//   // const compPdf=useRef();
//   const generatePdf = useReactToPrint({
//     content: () => tableRef.current,
//     documentTitle: "dem",
//     onAfterPrint: () => alert("data saved"),
//   });

//   return (
//     <div className="Table">
//       <div className="Main-div">
//         <div className="Features-section">
//           <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//           <details>
//             <summary>Filter Columns</summary>
//             <div className="Header-column">
//               <div>
//                 <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
//               </div>
//               {allColumns.map((column) => (
//                 <div key={column.id} className="Toggle-list">
//                   <label>
//                     <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
//                     {column.Header}
//                   </label>
//                 </div>
//               ))}
//               <br />
//             </div>
//           </details>
//           <select name="density" id="density" onChange={handleState}>
//             <option value="">Select Density</option>
//             <option value="density1">Density level 1</option>
//             <option value="density2">Density level 2</option>
//             <option value="density3"> Density level 3</option>
//           </select>
//         </div>

//         <table {...getTableProps()} ref={tableRef}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return (
//                       <td className={densityState} {...cell.getCellProps()}>
//                         {cell.render("Cell")}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="Navigation">
//           <div className="NavigationButton">
//             <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//               Previous
//             </button>
//             <span>
//               page{" "}
//               <strong>
//                 {" "}
//                 {pageIndex + 1} of {pageOptions.length}
//               </strong>
//             </span>
//             <button onClick={() => nextPage()} disabled={!canNextPage}>
//               Next
//             </button>
//             <button onClick={() => onDownload()}>Export as Excel</button>
//             <button onClick={() => generatePdf()}>Export as PDF</button>
//             {/* <button className="Csv">
//               <CSVLink data={col.slice(0, 10)}>Export as CSV</CSVLink>;
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Api;
