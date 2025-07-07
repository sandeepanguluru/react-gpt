import React, { useEffect, useState } from "react";
const useLocalStorage = (key,initialValue)=>{
    const getStoredValue = ()=>{
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    }
    const [value,setValue] = useState(getStoredValue);

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))

    },[key,value])

    return  [value,setValue];
}
export default useLocalStorage;