import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./APIs/CustomerSlice";
import TaxSlice from './APIs/TaxSlice'
import TaxAgencySlice from "./APIs/TaxAgencySlice";
import EmployerSlice from "./APIs/EmployerSlice";
import DepartmentSlice from "./APIs/DepartmentSlice";
import SourceOfInquirySlice from "./APIs/SourceOfInquirySlice";
import UserSlice from "./APIs/UserSlice";
import CatelogueSlice from "./APIs/CatelogueSlice";
import InquirySlice from "./APIs/InquirySlice";
import EstimationSlice from "./APIs/EstimationSlice";
import UserlogSlice from "./APIs/UserlogSlice";
import LoginSlice from "./APIs/LoginSlice";

const Store = configureStore({
  reducer: {
    Login: LoginSlice,
    Customer: CustomerSlice,
    User: UserSlice,
    Tax: TaxSlice,
    TaxAgency: TaxAgencySlice,
    Employer: EmployerSlice,
    Department: DepartmentSlice,
    SourceOfInquiry: SourceOfInquirySlice,
    Catelogue: CatelogueSlice,
    Inquiry: InquirySlice,
    Estimation: EstimationSlice,
    UserLog: UserlogSlice
  },
});

export default Store;
