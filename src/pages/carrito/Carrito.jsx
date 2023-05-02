import { Button, Container } from "react-bootstrap";
import './carrito.css'
import HeaderPizza from '../../components/header/HeaderPizza'
import { AppContext } from "../../context/Context";
import { useContext } from "react";


const Carrito = () => {
    // obtenemos las variables de estado y funciones a través del contexto
    const { pedido, total, setPedido, setTotal } = useContext(AppContext)

    // función que se ejecuta cuando se hace clic en el botón de aumentar cantidad de un producto en el carrito
    const handlerAdd = (event) => {

        // se busca el producto del carrito por su id y se suma su precio al total
        const sumarTotal = pedido.find((i) => event.target.id === i.id)
        setTotal(Number(total) + Number(sumarTotal.price))

        // se recorre el array de productos del carrito y se aumenta en 1 la cantidad del producto seleccionado, 
        // también se actualiza el total del producto multiplicando la cantidad por el precio.
        const agregarItem = pedido.map(x => {
            if (event.target.id === x.id) {
                return {
                    ...x,
                    cantidadItem: Number(x.cantidadItem) + 1,
                    totalItem: Number(x.totalItem) + Number(x.price)
                }
            }
            return x
        })

        // se actualiza el carrito con los nuevos datos
        setPedido(agregarItem)
    }

    // función que se ejecuta cuando se hace clic en el botón de disminuir cantidad de un producto en el carrito
    const handlerSubtract = (event) => {

        // se busca el producto del carrito por su id y se resta su precio al total
        const restarTotal = pedido.find((i) => event.target.id === i.id)
        setTotal(Number(total) - Number(restarTotal.price))

        // se recorre el array de productos del carrito y se disminuye en 1 la cantidad del producto seleccionado, 
        // también se actualiza el total del producto multiplicando la cantidad por el precio.
        const eliminarItem = pedido.map((x, index) => {
            if (event.target.id === x.id) {

                return {
                    ...x,
                    cantidadItem: Number(x.cantidadItem) - 1,
                    totalItem: Number(x.totalItem) - Number(x.price)
                }
            }
            return x
        })

        // se recorre el array de productos del carrito y se elimina el producto si la cantidad llega a 0
        eliminarItem.forEach((x, i) => {
            if (x.cantidadItem === 0) {
                eliminarItem.splice(i, 1)
            }
        })

        // se actualiza el carrito con los nuevos datos
        setPedido(eliminarItem)
    }

    return (
        <>
            <HeaderPizza />
            <section className="carrito">
                <Container className="mb-2"><strong>Detalles del pedido</strong></Container>
                <div className="d-flex flex-column">
                    {pedido.length > 0 ? (
                        pedido.map((p) => (
                            <div key={p.id} className="d-flex justify-content-between me-2">
                                <img className="pizzaDelCarrito" src={p.img} alt="pizza del pedido" />
                                <span className="nombrePizza">{p.name}</span>
                                <div>
                                    <span className="totalItem">$ {p.totalItem}</span>
                                    <Button className="btnMas" variant="primary" id={p.id} onClick={(event) => handlerAdd(event)}>+</Button>
                                    <span>{p.cantidadItem}</span>
                                    <Button variant="danger ms-2" id={p.id} onClick={(event) => handlerSubtract(event)}>-</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No has seleccionado ningún producto</div>
                    )}

                </div>
                <big><strong><big>Total</big>: {total} $</strong></big>
                <br />
                <Button className="btn btn-success ms-3 mt-3">Ir a pagar</Button>
            </section>
        </>
    );
};


export default Carrito;