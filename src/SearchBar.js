import React, {useState} from "react";
import "./SearchBar.css";


function SearchBar({searchFunction}){
    const [search, setSearch] = useState("");

    function handleChange(evt){
        setSearch(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        if (search !== ""){
            searchFunction(search);
            setSearch("");
        }
    }

  return (
    <div>
        <form className="SearchBar" onSubmit={handleSubmit}>
            <input placeholder="Enter location" onChange={handleChange}/>
            <button>Search</button>
        </form>
        <p className="SearchBarText">Enter a location identifier (e.g. postal code, city name)</p>
    </div>
  );
}

export default SearchBar;