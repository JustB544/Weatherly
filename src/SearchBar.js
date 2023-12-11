import React, {useState} from "react";


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
        <form style={{display: "flex", justifyContent: "center", flexDirection: "row"}} onSubmit={handleSubmit}>
            <input placeholder="Search" onChange={handleChange}/>
            <button>Submit</button>
        </form>
        <p>Enter a location identifier (e.g. postal code, city name)</p>
    </div>
  );
}

export default SearchBar;