"use client"
import { use } from "react";
import {createContext} from 'react';

export const AppContext = createContext();

async function getSettings() {
    
    const response = await fetch("http://localhost:3000/api/Settings", {
        type: 'GET',
        cache: "no-store"
    })
    const settings = await response.json();
    return settings
}

const AppProvider = ({children}) => {

    const settings = use(getSettings());

    return (
        <AppContext.Provider value={settings}>
            {children}
        </AppContext.Provider>    
    )

}

export default AppProvider;