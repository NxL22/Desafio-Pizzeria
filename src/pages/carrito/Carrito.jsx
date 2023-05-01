import { Button, Container } from "react-bootstrap";
import './carrito.css'
import HeaderPizza from '../../components/header/HeaderPizza'
import { AppContext } from "../../context/Context";
import { useContext } from "react";


const Carrito = () => {
    const { pedido, total, setPedido, setTotal } = useContext(AppContext)
    
    const handlerAdd = (event) => {

        const sumarTotal = pedido.find((i) => event.target.id === i.id)
        setTotal(Number(total) + Number(sumarTotal.price))

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

        setPedido(agregarItem)
    }

    const handlerSubtract = (event) => {

        const restarTotal = pedido.find((i) => event.target.id === i.id)
        setTotal(Number(total) - Number(restarTotal.price))

        const eliminarItem = pedido.map((x,index) => {
            if (event.target.id === x.id) {

                return {
                    ...x,
                    cantidadItem: Number(x.cantidadItem) - 1,
                    totalItem: Number(x.totalItem) - Number(x.price)
                }
            }
            return x
        })

            eliminarItem.forEach((x,i)=> {
            if (x.cantidadItem === 0) {
                eliminarItem.splice(i, 1)
            }
        })

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
                                <img className="pizzaDelCarrito" src={p.img} alt="" />
                                <span className="nombrePizza">{p.name}</span>
                                <div>
                                    <span className="totalItem">$ {p.totalItem}</span>
                                    <Button className="btnMas" variant="primary" id={p.id} onClick={(event) => handlerAdd(event) }>+</Button>
                                    <span>{p.cantidadItem}</span>
                                    <Button variant="danger ms-2" id={p.id} onClick={(event) => handlerSubtract(event) }>-</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No has seleccionado ningun producto</div>
                    )}

                </div>
                <big><strong>Total: {total} $</strong></big>
                <br />
                <Button className="btn btn-success ms-3 mt-3">Ir a pagar</Button>
            </section>
        </>
    );
};


export default Carrito;