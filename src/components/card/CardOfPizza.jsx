import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { Button } from "react-bootstrap";
import './card.css'


function CardOfPizza() {
  // Obtenemos los datos y funciones del contexto
  const { data, total, setTotal, pedido, setPedido } = useContext(AppContext);

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Función para agregar una pizza al pedido
  const handleAdd = (event) => {
    // Buscamos la pizza seleccionada en la lista de pizzas
    const añadirPizza = data.find((i) => event.target.id === i.id);

    // Actualizamos el total del pedido
    setTotal(Number(total) + Number(añadirPizza.price));

    // Verificamos si ya existe la pizza en el pedido
    if (pedido.length > 0) {
      // Se utiliza el método some para verificar si el producto que se está 
      // añadiendo al pedido ya existe en el arreglo `pedido` y así poder 
      // actualizar su cantidad y total, o agregarlo como un nuevo elemento 
      // en caso contrario.
      const existe = pedido.some(x => x.id === event.target.id);

      // Si ya existe, actualizamos la cantidad y el precio total de esa pizza en el pedido
      if (existe) {
        const actualizarPedido = pedido.map(v => {
          if (v.id === event.target.id) {
            return {
              ...v,
              cantidadItem: Number(v.cantidadItem) + 1,
              totalItem: Number(v.totalItem) + Number(añadirPizza.price)
            }
          }
          return v
        });
        setPedido(actualizarPedido);
      }
      // Si no existe, agregamos la pizza al pedido
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
    // Si el pedido está vacío, agregamos la pizza al pedido
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
      <div className=" cop justify-content-md-center d-flex flex-wrap">
        {data.length !== 0 ? (
          data.map(value => (
            <Card key={value.id} className='cardPizza' style={{ width: '18rem' }}>
              <Card.Img variant="top" src={value.img} />
              <Card.Body>
                <Card.Title className='title'><strong><big>{value.name}</big></strong></Card.Title>
                <hr />
                <Card.Text className='ingredientes'>Ingredientes:
                  <ul>
                    {value.ingredients.map(ingredient => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/pizza/:${value.id}`)} className="me-5">
                  Ver Mas👀
                </Button>
                <Button id={value.id} variant="primary" onClick={(event) => handleAdd(event)}>
                  Añadir🛒</Button>
              </Card.Body>
              <hr />
              <p className='precio'>{value.price} $</p>
            </Card>
          ))
        ) : (<div>Loading</div>)}

      </div>
    </>
  );
}

export default CardOfPizza;