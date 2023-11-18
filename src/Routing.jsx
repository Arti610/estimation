import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Common_Components/PageNotFound";
import Dashboard from "./Common_Components/Dashboard/Dashboard";
import EstimationList from './Common_Components/Estimation/EstimationList';
import InquiryList from './Common_Components/Inquiry/InquiryList';
import CustomerList from './Common_Components/Customer/CustomerList';
import Sidebar from "./Common_Components/Sidebar/Sidebar"
import EmployerList from "./Common_Components/Employer/EmployerList"
import DepartmentList from "./Common_Components/Department/DepartmentList"
import SourceOfInquiryList from "./Common_Components/Source_Of_Inquiry/SourceOfInquiryList"
import UserList from "./Common_Components/User/UserList"
import User from "./Common_Components/User/User"
import TaxAgenciesList from "./Common_Components/Tax_Agencies/TaxAgenciesList";
import TaxList from "./Common_Components/Tax/TaxList"
import Login from "./Common_Components/Login/Login";
import Catelogue from "./Common_Components/Catelogue/Catelogue";
import CategoryList from "./Common_Components/Catelogue/CategoryList";
import CatelogueRegistration from "./Common_Components/Catelogue/CatelogueRegistration";
import Inquiry from "./Common_Components/Inquiry/Inquiry";
import Estimation from "./Common_Components/Estimation/Estimation";
import EstimationDetails from './Common_Components/Estimation/EstimationDetails'
import ProfileContainer from "./Common_Components/User/ProfileContainer";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/edit-profile/:id" element={<ProfileContainer />} />

          {/* Nested "sales" routes */}
          <Route path="sales">
            <Route path="catelogue" element={<CategoryList />} />
            <Route path="inquiry" element={<InquiryList />} />
            <Route path="estimation" element={<EstimationList />} />
            <Route path="/dashboard/sales/catelogue-details/:cateId" element={<Catelogue />} />
            <Route path="catelogue-registration" element={<CatelogueRegistration />} />
            <Route path="catelogue-registration/:cateId" element={<CatelogueRegistration />} />
            <Route path="inquiry-registration" element={<Inquiry />} />
            <Route path="inquiry-registration/:inqId" element={<Inquiry />} />
            <Route path="estimation-registration" element={<Estimation />} />
            <Route path="estimation-registration-detail" element={<EstimationDetails/>} />
          </Route>

          <Route path="settings">
            <Route path="customer" element={<CustomerList />} />
            <Route path="employer" element={<EmployerList />} />
            <Route path="department" element={<DepartmentList />} />
            <Route path="source-of-inquiry" element={<SourceOfInquiryList />} />
            <Route path="users" element={<UserList />} />
            <Route path="user-registration" element={<User />} />
            <Route path="user-registration/:userId" element={<User />} />
            <Route path="tax" element={<TaxList />} />
            <Route path="tax-agencies" element={<TaxAgenciesList />} />
          </Route>

        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
