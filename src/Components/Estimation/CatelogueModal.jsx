import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import '../Table list/ProductTable.css'
import { useDownloadExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import AOS from "aos";
import "aos/dist/aos.css";
import { PiExportBold } from 'react-icons/pi'
import { useDispatch } from "react-redux";
import { getupdateCatelogueData } from "../../APIs/CatelogueSlice";
import { useNavigate } from "react-router-dom";
import { ImgUrl } from "../../Config/Config";
import { Box, Modal } from "@mui/material";
import { GlobalFilter } from "../Table list/GlobalFilter";
import { RxCross2 } from "react-icons/rx";

export const CatelogueModal = (props) => {
    const tableRef = useRef(null);
    const [gg, setGg] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies, setCookies] = useState(['token'])
    const token = cookies.token;
    const columns = useMemo(() => props.colHeader, []);


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
            data: props.rowData,
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
    const style = {
        position: "absolute",
        top: "30%",
        left: "50%",
        width: "80%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "10px",
        height: "fit-content",
        overflow: "auto",
        "@media (max-width: 576px)": {
            width: "90%",
        },
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
            <Modal open={props.openCateModal}>
                <Box style={style}>
                    <div className="modal-top-container">
                        <h4>{props.pageHeading}</h4>
                        <RxCross2 onClick={props.catelogueModalClose} className="modal-btn-cross" />

                    </div>
                    <div className="registration_top_header">
                        <p>
                           
                            <div className="Features-section">
                                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className="Global-filter" />
                                <button onClick={generatePdf} className="secondary-btn"><PiExportBold />Export</button>
                            </div>
                        </p>
                    </div>
                    <div className="table">
                        <div ref={tableRef}>
                            <div {...getTableProps()}>
                                <div {...getTableBodyProps()} className="top-product-container">
                                    {page.map((row) => {
                                        prepareRow(row, props.index);

                                        const cellId = row.original.id;
                                        return (
                                            <div {...row.getRowProps()} className="product-container-main" onClick={(e) => props.handleClick(e, cellId, props.index)}>

                                                <div className="product-container">
                                                    <img src={`${ImgUrl}${row.original.primary_image}`} alt="Product Image" height='100px' />
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


                </Box>
            </Modal>

        </>
    );
};
