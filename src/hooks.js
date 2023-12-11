import {useState} from "react";

/** Hook that allows for access and changing of localstorage */

function useLocalStorage(key, json = false, initialFunc = null){
    function set(val){
        const _set = (json) ? JSON.stringify(val) : val;
        localStorage.setItem(key, _set);
        setState(_set);
        return _set;
    }

    function update(){
        const _set = (json) ? JSON.parse(localStorage.getItem(key)): localStorage.getItem(key);
        setState(_set);
        return _set;
    }

    const [state, setState] = useState(((json) ? JSON.parse(localStorage.getItem(key)): localStorage.getItem(key)) || set(initialFunc()));
    
    return [state, set, update];
}

export { useLocalStorage };