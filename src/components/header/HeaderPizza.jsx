import { useContext } from "react"
import { useNavigate } from "react-router"
import { Navbar, Container, Nav } from "react-bootstrap"
import './header.css'
import { AppContext } from "../../context/Context"


const HeaderPizza = () => {

    const { total } = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <>
            <Navbar className="navbar-sm" bg="dark" variant='dark' style={{ height: '47px' }}>
                <Container>
                    <Navbar.Brand><p className="nombrePizzeria">¡A Modo Mio! 🍕</p></Navbar.Brand>
                    <Nav className='ms-auto'>
                        <span className="spanCarrito" onClick={()=>navigate('/carrito')}> 🛒 <big>{total} $</big> </span>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderPizza;