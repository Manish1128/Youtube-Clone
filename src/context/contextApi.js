import React, {createContext, useState, useEffect} from "react";

import {fetchDataFromApi} from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    // const {result, setResult} = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [selectCategories, setSelectCategories] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(()=>{
        fetchSelectedCategoryData(selectCategories)
    },[selectCategories])

    const fetchSelectedCategoryData = (query) =>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents}) => {
            console.log(contents)
            setSearchResults(contents)
            setLoading(false)
        })
    }

    return (
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            setSelectCategories,
            selectCategories,
            mobileMenu,
            setMobileMenu,
            // result,
            // setResult
        }}>
            {props.children}
        </Context.Provider>
    )
}