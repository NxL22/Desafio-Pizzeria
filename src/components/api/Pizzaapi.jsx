import { useContext, useEffect } from "react";
import { AppContext } from "../../context/Context";

// Componente que obtiene datos de pizzas desde un archivo JSON usando el contexto de la aplicación
const PizzaApi = () => {
    // Obtiene el objeto de datos y la función de actualización del contexto de la aplicación
    const { data, setData } = useContext(AppContext);

    // Utiliza el hook useEffect para cargar los datos de pizzas desde el archivo JSON
    useEffect(() => {
        // Verifica si ya se han cargado los datos
        if (data.length === 0) {
            // Realiza una solicitud fetch para obtener los datos desde el archivo JSON
            fetch("pizzas.json")
                .then(response => response.json())
                .then(data => {
                    // Actualiza los datos del contexto de la aplicación con los datos obtenidos
                    setData(data);
                });
        }
    }, []);
}

export default PizzaApi;
