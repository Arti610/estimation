import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatelogueData, getupdateCatelogueData, resetCatelogueData } from '../../APIs/CatelogueSlice';
import './Catelogue.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
import { ProductTable } from '../../Components/Table list/ProductTable';
import { FaUserAlt } from 'react-icons/fa'
const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const [cookies, setCookies] = useState(['token'])
  const token = cookies.token;
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);

  const header = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Image",
      accessor: "profile_image",
      disableFilters: true,
      Cell: props => (
        <img
          src={`${ImgUrl}${props.row.original.primary_image}`}
          width={50}
          height={50}
          alt={<FaUserAlt />}
        />)
    }
  ];
  const handleClick = (id) => {
    dispatch(getupdateCatelogueData({ token, id }))
    navigate("/sales/catelogue-details")
  }
  const createHandler = () => {
    navigate("/sales/catelogue-registration")

    // dispatch(resetCatelogueData())
    // window.location.reload()
  }
  useEffect(() => {
    dispatch(getCatelogueData(token));
  }, []);

  return (
    // <div data-aos="fade-left" data-aos-duration="1000">
    //   <div className="registration_top_header">
    //     <p>
    //       <span className='border-bottom-heading'>
    //         Catelogue
    //       </span>
    //       <button onClick={createHandler}>Create +</button>
    //     </p>
    //   </div>

    //   <div className="main-product-container ">
    //     {catelogueData && catelogueData ? catelogueData.map((item, index) => (

    //       <div className="product-container" key={index} onClick={() => handleClick(item.id)}>
    //         <div className="product-image">
    //           <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
    //         </div>
    //         <div className="product-details">
    //           <h3>{item.name}</h3>
    //           <p><span>{item.model}</span><span>{ }</span></p>
    //           {item.isactive ? "Active" : "Inactive"}
    //         </div>
    //       </div>

    //     )) : "There is currently no catalog available."}
    //   </div>

    // </div>
    <>
      {catelogueData ? <ProductTable
        colHeader={header}
        rowData={catelogueData}
        // updateHandler={editHandler}
        // deleteHandler={deleteHandler}
        createHandler={createHandler}
        tableHeading="All Catelogues"
        pageHeading="Catelogue" /> : "loading....."}
    </>
  );
};

export default CategoryList;
