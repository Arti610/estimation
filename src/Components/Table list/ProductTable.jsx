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
import {  useNavigate } from "react-router-dom";
import { ImgUrl } from "../../Config/Config";
import { BsFillTagsFill } from 'react-icons/bs'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

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

    const handleClick = (cateId) => {
        dispatch(getupdateCatelogueData({ id: cateId, token }))
        navigate(`/dashboard/sales/catelogue-details/${cateId}`)
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

                                    
                                    return (
                                        <div {...row.getRowProps()} className="catelogue-card-container">
                                            <div className="catelogue-card" onClick={() => handleClick(row.original.id)}  
                                             data-content={`
                                             ${row.original.origin ? `Origin: ${row.original.origin}` : ''}
                                             ${row.original.finish ? `Finish: ${row.original.finish}` : ''}
                                             ${row.original.model ? `Model: ${row.original.model}` : ''}
                                             ${row.original.base_of_pricing ? `Base of Pricing: ${row.original.base_of_pricing}` : ''}
                                             --------------------------------------------------------
                                             ${(row.original.specification|| '').slice(0,300)}
                                         `}   >
                                                <div style={{ height: "60vh", width: "100vw" }}>
                                                    <img src={`${ImgUrl}${row.original.primary_image}`} alt="Product Image" style={{ width: "280px", height: "220px" }} />
                                                </div>
                                                <div className="catalogue-card-data-container">
                                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                        <h4 style={{ display: "inline-flex", color: "black", fontWeight: "bold" }}>{row.original.name}</h4>
                                                        <p style={{ display: "inline-flex", fontSize: "18px", fontWeight: "bold", color: "green" }}>{row.original.currency}&nbsp;{row.original.base_of_pricing}</p>
                                                        <p style={{ fontSize: "14px", display: "flex", flexDirection: "column", padding: "4px 0px 4px 10px", color: "#4c4c4c" }}>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.model}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.series}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.category}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.origin}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.size}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.sub_category}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.type}</span>
                                                            <span><BsFillTagsFill />&nbsp;&nbsp;{row.original.type_sub_category}</span>

                                                        </p>

                                                    </div>
                                                    {!row.original.is_active ? <p style={{ display: "flex", justifyContent: "flex-end", color: "green", fontSize: "12.5px", fontWeight: "bold" }}><AiFillCheckCircle style={{ fontSize: "15px" }} />&nbsp;Acive</p> : <p style={{ display: "flex", justifyContent: "flex-end", color: "#cc2138", fontSize: "12.5px", fontWeight: "bold" }}><AiFillCloseCircle style={{ fontSize: "15px" }} />&nbsp;Inacive</p>}
                                                </div>
                                            </div>

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
