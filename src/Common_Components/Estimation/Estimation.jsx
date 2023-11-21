import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Box, Grid, Modal, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import './Estimation.css'
import '../../Components/Table list/ProductTable.css'
import { createEstimationData, createEstimationResourceData, updateEstimationData } from '../../APIs/EstimationSlice'
import { getInquiryData, getupdateInquiryData } from '../../APIs/InquirySlice';
import './Estimation.css'
import { RxCross2 } from "react-icons/rx";
import { ImgUrl } from '../../Config/Config';
import api from '../../Config/Apis';
import { getTaxData } from '../../APIs/TaxSlice';
import { FaUserAlt } from 'react-icons/fa';
import { useTable, useGlobalFilter, usePagination } from "react-table";
import '../../Components/Table list/ProductTable.css'
import { useDownloadExcel } from "react-export-table-to-excel";
import CommonLoading from '../../Components/Loader/CommonLoading'
import { useReactToPrint } from "react-to-print";
import { PiExportBold } from 'react-icons/pi'
import { GlobalFilter } from '../../Components/Table list/GlobalFilter';
import { getCatelogueData } from '../../APIs/CatelogueSlice';
import { getupdateEmployerData } from '../../APIs/EmployerSlice';
import { toast } from 'react-toastify';


const Estimation = () => {
  const style = {
    position: "absolute",
    top: "30%",
    paddingBottom: "10px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "10px",
    height: "fit-content",
    overflow: "auto",
    "@media (max-width: 576px)": {
      width: "90%",
    },
  };

  const header = [
    {
      Header: "Image",
      accessor: "profile_image",
      disableFilters: true,
      Cell: props => (
        <img
          src={`${ImgUrl}${props.row.original.primary_image}`}
          width={80}
          height={80}
          alt={<FaUserAlt />}
        />)
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Sub-Category",
      accessor: "sub_category",
    },
    {
      Header: "Type-Sub-Category",
      accessor: "type_sub_category",
    },
    {
      Header: "Origin",
      accessor: "origin",
    },
    {
      Header: "Finish",
      accessor: "finish",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Series",
      accessor: "series",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Size",
      accessor: "size",
    },
    {
      Header: "Specification",
      accessor: "specification",
    },
    {
      Header: "List Price",
      accessor: "list_price",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Unit Of Measurement",
      accessor: "unit_of_measurement",
    },
    {
      Header: "Base of Pricing",
      accessor: "base_of_pricing",
    },
  ];
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('Token');
  const { estiId } = useParams()
  const fData = new FormData();

  const [isLoading, setIsLoading] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [myInqIndex, setMyInqIndex] = useState({ index: null })
  const [estiRateTrue, setEstiRateTrue] = useState({ estistate: true })
  const [erModal, setErModal] = useState({ erModalValue: false, i: null })
  const [cateModalOpen, setCateModalOpen] = useState({ modalValue: false, index: null })
  const Inquiry = useSelector((state) => state.Inquiry.InquiryData)
  const InquiryData = useSelector((state) => state.Inquiry.updateInquiryData)
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const quantities = InquiryData ? InquiryData.detail.map(item => item.quantity) : null;
  const details_id = InquiryData ? InquiryData.detail.map(item => item.id) : null;

  const taxData = useSelector((state) => state.Tax.TaxData)
  const [markupError, setMarkupError] = useState('');
  const [estimationDetails, setEstimationDetails] = useState({
    inquiry_no: null,
    estimation_date: null,
    inquirydetail: null,
    estimation_rate: [null],
    sales_price: [null],
    markup: [null],
    markup_value: [null],
    gross_price: [null],
    taxable: [null],
    vat_id: [null],
    vat_type: [null],
    vat_percentage: [null],
    vat_amount: [null],
    net_total: null
  })
  console.log("estimationDetails", estimationDetails)
  const [estiFormData, setEstiFormData] = useState({
    cate_id: [null],
    item_name: [null],
    unit: [null],
    quantity: [null],
    list_price: [null],
    discount: [null],
    vatType: [null],
    vatPercent: [null],
    estimation_rate: [null],
    estimation_rate_total: null,

  })

  const openERModal = () => {
    setErModal({ erModalValue: true, i: null })
  }

  const closeERModal = () => {
    setErModal({ erModalValue: false, i: null })
    setEstiFormData({
      cate_id: [null],
      item_name: [null],
      unit: [null],
      quantity: [null],
      list_price: [null],
      discount: [null],
      vatType: [null],
      vatPercent: [null],
      estimation_rate: [null],
      estimation_rate_total: null
    })
    setEstiRateTrue({ estistate: true })
  }

  const handleModalOpen = (itemId, index) => {
    setMyInqIndex({ index: index })
    setEstiRateTrue({ estistate: false })
    openERModal()
  }

  const handleAddMore = () => {
    const hasNullFields = estiFormData.item_name.some((itemName, myI) => {
      // Check if any of the fields in the current row is null
      return (
        itemName === null ||
        estiFormData.unit[myI] === null ||
        estiFormData.quantity[myI] === null ||
        estiFormData.list_price[myI] === null ||
        estiFormData.discount[myI] === null ||
        estiFormData.vatType[myI] === null ||
        estiFormData.vatPercent[myI] === null
      );
    });

    if (!hasNullFields) {
      setEstiFormData((prevData) => ({
        ...prevData,
        item_name: [...prevData.item_name, null],
        unit: [...prevData.unit, null],
        quantity: [...prevData.quantity, null],
        list_price: [...prevData.list_price, null],
        discount: [...prevData.discount, null],
        vatType: [...prevData.vatType, null],
        vatPercent: [...prevData.vatPercent, null],
        // estimation_rate: [...prevData.estimation_rate, null],
      }));
    } else {
      // alert("Please fill in all required fields in the current row before adding a new row.");
    }
  };

  const handleAutoComplete = (newValue, fieldName) => {

    const selectedValue = newValue ? newValue.id : null;
    dispatch(getupdateInquiryData({ token, id: newValue.id }))

    setEstimationDetails((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedValue,
    }));
  };

  const handleChange = (e) => {

    const { name, value } = e.target
    setEstimationDetails((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const catelogueModalClose = () => {
    setCateModalOpen({ modalValue: false })
  }
  const catelogModal = (e) => {
    const index = e.target.name.split("-")[1]
    setCateModalOpen({ modalValue: true, index: index })
  }

  const handleClick = async (e, myIOuter, id) => {
    try {
      const response = await api.get(`/catalogue/${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const { data } = response;
      if (data && data.catelouge && data.catelouge) {
        const { id, name, unit_of_measurement, list_price, discount, tax } = data.catelouge;

        setEstiFormData((prev) => {
          const UpdatedId = [...prev.cate_id];
          UpdatedId[myIOuter] = id;
          const UpdatedName = [...prev.item_name];
          UpdatedName[myIOuter] = name;
          const UpdatedUnit = [...prev.unit];
          UpdatedUnit[myIOuter] = unit_of_measurement;
          const Updatedrate = [...prev.list_price];
          Updatedrate[myIOuter] = list_price;
          const UpdatedDiscount = [...prev.discount];
          UpdatedDiscount[myIOuter] = discount;
          const UpdatedVatType = [...prev.vatType];
          UpdatedVatType[myIOuter] = tax.name;
          const UpdatedVatRate = [...prev.vatPercent];
          UpdatedVatRate[myIOuter] = tax.rate;
          return {
            ...prev,
            cate_id: UpdatedId,
            item_name: UpdatedName,
            unit: UpdatedUnit,
            list_price: Updatedrate,
            discount: UpdatedDiscount,
            vatType: UpdatedVatType,
            vatPercent: UpdatedVatRate,
          };
        });
      } else {
        // Handle the case where the API response is missing the expected data
        console.error('API response is missing name data');
      }

      // Close the modal
      setCateModalOpen({ modalValue: false, index: null });
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching data from the API:', error);
    }
  };

  const calculateEstimatedRate = (index) => {
    const quantity = parseFloat(estiFormData.quantity[index]) || 0;
    const listPrice = parseFloat(estiFormData.list_price[index]) || 0;
    const discount = parseFloat(estiFormData.discount[index]) || 0;
    const vatPercent = parseFloat(estiFormData.vatPercent[index]) || 0;

    const estimatedRate =
      quantity * listPrice - discount + ((quantity * listPrice - discount) / 100) * vatPercent;

    return estimatedRate;
  };

  const handleChangePrice = (name, value, myI) => {
    setEstiFormData((prevData) => {
      const updatedQuantity = [...prevData.quantity];
      const updatedEstiRate = [...prevData.estimation_rate];

      if (name === 'quantity') {
        updatedQuantity[myI] = value;
      }
      if (name === 'estimation_rate') {
        updatedEstiRate[myI] = value;
      }
      return {
        ...prevData,
        quantity: updatedQuantity,
        estimation_rate: updatedEstiRate
      };
    });
  };
  const handleEstimationDetails = (name, value, index) => {
    setEstimationDetails((prevData) => {
      const updatedMarkup = [...prevData.markup];
      const updatedMarkupValue = [...prevData.markup_value];
      const updatedGrossPrice = [...prevData.gross_price];
      const updatedTaxable = [...prevData.taxable];
      const updatedVatType = [...prevData.vat_type];
      const updatedVatPercentage = [...prevData.vat_percentage];
      const updatedVatAmount = [...prevData.vat_amount];
      // const updatedSalesPrice = [...prevData.sales_price];

      if (name === 'markup') {
        updatedMarkup[index] = value;
        updatedMarkupValue[index] = parseFloat(updatedMarkup[index] * estimationDetails.estimation_rate[index] / 100).toFixed(2)
        updatedGrossPrice[index] = parseFloat(Number(estimationDetails.estimation_rate[index]) + Number(updatedMarkupValue[index])).toFixed(2)
        // updatedGrossPrice[index] = parseFloat(estimationDetails.estimation_rate[index] + updatedMarkupValue[index]).toFixed(2)
        updatedTaxable[index] = parseFloat(quantities[index] * updatedGrossPrice[index]).toFixed(2)
      }

      return {
        ...prevData,
        markup: updatedMarkup,
        markup_value: updatedMarkupValue,
        gross_price: updatedGrossPrice,
        taxable: updatedTaxable,
        vat_type: updatedVatType,
        vat_percentage: updatedVatPercentage,
        vat_amount: updatedVatAmount,
        // sales_price: updatedSalesPrice
      };
    });
    let error = '';
    switch (name) {
      case "markup":
        if (!/^[0-9\s]+$/.test(value)) {
          error = 'Numeric';
        }
        setMarkupError(error);
        break;
      default:
        break;
    }
  };
  const handleEstimationDetailsTax = (value, selectedIndex, index) => {
    setEstimationDetails((prev) => {
      const UpdatedId = [...prev.vat_id];
      UpdatedId[index] = value.id;
      const UpdatedVatType = [...prev.vat_type];
      UpdatedVatType[index] = value.name;
      const UpdatedVatPercentage = [...prev.vat_percentage];
      UpdatedVatPercentage[index] = value.rate;
      const UpdateVatAmt = [...prev.vat_amount];
      UpdateVatAmt[index] = parseFloat(estimationDetails.taxable[index] * UpdatedVatPercentage[index] / 100).toFixed(2); // Round to 2 decimal places
      const UpdateSalesPrice = [...prev.sales_price];
      UpdateSalesPrice[index] = parseFloat(Number(estimationDetails.taxable[index]) + Number(UpdateVatAmt[index])).toFixed(2); // Round to 2 decimal places

      return {
        ...prev,
        vat_id: UpdatedId,
        vat_type: UpdatedVatType,
        vat_percentage: UpdatedVatPercentage,
        vat_amount: UpdateVatAmt,
        sales_price: UpdateSalesPrice,
      };
    });
  };

  // const 
  useEffect(() => {
    const newEstiFormData = { ...estiFormData };
    let totalEstimationRate = 0; // Initialize the total to 0

    estiFormData.item_name.forEach((item, myI) => {
      newEstiFormData.estimation_rate[myI] = calculateEstimatedRate(myI);
      totalEstimationRate += newEstiFormData.estimation_rate[myI]; // Add each item's estimation_rate to the total
    });

    // Round the total to two decimal places using toFixed(2)
    newEstiFormData.estimation_rate_total = parseFloat(totalEstimationRate.toFixed(2));

    setEstiFormData(newEstiFormData);
  }, [estiFormData.quantity, CatelogueData]);

  const estiHandleSubmit = async (e, index, itemId) => {
    e.preventDefault();

    setEstimationDetails((prev) => {
      // ...prev,
      // [estimation_rate[myInqIndex.index]]: estimation_rate_total
      const updatevalue = [...prev.estimation_rate]
      updatevalue[myInqIndex.index] = parseFloat(estiFormData.estimation_rate_total).toFixed(2)

      //new calculation when estimation 

      if (estimationDetails.vat_percentage[myInqIndex.index]) {

        const updatedMarkupValue = [...prev.markup_value]
        updatedMarkupValue[myInqIndex.index] = parseFloat(Number(estimationDetails.markup[myInqIndex.index]) * Number(updatevalue[myInqIndex.index] / 100)).toFixed(2)
        const updatedGrossPrice = [...prev.gross_price]
        updatedGrossPrice[myInqIndex.index] = parseFloat(Number(updatevalue[myInqIndex.index]) + Number(updatedMarkupValue[myInqIndex.index])).toFixed(2)


        // updatedGrossPrice[myInqIndex.index] = parseFloat(estimationDetails.estimation_rate[myInqIndex.index] + updatedMarkupValue[myInqIndex.index]).toFixed(2)
        const updatedTaxable = [...prev.taxable]
        updatedTaxable[myInqIndex.index] = parseFloat(Number(quantities[myInqIndex.index]) * Number(updatedGrossPrice[myInqIndex.index])).toFixed(2)

        const UpdateVatAmt = [...prev.vat_amount];
        UpdateVatAmt[myInqIndex.index] = parseFloat(Number(updatedTaxable[myInqIndex.index]) * Number(estimationDetails.vat_percentage[myInqIndex.index] / 100)).toFixed(2); // Round to 2 decimal places

        const UpdateSalesPrice = [...prev.sales_price];
        UpdateSalesPrice[myInqIndex.index] = parseFloat(Number(updatedTaxable[myInqIndex.index]) + Number(UpdateVatAmt[myInqIndex.index])).toFixed(2); // Round to 2 decimal places

        return {
          ...prev,
          markup_value: updatedMarkupValue,
          gross_price: updatedGrossPrice,
          taxable: updatedTaxable,
          vat_amount: UpdateVatAmt,
          sales_price: UpdateSalesPrice,
          estimation_rate: updatevalue

        };
      }
      // end 
      return {
        ...prev,
        estimation_rate: updatevalue,
      };
    });


    // Find the inquiryDetail with matching itemId
    const matchingDetail = InquiryData.detail.find((detail) => detail.id === itemId);

    if (matchingDetail) {
      const inquiryDetailId = matchingDetail.id;
      fData.append("inquiry_detail", inquiryDetailId);
      // Rest of your code here
    } else {
      console.error("Matching detail not found for itemId", itemId);
    }
    fData.append("total_price", estiFormData.estimation_rate_total);
    estiFormData.cate_id.forEach((file, index) => {
      fData.append(`item`, file)
    })
    estiFormData.quantity.forEach((file, index) => {
      fData.append(`quantity`, file)
    })
    estiFormData.estimation_rate.forEach((file, index) => {
      fData.append(`estimation_rate`, file)
    })
    dispatch(createEstimationResourceData({ fData, token }));
    // alert("Estimation Resource Details save successfully")
    setErModal({ erModalValue: false, i: itemId })
    setEstiFormData({
      cate_id: [null],
      item_name: [null],
      unit: [null],
      quantity: [null],
      list_price: [null],
      discount: [null],
      vatType: [null],
      vatPercent: [null],
      estimation_rate: [null],
      estimation_rate_total: null
    })
    setEstiRateTrue({ estistate: true })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (estiId) {
      fData.append("inquiry_no", estimationDetails.inquiry_no);
      fData.append("estimation_date", estimationDetails.estimation_date);
      fData.append("inquirydetail", estimationDetails.inquirydetail);
      fData.append("vat_tax", estimationDetails.vat_tax);
      fData.append("estimation_rate", estimationDetails.estimation_rate);
      fData.append("sales_price", estimationDetails.sales_price);
      fData.append("markup", estimationDetails.markup);
      fData.append("taxable", estimationDetails.taxable);
      fData.append("net_total", estimationDetails.net_total);

      // dispatch(updateEstimationData({ fData, token, id: estiId }))
      try {
        setIsLoading(true)
        const response = await api.put(`/estimation/${estiId}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })

        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201") {
          setIsLoading(false)
          toast.success("Estimation updated successfully !")
          navigate("/dashboard/sales/estimation")
        }
      } catch (error) {

      }
    } else {
      fData.append("inquiry_no", estimationDetails.inquiry_no);
      fData.append("estimation_date", estimationDetails.estimation_date);
      // fData.append("inquirydetail", (estimationDetails.inquirydetail));

      estimationDetails.inquirydetail.forEach((file, index) => {
        fData.append(`inquirydetail`, file)
      })
      estimationDetails.vat_id.forEach((file, index) => {
        fData.append(`vat_tax`, file)
      })

      estimationDetails.markup.forEach((file, index) => {
        fData.append(`markup`, file)
      })
      estimationDetails.markup_value.forEach((file, index) => {
        fData.append(`markup_value`, file)
      })
      estimationDetails.gross_price.forEach((file, index) => {
        fData.append(`gross_price`, file)
      })
      estimationDetails.taxable.forEach((file, index) => {
        fData.append(`taxable`, file)
      })
      estimationDetails.estimation_rate.forEach((file, index) => {
        fData.append(`estimation_rate`, file)
      })
      estimationDetails.sales_price.forEach((file, index) => {
        fData.append(`salesprice`, file)
      })
      fData.append("net_total", estimationDetails.net_total);

      // dispatch(createEstimationData({ fData, token }))

      try {
        setIsLoading(true)
        const response = await api.post(`/estimation`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`
          }
        })

        if (response.statusText === "OK" || response.status === "200" || response.statusText === "Created" || response.status === "201") {
          setIsLoading(false)
          toast.success("Estimation created successfully !")
          navigate("/dashboard/sales/estimation")
        }
      } catch (error) {
        throw error
      }
    }
  }

  // Calculate the sum of sales_price values
  useEffect(() => {
    const salesPrices = estimationDetails.sales_price;
    const sum = salesPrices.reduce((acc, currentValue) => {
      if (currentValue !== null) {
        return acc + parseFloat(currentValue);
      } else {
        return acc;
      }
    }, 0);

    // Update the net_total field
    setEstimationDetails({
      ...estimationDetails,
      net_total: sum.toFixed(2),
      inquirydetail: details_id  // Round the sum to two decimal places if needed
    });
  }, [estimationDetails.sales_price]);

  const handleEstimationData = async () => {
    try {

      const response = await api.get(`/estimation/${estiId}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const updateEstimationById = response.data;
      console.log("updateEstimationById", updateEstimationById);
      if (estiId) {
        setEstimationDetails({
          inquiry_no: updateEstimationById && updateEstimationById.estimation_header.inquiry_no.id ? updateEstimationById.estimation_header.inquiry_no.id : null,
          estimation_date: updateEstimationById && updateEstimationById.estimation_header.estimation_date ? updateEstimationById.estimation_header.estimation_date : null,
          inquirydetail: updateEstimationById && updateEstimationById.inquirydetail.id ? updateEstimationById.inquirydetail.id : null,
          vat_tax: updateEstimationById && updateEstimationById.estimation_details.vat_tax.id ? updateEstimationById.estimation_details.vat_tax.id : null,
          markup: updateEstimationById && updateEstimationById.estimation_details.markup ? updateEstimationById.estimation_details.markup : null,
          taxable: updateEstimationById && updateEstimationById.estimation_details.taxable ? updateEstimationById.estimation_details.taxable : null,
          NetTotal: updateEstimationById && updateEstimationById.estimation_details.NetTotal ? updateEstimationById.estimation_details.NetTotal : null,
          salesprice: updateEstimationById && updateEstimationById.estimation_details.salesprice ? updateEstimationById.estimation_details.salesprice : null,
          estimation_rate: updateEstimationById && updateEstimationById.estimation_details.estimation_rate ? updateEstimationById.estimation_details.estimation_rate : null,
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    AOS.init();
    dispatch(getInquiryData(token))
    dispatch(getCatelogueData(token))
    dispatch(getTaxData(token))
    handleEstimationData()
  }, [token]);

  // Catelogue Modal Logic
  const tableRef = useRef(null);
  const [gg, setGg] = useState(true);
  const columns = useMemo(() => header, []);
  const [rowData, setRowData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/catalogue`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const { data } = response;

        // Check if data.catelouge exists before updating rowData
        if (data) {
          // Update rowData with the API response
          setRowData(data);
        } else {
          // Handle the case where the API response is missing the expected data
          console.error('API response is missing expected data');
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Include any dependencies that should trigger the API call (e.g., id)

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

  const CateModalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "71.5%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    height: "600px",
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
  useEffect(() => {

  }, [estimationDetails, estiFormData])
  return (
    <>
      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="registration_top_header">
          <p>
            <h2>
              Estimation Registration
            </h2>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                INQUIRY NUMBER
              </label>
              <Autocomplete
                name="inquiry_no"
                value={
                  Inquiry &&
                  estimationDetails.inquiry_no &&
                  Inquiry.find((item) => item.id === Number(estimationDetails.inquiry_no))
                }
                onChange={(event, value) => handleAutoComplete(value, "inquiry_no")}
                // disabled = {null}
                disablePortal
                disableClearable
                id="combo-box-demo"
                options={Inquiry ? Inquiry : []}
                getOptionLabel={(option) => option.id}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Inquiry"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                ESTIMATION DATE
              </label>
              <TextField
                type="date"
                name="estimation_date"
                onChange={handleChange}
                value={estimationDetails.estimation_date}
                // placeholder="Enter Last Name"
                fullWidth
                required={!estiId}
              />
            </Grid>

          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <div className="details-lable"> <label>DETAILS </label></div>
              <table className='enquiry-details-table'>
                <thead>
                  <tr >
                    <th>BOQ NUMBER</th>
                    <th>BOQ DESCRIPTION</th>
                    <th style={{ width: "70px" }}>UNIT</th>
                    <th>QUANTITY</th>
                    <th style={{ width: "80px" }}>RATE</th>
                    <th>TOTAL AMOUNT</th>
                    <th style={{ width: "150px" }}>ESTIMATION RATE</th>
                    <th>MARKUP</th>
                    <th>TAXABLE</th>
                    <th style={{ width: "150px" }}>VAT TYPE</th>
                    <th>VAT PERCENTAGE</th>
                    <th style={{ width: "150px" }}>SALES PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {InquiryData && InquiryData.detail.map((item, index) => {
                    return (
                      <tr key={index} >
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="boq_number"
                              // onChange={handleChange}
                              value={item.boq_number}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.boq_number !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name="boq_description"
                              // onChange={handleChange}
                              value={item.boq_description}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.boq_description !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name="unit"
                              // onChange={handleChange}
                              value={item.unit}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.unit !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <TextField
                              name={`quantity${index}`}
                              // onChange={handleChange}
                              value={item.quantity}
                              onChange={(e) => handleChangePrice(index, 'quantity', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.quantity !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="rate"
                              // onChange={handleChange}
                              value={item.rate}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.rate !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="total_price"
                              // onChange={handleChange}
                              value={item.total_price}
                              onChange={(e) => handleChangePrice(index, 'boq_number', e.target.value)}
                              placeholder="Ex: 523689"
                              fullWidth
                              required
                              disabled={item.total_price !== null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name="estimation_rate"
                              onClick={() => {
                                handleModalOpen(item.id, index); // Call handleModalOpen with item.id
                                setSelectedItemId(item.id); // Set the selected item ID in state
                              }}
                              onChange={(e) => handleChangePrice('estimation_rate', e.target.value, index)}
                              fullWidth
                              required
                              value={estiRateTrue.estistate ? estimationDetails.estimation_rate[index] : null}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.markup${index}`}
                              onChange={(e) => handleEstimationDetails('markup', e.target.value, index)}
                              // placeholder='5'
                              fullWidth
                              value={estimationDetails.markup[index]}
                              required
                              error={Boolean(markupError)}
                              helperText={markupError}
                            />
                          </div>
                        </td>

                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.taxable${index}`}
                              onChange={(e) => handleEstimationDetails('taxable', e.target.value, index)}
                              fullWidth
                              value={estimationDetails.taxable[index]}
                              required
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>

                            <Autocomplete
                              name={`item.vat_type${index}`}
                              value={
                                taxData && estimationDetails.vat_type &&
                                taxData.find((item) => item.id === Number(estimationDetails.vat_type))
                              }
                              onChange={(event, value) => {
                                const selectedIndex = taxData.findIndex((item) => item.id === value.id);
                                handleEstimationDetailsTax(value, selectedIndex, index);
                              }}
                              disablePortal
                              disableClearable
                              id="combo-box-demo"
                              options={taxData ? taxData : []}
                              getOptionLabel={(option) => option.name}
                              required
                              renderInput={(params) => (
                                <TextField
                                  className="bg-color"
                                  {...params}
                                />
                              )}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.vat_percentage${index}`}
                              onChange={(e) => handleEstimationDetails('vat_percentage', e.target.value, index)}
                              fullWidth
                              value={estimationDetails.vat_percentage[index]}
                              required
                            />
                          </div>
                        </td>

                        <td>
                          <div className='estimation-inquiry-details'>
                            <TextField
                              name={`item.sales_price${index}`}
                              // onChange={(e) => handleEstimationDetails('sales_price', e.target.value, index)}
                              fullWidth
                              value={estimationDetails.sales_price[index]}
                              required
                            />
                          </div>
                        </td>
                        {/* Estimation Rate Modal Start  */}
                        <Modal
                          open={erModal.erModalValue}
                          // onClose={props.closeERModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} >
                            <div className="modal-top-container">
                              <h4> ESTIMATION RESOURCE DETAILS</h4>
                              <RxCross2 onClick={closeERModal} className="modal-btn-cross" />
                            </div>
                            <form>
                              {estiFormData.item_name.map((item, myI) => {
                                const myIOuter = myI;
                                return (
                                  <div className="estimation-resouce-details" >
                                    <div className="estimation-resouce-list">
                                      <label>
                                        ITEM NAME
                                      </label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`item_name-${myI}`}
                                        // value={estiFormData.item_name[index]}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.item_name[myI]}
                                        placeholder="Select Catelogue"
                                        fullWidth
                                        required
                                        onClick={(e, myI) => catelogModal(e, myI)}
                                      // error={Boolean(props.nameError)}
                                      // helperText={props.nameError}
                                      />

                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>
                                        UNIT
                                      </label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`unit_of_measurement${myI}`}
                                        value={estiFormData && estiFormData.unit[myI]}

                                        fullWidth
                                        disabled
                                        required
                                      // error={Boolean(props.nameError)}
                                      // helperText={props.nameError}
                                      />
                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>QUANTITY </label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`quantity${myI}`}
                                        onChange={(e) => handleChangePrice('quantity', e.target.value, myI)}
                                        // value={estiFormData && estiFormData.quantity[myI]} 
                                        fullWidth
                                        required
                                      />

                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>RATE</label>
                                      <TextField
                                        type="text"
                                        disabled
                                        className="inputfield bg-color"
                                        name={`list_price${myI}`}
                                        // onChange={handleRateInputChange}
                                        value={estiFormData && estiFormData.list_price[myI]}
                                        fullWidth
                                        required
                                      />
                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>DISCOUNT</label>
                                      <TextField
                                        type="text"
                                        disabled
                                        className="inputfield bg-color"
                                        name={`discount${myI}`}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.discount[myI]}
                                        // placeholder="Select Catelogue"
                                        fullWidth
                                        required
                                      // error={Boolean(props.nameError)}
                                      // helperText={props.nameError}
                                      />

                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>VAT TYPE</label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        disabled
                                        name={`vat_type${myI}`}
                                        // onChange={handleModalInputChange}
                                        value={estiFormData && estiFormData.vatType[myI]}
                                        // placeholder="Select Catelogue"
                                        fullWidth
                                        required
                                      // error={Boolean(props.nameError)}
                                      // helperText={props.nameError}
                                      />
                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>VAT PERCENT</label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`vat_percent${myI}`}
                                        // onChange={handleModalInputChange}
                                        // value={CatelogueData && CatelogueData.catelouge.tax.rate}
                                        value={estiFormData && estiFormData.vatPercent[myI]}
                                        disabled
                                        // placeholder="Select Catelogue"
                                        fullWidth
                                        required
                                      // error={Boolean(props.nameError)}
                                      // helperText={props.nameError}
                                      />
                                    </div>
                                    <div className="estimation-resouce-list">
                                      <label>ESTIMATION</label>
                                      <TextField
                                        type="text"
                                        className="inputfield bg-color"
                                        name={`estimation_rate${myI}`}
                                        value={estiFormData.estimation_rate[myI]}
                                        fullWidth
                                        disabled
                                        required
                                        readOnly // Make it read-only to prevent user input
                                      />
                                    </div>
                                    {/* Catelogue Modal Start New */}
                                    <Modal open={cateModalOpen.modalValue}>
                                      <Box style={CateModalstyle}>
                                        <div className="modal-top-container">
                                          <h4>Catelogue</h4>
                                          <RxCross2 onClick={catelogueModalClose} className="modal-btn-cross" />

                                        </div>

                                        <div className="modal-data-container-catelogue">
                                          <div className="Features-section">
                                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className="Global-filter" />
                                            <button onClick={generatePdf} className="secondary-btn"><PiExportBold />Export</button>
                                          </div>

                                          <div className="table-estimation">
                                            <div ref={tableRef}>
                                              <div {...getTableProps()}>
                                                <div {...getTableBodyProps()} className="top-product-container-estimation">
                                                  {page.map((row) => {
                                                    prepareRow(row, index);

                                                    const cellId = row.original.id;
                                                    return (
                                                      <div {...row.getRowProps()} className="product-container-main" onClick={(e) => handleClick(e, myIOuter, cellId)}>

                                                        <div className="product-container">
                                                          <img src={`${ImgUrl}${row.original.primary_image}`} alt="Product Image" height='100px' />
                                                          <div className="product-details-container">
                                                            <strong>{row.original.name}</strong>
                                                            <div className="currency-container">
                                                              <span>{row.original.currency}</span>&nbsp;<span>{row.original.list_price}</span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <span className="product-container-span">Brand :  <span style={{ color: "#" }}>{row.original.brand}</span></span>
                                                        <span className="product-container-span">Model :  <span style={{ color: "#" }}>{row.original.model}</span></span>
                                                        <span className="product-container-span" style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}><span style={{ color: "#" }}>Origin :  {row.original.origin}</span><span className="view-container" onClick={() => handleClick(cellId)}>
                                                        </span></span>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>


                                      </Box>
                                    </Modal>
                                    {/* Catelogue Modal End New */}
                                  </div>
                                )
                              })}
                              <div className="estimation-resouce-list">
                                <label>ESTIMATION RATE</label>
                                <TextField
                                  type="text"
                                  className="inputfield bg-color"
                                  fullWidth
                                  required
                                  value={estiFormData.estimation_rate_total}
                                  readOnly // Make it read-only to prevent user input
                                />
                              </div>
                              <div style={{ padding: "10px" }}> <button onClick={handleAddMore}>Add More</button></div>
                              <div className="saveBtn">
                                <button
                                  variant="outlined"
                                  type="submit"
                                  onClick={(e) => estiHandleSubmit(e, index, selectedItemId)} // Use selectedItemId
                                >
                                  Save
                                </button>
                                <button
                                  variant="outlined"
                                  type="submit"
                                  onClick={closeERModal} // Use selectedItemId
                                >
                                  Close
                                </button>
                              </div>
                            </form>
                          </Box>
                        </Modal>
                        {/* Estimation Rate Modal End  */}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="estimation-resouce-list-net-total">
                <label style={{ fontSize: "15px", fontWeight: "bold" }}>NET TOTAL</label>
                <TextField
                  type="text"
                  className="inputfield bg-color"
                  fullWidth
                  required
                  value={estimationDetails.net_total}
                  readOnly
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

            {isLoading ? <CommonLoading /> : estiId ? (

              <button type="submit" variant="contained" className="btn-bgColor">
                Update
              </button>
            ) : (

              <button type="submit" variant="contained" className="btn-bgColor">
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Estimation