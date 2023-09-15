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
    const [cookies, setCookies] = useState(['token'])
    const token = cookies.token;
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
        console.log("clicked");
        dispatch(getupdateCatelogueData({ token, id }))
        navigate("/sales/catelogue-details")
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
                    <div  ref={tableRef}>
                        <div {...getTableProps()}>
                            <div {...getTableBodyProps()} className="top-product-container">
                                {page.map((row) => {
                                    prepareRow(row);

                                    const cellId = row.original.id;
                                    return (
                                        <div {...row.getRowProps()} className="product-container-main" onClick={() => handleClick(cellId)}>
                                       
                                            <div className="product-container">
                                            <img src={`${ImgUrl}${row.original.primary_image}`} alt="Product Image" height='100px'/>
                                            <div className="product-details-container">
                                            <h3>{row.original.name}</h3>
                                            <span>{row.original.category}</span>
                                            </div>
                                            </div>
                                            <div className="currency-container">
                                                <span>{row.original.currency}</span>
                                                <span>{row.original.list_price}</span>
                                                
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
