import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImgUrl } from '../../Config/Config'
// import './Catelogue.css'
import './CatelogueDetails.css'
import { FaFilePdf } from 'react-icons/fa'
import { getupdateCatelogueData } from '../../APIs/CatelogueSlice'
import { useNavigate } from 'react-router-dom'

const Catelogue = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const token = localStorage.getItem('Token');
  const updateHandler = (id) => {
    dispatch(getupdateCatelogueData({ token, id }))
    navigate("/sales/catelogue-registration")
  }

  return (
    <>
      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="registration_top_header">
          <p>
            <h2 className='border-bottom-heading'>
              Catelogue Details
            </h2>
          </p>
        </div>
        <div className="main-catelogue-container">
          <button onClick={() => updateHandler(CatelogueData && CatelogueData.catelouge.id)}>Edit</button>

          {/* <div className="primary-container">

            <div className="images-container">
              <img src={`${ImgUrl}${CatelogueData && CatelogueData.catelouge.primary_image}`} />

            </div>

            <div className="details-container">
              <h2>{CatelogueData && CatelogueData.catelouge.name}</h2>
              <div className="detail-container">
                <div className='left-detail-container'>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Type: </label>{CatelogueData && CatelogueData.catelouge.type}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Category: </label>{CatelogueData && CatelogueData.catelouge.category}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Sub Category: </label>{CatelogueData && CatelogueData.catelouge.sub_category}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Type Sub Category: </label>{CatelogueData && CatelogueData.catelouge.type_sub_category}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Origin: </label>{CatelogueData && CatelogueData.catelouge.origin}</p>
                </div>
                <div className="middle-container">
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Finish: </label>{CatelogueData && CatelogueData.catelouge.finish}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Brand: </label> {CatelogueData && CatelogueData.catelouge.brand}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Serious: </label>{CatelogueData && CatelogueData.catelouge.series}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Model: </label>{CatelogueData && CatelogueData.catelouge.model}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Size: </label>{CatelogueData && CatelogueData.catelouge.size}</p>
                </div>
                <div className='right-detail-container'>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>List Price: </label>{CatelogueData && CatelogueData.catelouge.list_price}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Currency: </label>{CatelogueData && CatelogueData.catelouge.currency}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Discount: </label>{CatelogueData && CatelogueData.catelouge.discount}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Unit Of Measurement: </label>{CatelogueData && CatelogueData.catelouge.unit_of_measurement}</p>
                  <p className='detail-label'><label style={{ fontSize: "15px" }}>Base of Pricing: </label>{CatelogueData && CatelogueData.catelouge.base_of_pricing}</p>
                </div>

              </div>
              <div className="bottom-detail-container">
                <p className='detail-label'><label style={{ fontSize: "15px" }}>Specification: </label>{CatelogueData && CatelogueData.catelouge.specification}</p>

              </div>
            </div>
          </div>
          <label>OTHER IMAGES</label>
          <div className="other-images-container">
            {CatelogueData ? CatelogueData.images.map((item, i) => {
              return (
                <>
                  <div className='other-images' key={i}>
                    <img src={`${ImgUrl}${item.files}`} />
                  </div>
                </>
              )
            }) : (<p>No Images Found</p>)}
          </div>
          <label>DATASHEETS</label>
          <div className="datasheet-container">
            {CatelogueData ? CatelogueData.datasheet.map((item, i) => {
              return (
                <>
                  <div className='pdfs' key={i}>
                    <span className="pdf-container"> <FaFilePdf className='pdf-icon' /> <a href={`${ImgUrl}${item.datasheet}`} target="_blank" download>{item.datasheet.replace('/media/catalogueSheet/', '')}</a></span>
                  </div>
                </>
              )
            }) : <p>No Datasheet Uploaded</p>}
          </div>
          <label>CERTIFICATES</label>
          <div className="certificate-container">
            {CatelogueData ? CatelogueData.certificates.map((item, i) => {
              return (
                <>
                  <div className='pdfs' key={i}>
                    <span className="pdf-container">  <FaFilePdf className='pdf-icon' /><a href={`${ImgUrl}${item.files}`} target="_blank" download>{item.files.replace('/media/Catalouge_certificate/', '')}</a></span>
                  </div>
                </>
              )
            }) : "No Certificate Uploaded"}
          </div> */}
          <div className='main-catelogue-all-container'>
            <div className='main-catelogue-images-container'>
            <img src={`${ImgUrl}${CatelogueData && CatelogueData.catelouge.primary_image}`} />
            </div>
            <div className='main-catelogue-details-container'>details</div>
            <div className='main-catelogue-action-container'>action</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Catelogue