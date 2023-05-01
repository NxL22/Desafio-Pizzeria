import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-logo">
                            <p>¡Lo hacemos con amor y el mejor sabor!</p>
                        </div>
                        <div className="social">
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-info">
                            <h3>Estamos ubicados</h3>
                            <p>123 Av.Portugal</p>
                            <p>Santiago de chile</p>
                            <p>Phone: +56-555-1234</p>
                            <p>Email: info@amodomio.com</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer-menu">
                            <h3>Menu</h3>
                            <ul>
                                <li><a href="#">Pizza Napolitana</a></li>
                                <li><a href="#">Pizza Española</a></li>
                                <li><a href="#">Pizza Salame</a></li>
                                <li><a href="#">Pizza Cuatro Estaciones</a></li>
                                <li><a href="#">Pizza Bacon</a></li>
                                <li><a href="#">Pizza Pollo Picante</a></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
