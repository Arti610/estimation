import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatelogueData, getupdateCatelogueData } from '../../APIs/CatelogueSlice';
import './Catelogue.css'
import { useNavigate } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [cookies, setCookies] = useState(['token'])
  const token = cookies.token;
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);

  const handleClick = (id) => {
    dispatch(getupdateCatelogueData({ token, id }))
    navigate("/sales/catelogue-details")
  }

  useEffect(() => {
    dispatch(getCatelogueData(token));
  }, []);

  return (
    <div data-aos="fade-left" data-aos-duration="1000">
      <div className="registration_top_header">
        <p>
          <span className='border-bottom-heading'>
            Catelogue
          </span>
          <button onClick={() => navigate("/sales/catelogue-registration")}>Create +</button>
        </p>
      </div>
     
      <div className="main-product-container ">
        {catelogueData && catelogueData ? catelogueData.map((item, index) => (
         
            <div className="product-container" key={index} onClick={() => handleClick(item.id)}>
              <div className="product-image">
                <img src={`${ImgUrl}${item.primary_image}`} alt="image" />
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <p><span>{item.model}</span><span>{}</span></p>
                {item.isactive ? "Active":"Inactive"}
              </div>
            </div>
         
        )): "Loading....."}
        </div>
     
    </div>
  );
};

export default CategoryList;
