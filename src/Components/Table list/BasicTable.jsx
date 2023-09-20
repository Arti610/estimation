import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import "./table.css";
import { Checkbox } from "./Checkbox";
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { GlobalFilter } from "./GlobalFilter"
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { FaEdit } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { MdVisibility } from 'react-icons/md'
import { MdDelete } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { PiExportBold } from 'react-icons/pi'
import { MdOutlineAdd } from 'react-icons/md'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { PropaneSharp } from "@mui/icons-material";

export const BasicTable = ({
  colHeader,
  rowData,
  deleteHandler,
  updateHandler,
  pageHeading,
  tableHeading,
  createHandler,
  createBtn,
  showEditIcon = true,
}) => {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [densityState, setDensityState] = useState("hoverEffect");
  const [gg, setGg] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleState = (e) => {


    switch (e.target.value) {
      case "density1":
        setDensityState("density1");
        break;
      case "density2":
        setDensityState("density2");
        break;
      case "density3":
        setDensityState("density3");
        break;

      default:
        setDensityState("");
        break;
    }
  };

  const columns = useMemo(() => colHeader, []);
  // const data = useMemo(() => {rowData}, []);
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      data: rowData,
      columns,
    },
    useGlobalFilter,
    usePagination
  );
  const { pageIndex } = state;
  const { globalFilter } = state;
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });
  const download = () => {
    setGg(false);
    setTimeout(() => {
      onDownload();
    }, 500);
    setTimeout(() => {
      setGg(true);
    }, 700);
  };
  // const compPdf=useRef();
  const generatePDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "dem",
  });
  const generatePdf = () => {
    setGg(false);
    setTimeout(() => {
      generatePDF();
    }, 500);
    setTimeout(() => {
      setGg(true);
    }, 700);
  };
  const detailsRef = useRef(null);

  useEffect(() => {
    AOS.init();
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the details element
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        // Close the details element if it's open
        if (detailsRef.current.hasAttribute("open")) {
          detailsRef.current.removeAttribute("open");
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        className="all_table_list"
        data-aos="fade-left"
        data-aos-duration="1000"

      >
        <div className="registration_top_header">
          <p>
            <h2>{pageHeading}</h2>
            <div className="Features-section">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className="Global-filter" />
              <details ref={detailsRef} style={{ cursor: "pointer" }}>
                <summary>Filter</summary>
                <div className="Header-column">
                  <div className="toggle-list-all">
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                  </div>
                  {allColumns.map((column) => (
                    <div key={column.id} className="Toggle-list">
                      <label>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                        />{" "}
                        {column.Header}
                      </label>
                    </div>
                  ))}
                  <br />
                </div>
              </details>
              <button onClick={generatePdf} className="secondary-btn"><PiExportBold />Export</button>
              <button onClick={createHandler} >
                <MdOutlineAdd /> {createBtn} Add {pageHeading}
              </button>
            </div>
          </p>

        </div>

        <div className="table">

          <div className="Main-div">
            <div className="table-heading">
              <h4>{tableHeading}</h4>
              <div className="export-btn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <BiDotsVerticalRounded />
                {isHovered && (
                  <div className="table-btn-left">

                    <span onClick={download}>Export as Excel</span>
                    <CSVLink data={rowData.slice(0, 10)}>
                      <span className="Csv">Export as CSV</span>
                    </CSVLink>
                  </div>
                )}
              </div>
            </div>
            <div className="table-list" ref={tableRef}>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                      {gg && <th>Action</th>}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell, i) => {
                          {
                            /* console.log(cell.row.values.id , "cell") */
                          }
                          return (
                            <td
                              className={densityState}
                              id="td_column"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}

                        {gg && (
                          <td className={densityState} style={{ width: "15px", paddingInline: "15px" }}>
                            <div id="btn_action">
                              {showEditIcon ? (
                                <FaEdit
                                  color="#7c5e1e"
                                  fontSize="17px"
                                  paddingInline="5px 15px"
                                  cursor="pointer"
                                  margin="5px"
                                  title="Edit Details"
                                  onClick={() => {
                                    updateHandler(row.original.id);
                                  }}
                                />
                              ) : 
                              // <MdVisibility
                              //   color="#004987"
                              //   fontSize="17px"
                              //   paddingInline="5px 15px"
                              //   cursor="pointer"
                              //   margin="5px"
                              //   title="View"
                              //   onClick={() => navigate("/dashboard/sales/estimation-registration-detail")}
                              // />
                              null
                              }
                              {/* <button onClick={()=>updateHandler(row.original.id)}>Edit</button> */}

                              <MdDelete
                                // color="#7c5e1e"
                                color="#c02e42"
                                // opacity="0.65"
                                fontSize="18px"
                                paddingInline="5px 10px"
                                cursor="pointer"
                                margin="5px"
                                title="Delete "
                                onClick={() => {
                                  console.log(`${row.original.id} for Delete`);
                                  deleteHandler(row.original.id);
                                }}
                              />
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="Navigation">
              <div className="NavigationButton">
                <div>
                  <span>page<strong> {pageIndex + 1} of {pageOptions.length}</strong></span>
                </div>
                <div style={{ display: "flex", float: "right", gap: '10px' }}>
                  <button className="secondary-btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {/* <GrPrevious className="btn-hover-color" /> */}
                    Previous
                  </button>
                  <button className="secondary-btn" onClick={() => nextPage()} disabled={!canNextPage}>
                    {/* <GrNext className="btn-hover-color" /> */} Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
