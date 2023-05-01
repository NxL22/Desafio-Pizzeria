import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/Context';
import Home from './pages/home/Home';
import Detalles from './pages/detalles/Detalles';
import Carrito from './pages/carrito/Carrito.jsx'


function App() {
  const { data, setData } = useContext(AppContext)

  useEffect(() => {
    if (data.length === 0) {
      fetch("pizzas.json")
        .then(response =>
          response.json())
        .then(data => { setData(data) })
    }
  }, [])

  return (
    <>
      {data.length !== 0 ? (
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/pizza/:id" element={<Detalles />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      ) : (
        <p>Loading...</p>
      )}

    </>
  );
}

export default App;

