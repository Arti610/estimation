import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import './ProductTable.css'
import { GlobalFilter } from "./GlobalFilter"
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import AOS from "aos";
import "aos/dist/aos.css";
import { PiExportBold } from 'react-icons/pi'
import { MdOutlineAdd } from 'react-icons/md'
import { useDispatch } from "react-redux";
import { getupdateCatelogueData } from "../../APIs/CatelogueSlice";
import { useNavigate } from "react-router-dom";
import { ImgUrl } from "../../Config/Config";


export const ProductTable = ({
    colHeader,
    rowData,
    pageHeading,
    createHandler,
    createBtn,

}) => {
    const tableRef = useRef(null);
    const [gg, setGg] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('Token');
    const columns = useMemo(() => colHeader, []);


    const {
        getTableProps,
        getTableBodyProps,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        setGlobalFilter,

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
    const handleClick = (id) => {
        dispatch(getupdateCatelogueData({ token, id }))
        navigate("/dashboard/sales/catelogue-details")
    }
  
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
            <div className="all_table_list" data-aos="fade-left" data-aos-duration="1000">
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
                    <div ref={tableRef}>
                        <div {...getTableProps()}>
                            <div {...getTableBodyProps()} className="top-product-container">
                                {page.map((row) => {
                                    prepareRow(row);

                                    const cellId = row.original.id;
                                    return (
                                        <div {...row.getRowProps()} className="product-container-main">

                                            <div className="product-container">
                                                <img src={`${ImgUrl}${row.original.primary_image}`} alt="Product Image" height='100px' />
                                                <div className="product-details-container">
                                                    <strong>{row.original.name}</strong>
                                                    <div className="currency-container">
                                                        <span>{row.original.currency}</span>&nbsp;<span>{row.original.list_price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <span className="product-container-span"><strong>Type: </strong>{row.original.type}</span> */}
                                            <span className="product-container-span">Brand :  <span style={{ color: "#" }}>{row.original.brand}</span></span>
                                            <span className="product-container-span">Model :  <span style={{ color: "#" }}>{row.original.model}</span></span>
                                            <span className="product-container-span" style={{display:"flex", justifyContent:"space-between", alignContent:"center"}}><span style={{ color: "#" }}>Origin :  {row.original.origin}</span><span className="view-container" onClick={() => handleClick(cellId)}>
                                                <button style={{ background: "white", color: "#0072d3", display:"inline-block" }} onClick={() => handleClick(cellId)}>View</button>
                                            </span></span>

                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};
