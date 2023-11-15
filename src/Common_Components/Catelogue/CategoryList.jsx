import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatelogueData, getupdateCatelogueData, resetCatelogueData } from '../../APIs/CatelogueSlice';
import './Catelogue.css'
import { useNavigate } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
import { ProductTable } from '../../Components/Table list/ProductTable';
import { FaUserAlt } from 'react-icons/fa'

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('Token');

  const [btnToggle, setBtnToggle] = useState(true)
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);
  const catelogueDataStatic = ["No Catalogue Available"]

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


  const createHandler = () => {
    navigate("/dashboard/sales/catelogue-registration")
  }

  useEffect(() => {
    dispatch(getCatelogueData(token));
  }, []);

  return (

    <>
      {/* <button onClick={() => setBtnToggle(!btnToggle)}>{btnToggle ? "List View" : "Card View"}</button> */}
      {catelogueData && btnToggle ? <ProductTable
        colHeader={header}
        rowData={catelogueData}
        createHandler={createHandler}
        tableHeading="All Catelogues"
        pageHeading="Catelogue" /> :
        "No Catalogue Available"}
    </>
  );
};

export default CategoryList;
