import React, { useState } from "react";
import style from "./API.module.css";

const API = (props) => {
  const [system, setSystem] = useState("Metric");

  const setMetricButton = () => {
    setSystem("Metric");
    props.onSearch("", "");
  };

  const setImperialButton = () => {
    setSystem("Imperial");
    props.onSearch("", "");
  };

  const API_KEY = "AIzaSyC1Bh91jVVfZ-zUXccOsxSlAESwpNZDBxU";
  const CX = "13066bb1865264adb";
  const regexForShortAnswer =
    /(\d{1,3}(?:,\d{3})*|\d+(?:\.\d+)?)\s*((?:kg|kilograms?|pounds?|lbs?|ounces?|grams?|g))(?!\w)/i;

  const fetchMoviesHandler = async () => {
    try {
      const SearchInput = props.SearchPass();
      const query = `weight of ${SearchInput}`;

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`
      );
      const data = await response.json();
      const SearchOutput = data.items[0].htmlSnippet;
      const match = SearchOutput.match(regexForShortAnswer);
      let NumberWeight = match[1].replace(/,/g, "");
      let TextWeight = match[2];
      let DetailedWeight = match.input;
      let FinalWeight = null;

      if (system == "Metric") {
        if (TextWeight == "kilograms" || TextWeight == "kg") {
          FinalWeight = `${NumberWeight} kg`;
        }
        if (TextWeight == "grams") {
          FinalWeight = `${NumberWeight / 1000} kg`;
        }
        if (TextWeight == "pounds" || TextWeight == "lbs") {
          FinalWeight = `${NumberWeight * 0.45359237} kg`;
        }
        if (TextWeight == "ounces") {
          FinalWeight = `${NumberWeight * 0.0283495231} kg`;
        }
      }
      if (system == "Imperial") {
        if (TextWeight == "kilograms" || TextWeight == "kg") {
          FinalWeight = `${NumberWeight * 2.20462262} lbs`;
        }
        if (TextWeight == "grams") {
          FinalWeight = `${NumberWeight * 0.00220462} lbs`;
        }
        if (TextWeight == "pounds" || TextWeight == "lbs") {
          FinalWeight = `${NumberWeight} lbs`;
        }
        if (TextWeight == "ounces") {
          FinalWeight = `${NumberWeight / 16} lbs`;
        }
      }

      props.onSearch(FinalWeight, DetailedWeight);
    } catch (error) {
      props.onSearch("No Weight found", "No Weight found");
    }
  };

  return (
    <>
      <button
        className={style.MainButton}
        onClick={() => {
          fetchMoviesHandler();
        }}
      >
        Search
      </button>

      <div className={style.buttonContainer}>
        <button onClick={setMetricButton} className={style["button"]}>
          Metric
        </button>
        <button onClick={setImperialButton} className={style["button"]}>
          Imperial
        </button>
      </div>
    </>
  );
};

export default API;
