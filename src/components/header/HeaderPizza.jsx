import { useContext } from "react"
import { useNavigate } from "react-router"
import { Navbar, Container, Nav } from "react-bootstrap"
import './header.css'
import { AppContext } from "../../context/Context"
import { Link } from "react-router-dom"


const HeaderPizza = () => {

    const { total } = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <>
            <Navbar className="navbar-sm" bg="dark" variant='dark' style={{ height: '47px' }}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/home">
                            <p className="nombrePizzeria">¡A Modo Mío! 🍕</p>
                        </Link>
                    </Navbar.Brand>
                    <Nav className='ms-auto'>
                        <span className="spanCarrito" onClick={() => navigate('/carrito')}> 🛒 <big>{total} $</big> </span>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderPizza;