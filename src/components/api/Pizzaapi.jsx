import { useContext, useEffect } from "react";
import { AppContext } from "../../context/Context";


const PizzaApi = () => {
    const { data, setData } = useContext(AppContext)
    useEffect(() => {
        if (data.length === 0) {
            fetch("pizzas.json")
                .then(response => response.json())
                .then(data => { setData(data) })
        }
    }
        , [])

    console.log(data)
    return (
        <div>Hola</div>
    );
};

export default PizzaApi;