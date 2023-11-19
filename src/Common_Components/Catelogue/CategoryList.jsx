import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatelogueData, getupdateCatelogueData, resetCatelogueData } from '../../APIs/CatelogueSlice';
import './Catelogue.css'
import { useNavigate, useParams } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
import { ProductTable } from '../../Components/Table list/ProductTable';
import { FaUserAlt } from 'react-icons/fa'
import { BasicTable } from '../../Components/Table list/BasicTable';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../Config/Apis';
import DeleteConfirmationModal from '../../Components/DeleteConfirmModal/DeleteConfirmationModal';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cataId } = useParams()
  const token = localStorage.getItem('Token');

  const [btnToggle, setBtnToggle] = useState(true)
  const catelogueData = useSelector((state) => state.Catelogue.CatelogueData);
  const [deleteId, setDeleteId] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const header = [
    {
      Header: "Image",
      accessor: "profile_image",
      disableFilters: true,
      Cell: props => (
        <img
          src={`${ImgUrl}${props.row.original.primary_image}`}
          width={50}
          height={50}
          style={{ borderRadius: "50%", cursor: "pointer" }}
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

  const headerTable = [
    {
      Header: "Image",
      accessor: "profile_image",
      disableFilters: true,
      Cell: props => (
        <img
          src={`${ImgUrl}${props.row.original.primary_image}`}
          width={50}
          height={50}
          style={{ borderRadius: "50%", cursor: "pointer" }}
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
  useEffect(() => {
    dispatch(getCatelogueData(token));
  }, []);

  return (

    <>
      <button onClick={() => setBtnToggle(!btnToggle)}>{btnToggle ? "List View" : "Card View"}</button>
      {btnToggle ? <ProductTable
        colHeader={header}
        rowData={catelogueData}
        createHandler={createHandler}
        tableHeading="All Catelogues"
        pageHeading="Catelogue" /> :
        <BasicTable
          colHeader={headerTable}
          rowData={catelogueData}
          updateHandler={updateHandler}
          deleteHandler={deleteHandle}
          createHandler={createHandler}
          tableHeading="All Catelogues"
          pageHeading="Catelogue"
        />}
      <DeleteConfirmationModal open={deleteModalOpen} handleClose={() => setDeleteModalOpen(false)} title="Catalogue" deleteData={deleteDataHandler} />
      <ToastContainer />
    </>
  );
};

export default CategoryList;
