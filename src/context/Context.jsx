import React, { useState, createContext } from "react";

// Se crea el contexto de la aplicación
export const AppContext = createContext();

// Componente proveedor del contexto de la aplicación
export const AppProvider = ({ children }) => {
    const [data, setData] = useState([])  // Es un array vacio (asi va a iniciarse)
    const [pizza, setPizza] = useState(null) // Es un estado que almacenará la pizza seleccionada por el usuario
    const [total, setTotal] = useState(0) // Es un numero, lo necesitaba en 0 (asi va a iniciarse)
    const [pedido, setPedido] = useState([]) 

    return (
        // Se renderiza el componente proveedor y se proporcionan los estados y métodos a los que tienen acceso los componentes hijos
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

/*En resumen, este código define el contexto y el componente proveedor del contexto de la aplicación, que proporciona acceso a los datos globales de la aplicación, como las pizzas disponibles, la pizza seleccionada por el usuario, el valor total de la compra y los productos seleccionados por el usuario. Se utilizan los hooks useState y createContext de React para crear y gestionar los estados y el contexto de la aplicación*/