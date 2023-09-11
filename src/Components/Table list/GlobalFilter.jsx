import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "./GlobalFilter.css";
import SearchIcon from '@mui/icons-material/Search';
export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    // <div className="Search-box">
    //   Search:
    //   <input
    //     value={value || ""}
    //     onChange={(e) => {
    //       setValue(e.target.value);
    //       onChange(e.target.value);
    //     }}
    //   />
    // </div>
    <div className="header_search">
      <input type="text" name="search" id="search" value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} />
      <SearchIcon className='header_searchIcon' />
    </div>
  );
}
