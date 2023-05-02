import { useParams } from 'react-router';
import './detalles.css'
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/Context';
import HeaderPizza from '../../components/header/HeaderPizza'

const Detalles = () => {

    // Extraemos el valor de la variable id de los parámetros de la URL utilizando el hook useParams
    let { id } = useParams();

    // Extraemos los valores del estado de la aplicación utilizando el hook useContext
    const { pizza, setPizza, data, total, setTotal, pedido, setPedido } = useContext(AppContext)

    // Estado que indica si se está cargando la información de la pizza
    const [loading, setLoading] = useState(true)

    // Efecto que se ejecuta cuando se monta el componente, busca la información de la pizza por su id y la guarda en el estado
    useEffect(() => {
        const idParametro = id.slice(1)
        const idPizza = data.find((x) => idParametro === x.id)
        setPizza(idPizza)
        setLoading(false)
    }, [])

    // Función que se ejecuta cuando se agrega una pizza al carrito
    const handleAdd = (event) => {

        // Buscamos la información de la pizza que se va a agregar
        const añadirPizza = data.find((i) => event.target.id === i.id)

        // Actualizamos el total del pedido
        setTotal(Number(total) + Number(añadirPizza.price))

        // Actualizamos el pedido
        if (pedido.length > 0) {

            // Si la pizza ya existe en el pedido, actualizamos la cantidad y el total de ese item
            const existe = pedido.some(x => x.id === event.target.id)

            if (existe) {
                const actualizarPedido = pedido.map(actualizado => {

                    if (actualizado.id === event.target.id) {
                        return {
                            ...actualizado,
                            cantidadItem: Number(actualizado.cantidadItem) + 1,
                            totalItem: Number(actualizado.totalItem) + Number(añadirPizza.price)
                        }
                    }

                    return actualizado
                })
                setPedido(actualizarPedido)
            }
            // Si la pizza no existe en el pedido, la agregamos como un nuevo item
            else {
                let actualizarPedido = [...pedido];
                const agregarNuevoItem = {
                    id: añadirPizza.id,
                    img: añadirPizza.img,
                    name: añadirPizza.name,
                    price: añadirPizza.price,
                    totalItem: añadirPizza.price,
                    cantidadItem: 1
                }
                actualizarPedido.push(agregarNuevoItem)
                setPedido(actualizarPedido)
            }
        }
        // Si el pedido está vacío, agregamos la pizza como un nuevo item
        else {
            let actualizarPedido = [...pedido];
            const agregarNuevoItem = {
                id: añadirPizza.id,
                img: añadirPizza.img,
                name: añadirPizza.name,
                price: añadirPizza.price,
                totalItem: añadirPizza.price,
                cantidadItem: 1
            }
            actualizarPedido.push(agregarNuevoItem)
            setPedido(actualizarPedido)
        }
    }


    return (
        <>
            <HeaderPizza />
            <section className='detalles'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Row>
                        <Col md={4} className="img-container">
                            <img src={pizza.img} alt='Pizza Loca' className="img-fluid" />
                        </Col>
                        <Col md={8}>
                            <h2><strong><big>{pizza.name}</big></strong></h2>
                            <hr />
                            <p>{pizza.desc}.</p>
                            <p><strong>Ingredientes:</strong></p>
                            <ul>
                                {pizza.ingredients.map(ingredient => (
                                    <li key={ingredient}><strong>{ingredient}</strong></li>
                                ))}
                            </ul>
                            <div className='precio'>
                                <p className='precio'><big>${pizza.price}</big></p>
                                <Button id={pizza.id} variant="primary"
                                    onClick={(event) => handleAdd(event)}>
                                    Añadir🛒</Button>
                            </div>
                            <hr />
                        </Col>
                    </Row>
                )}
            </section>
        </>


    )
}

export default Detalles;
