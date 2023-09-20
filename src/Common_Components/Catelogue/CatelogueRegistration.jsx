import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Grid, ImageList, ImageListItem, TextField } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";
import { useCookies } from 'react-cookie';
import { AiFillDelete } from 'react-icons/ai'
import { ImgUrl } from '../../Config/Config';
import { createCatelogueData, deleteCatelogueCertificates, deleteCatelogueDatasheets, deleteCatelogueImages, getCatelogueData, updateCatelogueData } from '../../APIs/CatelogueSlice';
import { updateDepartmentData } from '../../APIs/DepartmentSlice';
import { getTaxData } from '../../APIs/TaxSlice';

const CatelogueRegistration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fData = new FormData();
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [baseOfPricing, setBaseOfPricing] = useState('');
  const token = localStorage.getItem('Token');
  const Tax = useSelector((state) => state.Tax.TaxData)
  const CatelogueData = useSelector((state) => state.Catelogue.updateCatelogueData)
  const updatedCatelogue = useSelector((state) => state.Catelogue.updateCatelogueData)

  const [formData, setFormData] = useState({
    name: null,
    type: null,
    category: null,
    sub_category: null,
    type_sub_category: null,
    origin: null,
    finish: null,
    brand: null,
    series: null,
    model: null,
    size: null,
    specification: null,
    list_price: null,
    currency: null,
    discount: null,
    base_of_pricing: null,
    is_active: null,
    tax: null,
    unit_of_measurement: null,
    primary_image: '',
    imgFile: null,
    images: null,
    datasheet: null,
    certificate: null,
  })

  const handleSingleImageChange = (e) => {
    const { files } = e.target;
    if (files) {
      formData.imgFile = null;
    }
    setFormData((previous) => ({
      ...previous,
      primary_image: files[0],
    }));
  };
  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;

    // Convert the FileList to an array
    const filesArray = Array.from(selectedFiles);

    // Update the formData state with the new array of files
    setFormData((prevData) => ({
      ...prevData,
      images: filesArray,
    }));
  };

  const handleSinglePdfChange = (event) => {
    const selectedFiles = event.target.files;

    // Convert the FileList to an array
    const filesArray = Array.from(selectedFiles);

    // Update the formData state with the new array of files
    setFormData((prevData) => ({
      ...prevData,
      datasheet: filesArray
    }));
  };
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    // Convert the FileList to an array
    const filesArray = Array.from(selectedFiles);

    // Update the formData state with the new array of files
    setFormData((prevData) => ({
      ...prevData,
      certificate: filesArray
    }));
  };
  const handleAutoComplete = (newValue, fieldName) => {
    const selectedValue = newValue ? newValue.id : null;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: selectedValue,
    }));
  };
  //Delete handler
  const deleteImagesHandler = (id) => {
    dispatch(deleteCatelogueImages({ token, id }))
  }
  const deleteDatasheetHandler = (id) => {
    dispatch(deleteCatelogueDatasheets({ token, id }))
  }
  const deleteCertificateHandler = (id) => {
    dispatch(deleteCatelogueCertificates({ token, id }))
  }
  const handleChange = (e) => {
    const { name, value } = e.target;


    // Update other form fields
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validation
    let error = '';

    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Name should only contain alphabetical characters';
        }
        setNameError(error);
        break;


      case "list_price":
        if (!/^[0-9]+$/.test(value)) {
          error = 'Price should only contain numerical digits';
        }
        setPriceError(error);
        break;
      case "discount":
        if (!/^[0-9]+$/.test(value)) {
          error = 'Discount should only contain numerical digits';
        }
        setDiscountError(error);
        break;
      case "base_of_pricing":
        if (!/^[0-9]+$/.test(value)) {
          error = 'Base of pricing should only contain numerical digits';
        }
        setBaseOfPricing(error);
        break;


      default:
        break;
    }

    console.log("formData", formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (updatedCatelogue) {
      fData.append("name", formData.name);
      fData.append("unit_of_measurement", formData.unit_of_measurement);
      fData.append("type", formData.type);
      fData.append("category", formData.category);
      fData.append("sub_category", formData.sub_category);
      fData.append("type_sub_category", formData.type_sub_category);
      fData.append("origin", formData.origin);
      fData.append("finish", formData.finish);
      fData.append("brand", formData.brand);
      fData.append("series", formData.series);
      fData.append("model", formData.model);
      fData.append("size", formData.size);
      fData.append("specification", formData.specification);
      fData.append("list_price", formData.list_price);
      fData.append("currency", formData.currency);
      fData.append("discount", formData.discount);
      fData.append("base_of_pricing", formData.base_of_pricing);
      fData.append("tax", formData.tax);

      if (formData.primary_image) {
        fData.append("primary_image", formData.primary_image);
      }

      if (formData.images) {
        formData.images.forEach((file, index) => {
          fData.append(`images`, file);
        });
      }

      if (formData.datasheet) {
        formData.datasheet.forEach((file, index) => {
          fData.append(`datasheet`, file);
        });
      }

      if (formData.certificate) {
        formData.certificate.forEach((file, index) => {
          fData.append(`certificate`, file);
        });
      }

      dispatch(updateCatelogueData({ fData, token, id: updatedCatelogue.catelouge.id }))
      navigate("/dashboard/sales/catelogue")
    } else {
      setFormData({
        name: null,
        type: null,
        unit_of_measurement: null,
        category: null,
        sub_category: null,
        type_sub_category: null,
        origin: null,
        finish: null,
        brand: null,
        series: null,
        model: null,
        size: null,
        specification: null,
        list_price: null,
        currency: null,
        discount: null,
        base_of_pricing: null,
        is_active: null,
        primary_image: '',
        imgFile: null,
        images: null,
        datasheet: null,
        certificate: null,
      })
      fData.append("name", formData.name);
      fData.append("unit_of_measurement", formData.unit_of_measurement);
      fData.append("type", formData.type);
      fData.append("category", formData.category);
      fData.append("sub_category", formData.sub_category);
      fData.append("type_sub_category", formData.type_sub_category);
      fData.append("origin", formData.origin);
      fData.append("finish", formData.finish);
      fData.append("brand", formData.brand);
      fData.append("series", formData.series);
      fData.append("model", formData.model);
      fData.append("size", formData.size);
      fData.append("specification", formData.specification);
      fData.append("list_price", formData.list_price);
      fData.append("currency", formData.currency);
      fData.append("discount", formData.discount);
      fData.append("base_of_pricing", formData.base_of_pricing);
      fData.append("tax", formData.tax);
      // fData.append("is_active", formData.is_active);
      fData.append("primary_image", formData.primary_image);
      formData.images.forEach((file, index) => {
        fData.append(`images`, file);
      });
      formData.datasheet.forEach((file, index) => {
        fData.append(`datasheet`, file);
      });
      formData.certificate.forEach((file, index) => {
        fData.append(`certificate`, file);
      });
      dispatch(createCatelogueData({ fData, token }))
      navigate("/dashboard/sales/catelogue")

    }
  }
  useEffect(() => {
    AOS.init();
    dispatch(getTaxData(token))
    console.log("updatedCatelogue",updatedCatelogue);
    if (updatedCatelogue) {
      setFormData({
        // id:  updatedCatelogue.catelogue.id,
        name: updatedCatelogue.catelouge.name,
        unit_of_measurement: updatedCatelogue.catelouge.unit_of_measurement,
        type: updatedCatelogue.catelouge.type,
        category: updatedCatelogue.catelouge.category,
        sub_category: updatedCatelogue.catelouge.sub_category,
        type_sub_category: updatedCatelogue.catelouge.type_sub_category,
        origin: updatedCatelogue.catelouge.origin,
        finish: updatedCatelogue.catelouge.finish,
        brand: updatedCatelogue.catelouge.brand,
        series: updatedCatelogue.catelouge.series,
        model: updatedCatelogue.catelouge.model,
        size: updatedCatelogue.catelouge.size,
        specification: updatedCatelogue.catelouge.specification,
        list_price: updatedCatelogue.catelouge.list_price,
        currency: updatedCatelogue.catelouge.currency,
        discount: updatedCatelogue.catelouge.discount,
        tax: String(updatedCatelogue.catelouge.tax.id),
        base_of_pricing: updatedCatelogue.catelouge.base_of_pricing,
        is_active: updatedCatelogue.catelouge.is_active,
        // primary_image: updatedCatelogue.catelouge.primary_image
        imgFile: updatedCatelogue.catelouge.primary_image,
        // images: updatedCatelogue.images
      });

    }


  }, [token, updatedCatelogue]);

  return (
    <>
      <div

        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="registration_top_header">
          <p>
            <h2>
              Catelogue Registration
            </h2>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                NAME <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Enter Catelogue Name"
                fullWidth
                required
                error={Boolean(nameError)}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                TYPE <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="type"
                onChange={handleChange}
                value={formData.type}
                placeholder="Enter Catelogue Type"
                fullWidth
                required

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                CATEGORY <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="category"
                onChange={handleChange}
                value={formData.category}
                placeholder="Enter Category"
                fullWidth
                required

              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                SUB CATEGORY <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="sub_category"
                onChange={handleChange}
                value={formData.sub_category}
                placeholder="Enter Sub Category"
                fullWidth
                required

              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label>
                SUB CATEGORY TYPE <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="type_sub_category"
                onChange={handleChange}
                value={formData.type_sub_category}
                placeholder="Enter Sub Category Type"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                ORIGIN <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="origin"
                onChange={handleChange}
                value={formData.origin}
                placeholder="Origin"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>FINISH <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="finish"
                onChange={handleChange}
                value={formData.finish}
                placeholder="Finish"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                BRAND <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="brand"
                onChange={handleChange}
                value={formData.brand}
                placeholder="Enter Brand"
                fullWidth
                required
              />


            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label>SERIES <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="series"
                onChange={handleChange}
                value={formData.series}
                placeholder="Enter Series"
                fullWidth
                required
              />

            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>MODEL <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="model"
                onChange={handleChange}
                value={formData.model}
                placeholder="Enter Model"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                DIMENSIONS <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="size"
                onChange={handleChange}
                value={formData.size}
                placeholder="Ex: 10x25"
                fullWidth
                required
              />


            </Grid>

            <Grid item xs={12} sm={6} md={4}>

              <label>
                UNIT OF MEASUREMENT <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="unit_of_measurement"
                onChange={handleChange}
                value={formData.unit_of_measurement}
                placeholder="EX: pcs"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>LIST PRICE <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="list_price"
                onChange={handleChange}
                value={formData.list_price}
                placeholder="Ex: 50"
                fullWidth
                required
                error={Boolean(priceError)}
                helperText={priceError}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                CURRENCY <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="currency"
                onChange={handleChange}
                value={formData.currency}
                placeholder="Ex: Rs."
                fullWidth
                required
              />


            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label>DISCOUNT <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="discount"
                onChange={handleChange}
                value={formData.discount}
                placeholder="EX: 20"
                fullWidth
                required
                error={Boolean(discountError)}
                helperText={discountError}
              />

            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                BASE OF PRICING <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="base_of_pricing"
                onChange={handleChange}
                value={formData.base_of_pricing}
                placeholder="EX: 5000"
                fullWidth
                required
                error={Boolean(baseOfPricing)}
                helperText={baseOfPricing}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>
                TAX <span style={{ color: "red" }}>*</span>
              </label>
              <Autocomplete
                name="tax"
                value={
                  Tax &&
                  formData.tax &&
                  Tax.find((item) => item.id === Number(formData.tax))
                }
                onChange={(event, value) => handleAutoComplete(value, "tax")}

                disablePortal
                id="combo-box-demo"
                options={Tax}
                getOptionLabel={(option) => option.name}
                required
                renderInput={(params) => (
                  <TextField
                    className="bg-color"
                    placeholder="Select Tax"
                    {...params}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>

              <label>UPLOAD PHOTO <span style={{ color: "red" }}>*</span></label>
              <div className="App">
                <label htmlFor="upload-photo">
                  <input
                    className="upload-files-field"
                    id="upload-photo"
                    name="primary_image"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleSingleImageChange}
                    required={!updatedCatelogue}

                  />
                </label>{" "}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            {/* <Grid item xs={12} sm={6} md={4}>
              <div style={{ marginBlock: "5%", display: "flex", alignItems: "center" }}>
                <ImageList
                  sx={{ width: 200, height: "auto" }}
                  cols={2}
                  rowHeight={"auto"}
                >
                  <ImageListItem>
                    {formData.imgFile && (
                      <img
                        src={`${ImgUrl}${formData.imgFile}`}
                        alt="Uploaded file"
                        loading="lazy"
                      // required={!updatedCatelogue}
                      />
                    )}
                    {formData.primary_image && (
                      <img
                        src={URL.createObjectURL(formData.primary_image)}
                        alt="Uploaded file"
                        loading="lazy"
                      // required={!updatedCatelogue}
                      />
                    )}

                  </ImageListItem>
                </ImageList>
              </div>
            </Grid> */}
            {updatedCatelogue ? null : <Grid item xs={12} sm={6} md={4}>
              <label>
                UPLOAD OTHER PHOTOS <span style={{ color: "red" }}>*</span>
              </label>
              <div className="App">
                <input
                  className="upload-files-field"
                  name="images"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleImageChange}
                  required={!updatedCatelogue}

                />
              </div>
            </Grid>}
            {updatedCatelogue ? null : <Grid item xs={12} sm={6} md={4}>
              <label>UPLOAD DATASHEETS <span style={{ color: "red" }}>*</span></label>
              <div className="App">
                <label htmlFor="upload-photo">
                  <input
                    className="upload-files-field"
                    id="upload-photo"
                    name="datasheet"
                    type="file"
                    multiple
                    onChange={handleSinglePdfChange}
                    required={!updatedCatelogue}

                  />
                </label>{" "}
              </div>
            </Grid>}
            {updatedCatelogue ? null : <Grid item xs={12} sm={6} md={4}>
              <label>UPLOAD CERTIFICATES </label>
              <div className="App">
                <label htmlFor="upload-photo">
                  <input
                    className="upload-files-field"
                    id="upload-photo"
                    name="certificate"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    required={!updatedCatelogue}

                  />
                </label>{" "}
              </div>
            </Grid>}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <label>SPECIFICATION <span style={{ color: "red" }}>*</span></label>
              <TextField
                type="text"
                className="inputfield bg-color"
                name="specification"
                onChange={handleChange}
                value={formData.specification}
                placeholder="Enter Specification"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {updatedCatelogue ?
              <Grid item xs={12} sm={6} md={12}>
                <label>
                  OTHER IMAGES
                </label>
                <div className="App">
                  <label htmlFor="upload-photo">
                    <input
                      className="upload-files-field"
                      id="upload-photo"
                      name="images"
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      required={!updatedCatelogue}
                    />
                  </label>
                </div>
                <ImageList cols={10}>
                  {CatelogueData ? CatelogueData.images.map((image, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", margin: "8px", justifyContent: "center" }} >
                      {image && (
                        <img
                          style={{ width: "80px", height: "80px" }}
                          src={`${ImgUrl}${image.files}`} // Replace YOUR_BASE_URL with the actual base URL for your images
                          alt={`Uploaded file ${index}`}
                          loading="lazy"
                        />
                      )}
                      <span style={{ cursor: "pointer" }} onClick={() => deleteImagesHandler(image.id)}><AiFillDelete /></span>
                    </div>
                  )) : "No Images Uploaded"}


                  {/* {formData.image && formData.image.map((file, index) => (
                    <ImageListItem key={index}>
                      {file && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded file ${index}`}
                          loading="lazy"
                        />
                      )}
                    </ImageListItem>
                  ))} */}
                </ImageList>

              </Grid> : null}
          </Grid>
          <Grid container spacing={2}>
            {updatedCatelogue ?
              <Grid item xs={12} sm={6} md={12}>
                <label>
                  DATASHEETS
                </label>
                <div className="App">
                  <label htmlFor="upload-photo">
                    <input
                      className="upload-files-field"
                      id="upload-photo"
                      name="datasheet"
                      type="file"
                      multiple
                      onChange={handleSinglePdfChange}
                      required={!updatedCatelogue}

                    />
                  </label>{" "}
                </div>

                <div className="registration-flex">
                  {CatelogueData ? CatelogueData.datasheet.map((item, i) => {
                    return (
                      <>
                        <div className='pdfs' key={i}>
                          <span className="pdf-container"> <FaFilePdf className='pdf-icon' />  <a href={`${ImgUrl}${item.datasheet}`} target="_blank" download>{item.datasheet.replace('/media/catalogueSheet/', '')}</a></span>
                          <span style={{ cursor: "pointer" }} onClick={() => deleteDatasheetHandler(item.id)}><AiFillDelete /></span>
                        </div>
                      </>
                    )
                  }) : <p>No Datasheet Uploaded</p>}
                </div>
              </Grid> : null}
          </Grid>
          <Grid container spacing={2}>
            {updatedCatelogue ?
              <Grid item xs={12} sm={6} md={12}>
                <label>
                  CERTIFICATES
                </label>
                <div className="App">
                  <label htmlFor="upload-photo">
                    <input
                      className="upload-files-field"
                      id="upload-photo"
                      name="certificate"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      required={!updatedCatelogue}

                    />
                  </label>{" "}
                </div>
                <div className="registration-flex">

                  {CatelogueData ? CatelogueData.certificates.map((item, i) => {
                    return (
                      <>
                        <div className='pdfs' key={i}>
                          <span className="pdf-container">  <FaFilePdf className='pdf-icon' /><a href={`${ImgUrl}${item.files}`} target="_blank" download>{item.files.replace('/media/Catalouge_certificate/', '')}</a></span>
                          <span style={{ cursor: "pointer" }} onClick={() => deleteCertificateHandler(item.id)}><AiFillDelete /></span>
                        </div>
                      </>
                    )
                  }) : "No Certificate Uploaded"}
                </div>
              </Grid>
              : null}
          </Grid>

          <div style={{ width: "100%", paddingBlock: "20px", display: 'flex', justifyContent: "center", alignItems: "center" }}>

            {updatedCatelogue ? (

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

export default CatelogueRegistration