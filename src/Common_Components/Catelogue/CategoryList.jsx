import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatelogueData, getupdateCatelogueData, resetCatelogueData } from '../../APIs/CatelogueSlice';
import './Catelogue.css'
import {  useNavigate } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
import { ProductTable } from '../../Components/Table list/ProductTable';
import { FaUserAlt } from 'react-icons/fa'

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('Token');

  const [btnToggle, setBtnToggle] = useState(true)
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);


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
    }
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
        // updateHandler={editHandler}
        // deleteHandler={deleteHandler}
        createHandler={createHandler}
        tableHeading="All Catelogues"
        // handleClick={handleClick}
        pageHeading="Catelogue" /> :
      "loading...."}
    </>
  );
};

export default CategoryList;
