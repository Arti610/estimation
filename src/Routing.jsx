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
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Sidebar />} >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales/catelogue" element={<CategoryList />} />
          <Route path="/sales/catelogue-details" element={<Catelogue />} />
          <Route path="/sales/catelogue-registration" element={<CatelogueRegistration />} />
          <Route path="/sales/inquiry" element={<InquiryList />} />
          <Route path="/sales/inquiry-registration" element={<Inquiry />} />
          <Route path="/sales/estimation" element={<EstimationList />} />
          <Route path="/sales/estimation-registration" element={<Estimation />} />
          <Route path="/settings/customer" element={<CustomerList/>} />
          <Route path="/settings/employer" element={<EmployerList/>} />
          <Route path="/settings/department" element={<DepartmentList/>} />
          <Route path="/settings/source-of-inquiry" element={<SourceOfInquiryList/>} />
          <Route path="/settings/users" element={<UserList/>} />
          <Route path="/settings/user-registration" element={<User/>} />
          <Route path="/settings/tax" element={<TaxList/>} />
          <Route path="/settings/tax-agencies" element={<TaxAgenciesList/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
