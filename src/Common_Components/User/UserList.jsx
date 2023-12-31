import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { BasicTable } from '../../Components/Table list/BasicTable';
import { getUserData, deleteUserData, createUserData, updateUserData, getupdateUserData } from '../../APIs/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ImgUrl } from '../../Config/Config';
import { FaUserAlt } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify';
import { Badge } from '@mui/material';
const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const UserData = useSelector((state) => state.User.UserData);

  const UserDataBlank = ["Data Not Found"]
  
  const token = localStorage.getItem('Token');


  const createHandler = () => {
    navigate("/dashboard/settings/user-registration")
  }

  const editHandler = (id) => {
    // dispatch(getupdateUserData({ id, token }));
    navigate(`/dashboard/settings/user-registration/${id}`); // Make sure to pass the user ID in the URL
  }

  const deleteHandler = (id) => {
    dispatch(deleteUserData({ id, token }))
      .then(() => {
        // Once the delete action is completed successfully, dispatch the get action
        dispatch(getUserData(token));
      })
      .catch((error) => {
        // Handle any errors from the delete operation
        alert("wait")
      });
  };

  useEffect(() => {
    dispatch(getUserData(token));
  }, [dispatch, token]);

  const header = [

    {
      Header: "User Profile",
      // accessor: `${ImgUrl}.image`,
      accessor: "profile_image",
      disableFilters: true,
      Cell: props => (
        <img
          src={`${ImgUrl}${props.row.original.profile_image}`}
          width={50}
          height={50}
          style={{ borderRadius: "50%", cursor: "pointer" }}
          alt={<FaUserAlt />}
        />)
    },
    {
      Header: "Name",
      accessor: "first_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phone_number",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Department",
      accessor: "department.name",
    },
    {
      Header: "User Type",
      accessor: "user_type",
      Cell: ({ row }) => (

        <Badge
          color={row.original.user_type === "Admin" ? "success" :
            row.original.user_type === "Operator" ? "warning" : "error"}
          badgeContent={row.original.user_type} />

      )
    },

  ];

  return (
    <>
      {UserData ? (
        <BasicTable
          colHeader={header}
          rowData={UserData}
          updateHandler={editHandler}
          deleteHandler={deleteHandler}
          createHandler={createHandler}
          pageHeading="User"
          tableHeading="All Users"

        />
      ) : (<BasicTable
        colHeader={header}
        rowData={UserDataBlank}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        createHandler={createHandler}
        tableHeading="All Users"
        pageHeading='User'
      />)}
      <ToastContainer />
      {/* <UserModal modalOpen={modalOpen} handleModalInputChange={handleModalInputChange} handleAutoComplete={handleAutoComplete} createOrUpdateHandler={createOrUpdateHandler} openModal={openModal} closeModal={closeModal} modalData={modalData} label="ADD SOURCE OF INQUIRY" heading="Source Of Inquiry" /> */}
    </>
  );
};
export default UserList;
