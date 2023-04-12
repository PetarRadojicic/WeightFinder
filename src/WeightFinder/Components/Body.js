import React, { useState } from "react";
import style from "./Body.module.css";
import API from "./API";

const Body = () => {
  const [textResult, setTextResult] = useState("");
  const [detailedTextResult, setDetailedTextResult] = useState("");
  const [SearchInput, setSearchInput] = useState("");

  const InputSearch = (e) => {
    setSearchInput(e.target.value);
    PassSearch();
  };

  const Search = (value, value2) => {
    setTextResult(value);
    setDetailedTextResult(value2);
  };

  const PassSearch = () => {
    return SearchInput;
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.form}>
          <h1 className={style.h1}>WeightFinder</h1>
          <input
            className={style.input}
            type="text"
            placeholder="Type your search here..."
            onChange={InputSearch}
            value={SearchInput}
          />
          <textarea
            readOnly
            className={style.textarea}
            defaultValue={textResult}
          />
          <textarea
            readOnly
            className={style.textarea}
            defaultValue={detailedTextResult}
          />
          <API
            onSearch={Search}
            SearchPass={PassSearch}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
