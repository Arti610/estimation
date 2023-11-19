import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImgUrl } from '../../Config/Config'
import './CatelogueDetails.css'
import { FaFilePdf } from 'react-icons/fa'
import { deleteCatelogueData, getCatelogueData, getupdateCatelogueData } from '../../APIs/CatelogueSlice'
import { useNavigate, useParams } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal'
import api from '../../Config/Apis'



const Catelogue = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cateId } = useParams()

  const [imagesToggle, setImagesToggle] = useState(true)
  const [certificatesToggle, setCertificatesToggle] = useState(false)
  const [datasheetsToggle, setDatasheetsToggle] = useState(false)
  const [specificationToggle, setSpecificationToggle] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const token = localStorage.getItem('Token');
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (!maxLength) return text;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const updateHandler = (cateId) => {
    navigate(`/dashboard/sales/catelogue-registration/${cateId}`)
  }

  const deleteHandle = (id) => {
    setDeleteId(id)
    setDeleteModalOpen(true)
  }

  const deleteDataHandler = () => {
    if (deleteId) {
      try {
        const response = api.delete(`/delete_catalogue/${deleteId}`, {
          headers: { Authorization: `token ${token}` }
        })
        if (response.status === "OK" || response.statusText === "200") {
          setDeleteModalOpen(false)
          navigate("/dashboard/sales/catelogue")
          toast.success("Deleted successfully")
          dispatch(getCatelogueData(token))
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  const imagesHandler = () => {
    setImagesToggle(true)
    setDatasheetsToggle(false)
    setCertificatesToggle(false)
    setSpecificationToggle(false)
  }
  const certificateHandler = () => {
    setImagesToggle(false)
    setDatasheetsToggle(false)
    setCertificatesToggle(true)
    setSpecificationToggle(false)
  }
  const datasheetHandler = () => {
    setImagesToggle(false)
    setDatasheetsToggle(true)
    setCertificatesToggle(false)
    setSpecificationToggle(false)
  }
  const specificationHandler = () => {
    setImagesToggle(false)
    setDatasheetsToggle(false)
    setCertificatesToggle(false)
    setSpecificationToggle(true)
  }


  useEffect(() => {
    dispatch(getupdateCatelogueData({ id: cateId, token }))
  }, [])

  return (
    <>

      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="registration_top_header">
          <p>
            <h2 className='border-bottom-heading'>
              Catelogue Details
            </h2>
            <div style={{ display: "flex", gap: "5px" }}>
              <button onClick={() => updateHandler(cateId)}>Edit</button>
              <button onClick={() => deleteHandle(cateId)}>Delete</button>
            </div>
          </p>

        </div>
        <div className="main-catelogue-container">

          <div className="primary-container">
            <div className="images-container">
              <img src={`${ImgUrl}${CatelogueData && CatelogueData.catelouge.primary_image}`} />
            </div>

            <div className="details-container">
              {/* <h2>{CatelogueData && CatelogueData.catelouge.name}</h2> */}
              <div className="catelogue-details-container">
                <h2>{CatelogueData && CatelogueData.catelouge.name}</h2>
                <div className="catelogue-currency-container">
                  <span>{CatelogueData && CatelogueData.catelouge.currency}</span>&nbsp;<span>{CatelogueData && CatelogueData.catelouge.list_price}</span>&nbsp;<h5 style={{ display: 'inline-flex' }}>{CatelogueData && CatelogueData.catelouge.origin}</h5>
                  <h4 style={{ marginTop: "10px", color: "grey" }}>{CatelogueData && CatelogueData.catelouge.brand}</h4>
                </div>

                <div className="specification-detail-container">
                  <p className={`detail-label specification-detail ${showMore ? 'expanded' : 'collapsed'}`}>
                    <label style={{ fontSize: "15px" }}></label>
                    {truncateText(CatelogueData && CatelogueData.catelouge.specification, showMore ? undefined : 600)}
                  </p>
                  {CatelogueData &&
                    CatelogueData.catelouge.specification.length > 50 && (
                      <button onClick={toggleShowMore} className="show-more-button">
                        {showMore ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="details-container-heading">
            <div className={`heading-container ${imagesToggle ? 'active-container' : ''}`}>
              <h5
                onClick={imagesHandler}
                className={imagesToggle ? 'active-heading' : ''}
              >
                ALL IMAGES
              </h5>
              <h5
                onClick={specificationHandler}
                className={specificationToggle ? 'active-heading' : ''}
              >
                SPECIFICATION
              </h5>
              <h5 onClick={certificateHandler}
                className={certificatesToggle ? 'active-heading' : ''}
              >
                CERTIFICATES
              </h5>
              <h5
                onClick={datasheetHandler}
                className={datasheetsToggle ? 'active-heading' : ''}
              >
                DATASHEETS
              </h5>

            </div>
            <div className="toggle-data-container">
              {imagesToggle ? <div className="other-images-container">
                {CatelogueData ? CatelogueData.images.map((item, i) => {
                  return (
                    <>
                      <div className='other-images' key={i}>
                        <img src={`${ImgUrl}${item.files}`} />
                      </div>
                    </>
                  )
                }) : (<p>No Images Found</p>)}
              </div> : null}

              {specificationToggle ? <div className="specification-container">
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
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Brand: </label>{CatelogueData && CatelogueData.catelouge.brand}</p>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Series: </label>{CatelogueData && CatelogueData.catelouge.series}</p>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Model: </label>{CatelogueData && CatelogueData.catelouge.model}</p>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Size: </label>{CatelogueData && CatelogueData.catelouge.size}</p>
                  </div>
                  <div className='right-detail-container'>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Unit Of Measurement: </label>{CatelogueData && CatelogueData.catelouge.unit_of_measurement}</p>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Base of Pricing: </label>{CatelogueData && CatelogueData.catelouge.base_of_pricing}</p>
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>Discount: </label>{CatelogueData && CatelogueData.catelouge.discount}</p>
                    {/* <p className='detail-label'><label style={{ fontSize: "15px" }}>Unit Of Measurement: </label>{CatelogueData && CatelogueData.catelouge.unit_of_measurement}</p> */}
                    <p className='detail-label'><label style={{ fontSize: "15px" }}>List Price: </label>{CatelogueData && CatelogueData.catelouge.list_price}</p>
                  </div>
                </div>

              </div> : null}
              {datasheetsToggle ? <div className="datasheet-container">
                {CatelogueData ? CatelogueData.datasheet.map((item, i) => {
                  return (
                    <>
                      <div className='pdfs' key={i}>
                        <span className="pdf-container"> <FaFilePdf className='pdf-icon' /> <a href={`${ImgUrl}${item.datasheet}`} target="_blank" download>{item.datasheet.replace('/media/catalogueSheet/', '')}</a></span>
                      </div>
                    </>
                  )
                }) : <p>No Datasheet Uploaded</p>}
              </div> : null}
              {certificatesToggle ? <div className="certificate-container">
                {CatelogueData ? CatelogueData.certificates.map((item, i) => {
                  return (
                    <>
                      <div className='pdfs' key={i}>
                        <span className="pdf-container">  <FaFilePdf className='pdf-icon' /><a href={`${ImgUrl}${item.files}`} target="_blank" download>{item.files.replace('/media/Catalouge_certificate/', '')}</a></span>
                      </div>
                    </>
                  )
                }) : "No Certificate Uploaded"}
              </div> : null}

            </div>
          </div>

        </div>

      </div>
      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Catalogue" deleteData={deleteDataHandler} />
   
    </>
  )
}

export default Catelogue