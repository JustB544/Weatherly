import {useState} from "react";

/** Hook that allows for access and changing of localstorage */

function useLocalStorage(key, json = false, initialFunc = null){
    const [state, setState] = useState(((json) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)) || set(initialFunc(), true));

    function set(val, initial = false){
        const _set = (json) ? JSON.stringify(val) : val;
        localStorage.setItem(key, _set);
        if (!initial){
            setState(val);
        }
        return val;
    }

    function update(){
        const _set = (json) ? JSON.parse(localStorage.getItem(key)): localStorage.getItem(key);
        setState(_set);
        return _set;
    }
    
    return [state, set, update];
}

export { useLocalStorage };