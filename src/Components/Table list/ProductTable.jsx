import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import './ProductTable.css'
import { Checkbox } from "./Checkbox";
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { GlobalFilter } from "./GlobalFilter"
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { FaEdit } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { PiExportBold } from 'react-icons/pi'
import { MdOutlineAdd } from 'react-icons/md'
// import { PropaneSharp } from "@mui/icons-material";

export const ProductTable = ({
    colHeader,
    rowData,
    deleteHandler,
    updateHandler,
    pageHeading,
    tableHeading,
    createHandler,
    createBtn
}) => {
    const tableRef = useRef(null);
    const [densityState, setDensityState] = useState("hoverEffect");
    const [gg, setGg] = useState(true);




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

                            <button onClick={generatePdf} className="secondary-btn"><PiExportBold />Export</button>
                            <button onClick={createHandler} >
                                <MdOutlineAdd /> {createBtn} Add {pageHeading}
                            </button>


                        </div>
                    </p>

                </div>

                <div className="table">

                  

                        <div className="table-list" ref={tableRef}>
                            <div {...getTableProps()}>
                                {/* <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    
                    </tr>
                  ))}
                </thead> */}
                                <div {...getTableBodyProps()} className="all-procuct-container">
                                    {page.map((row, i) => {
                                        prepareRow(row);

                                        return (
                                            <div {...row.getRowProps()}  className="product-container">
                                                {row.cells.map((cell, i) => {
                                                    return (                               
                                                     <>
                                                        <div id="td_column" {...cell.getCellProps()}>                                  
                                                            {cell.render("Cell")}
                                                        </div>
                                                     </>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
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
            
        </>
    );
};
