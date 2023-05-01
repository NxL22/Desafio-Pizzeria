import { useParams } from 'react-router';
import './detalles.css'
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/Context';
import HeaderPizza from '../../components/header/HeaderPizza'

const Detalles = () => {
    let { id } = useParams();
    const { pizza, setPizza, data, total, setTotal, pedido, setPedido } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const idParametro = id.slice(1)
        const idPizza = data.find((x) => idParametro === x.id)
        setPizza(idPizza)
        setLoading(false)
    }, [])

    const handleAdd = (event) => {
        const añadirPizza = data.find((i) => event.target.id === i.id)
        setTotal(Number(total) + Number(añadirPizza.price))

        //pedido
        if (pedido.length > 0) {

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
        } else {
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
