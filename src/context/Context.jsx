import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [data, setData] = useState([])  //es un array vacio (asi va a iniciarse)
    const [pizza, setPizza] = useState(null) 
    const [total, setTotal] = useState(0) //es un numero, lo necesitaba en 0 (asi va a iniciarse)
    const [pedido, setPedido] = useState([]) 

    return (
        <AppContext.Provider
            value={{
                data, setData,
                pizza, setPizza,
                total, setTotal,
                pedido, setPedido
            }}
        >
            {children}
        </AppContext.Provider>
    );
};