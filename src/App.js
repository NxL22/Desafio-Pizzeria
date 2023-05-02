import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/Context';
import Home from './pages/home/Home';
import Detalles from './pages/detalles/Detalles';
import Carrito from './pages/carrito/Carrito.jsx'


function App() {
  const { data, setData } = useContext(AppContext) // Se usa useContext pa obtener los valores del contexto (data y setData)

  useEffect(() => { // Se usa el hook useEffect para ejecutar código cuando se monta el componente
    if (data.length === 0) { // Si data está vacío, entonces hace una petición a la API
      fetch("pizzas.json")
        .then(response =>
          response.json())
        .then(data => { setData(data) }) // Actualiza el estado del contexto con la respuesta de la API
    }
  }, [])

  return (
    <>
      {data.length !== 0 ? ( // Si data no está vacío, renderiza las rutas del componente Routes
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/pizza/:id" element={<Detalles />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      ) : ( // Si data está vacío
        <p>Loading...</p>
      )}

    </>
  );
}


export default App;

