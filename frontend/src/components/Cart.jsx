import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/cart/${id}`)
      .then(response => response.json())
      .then(cartItems => {
        const productIds = cartItems.map(item => item.productId);
        if (productIds.length) {
          Promise.all(productIds.map(productId =>
            fetch(`/productpage/${productId}`)
              .then(response => response.json())
          ))
          .then(products => setProducts(products))
          .catch(error => console.error('Error fetching products:', error));
        }
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, [id]);


  const handleRemoveFromCart = () => {
    fetch(`/cart/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    })
    .catch(error => console.error('Error removing item from cart:', error));
  };

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <Row xs={1} md={2} className="g-4 justify-content-center">
      {products.map(product => (
        <Col key={product.id} className="text-center">
          <Card style={{ backgroundColor: product.hex }} className="w-100 h-100 m-10">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title className="display-4">{product.titel}</Card.Title>
              <Card.Text className="fs-5">{product.info}</Card.Text>
              <Card.Text className="fs-5">{product.description}</Card.Text>
              <Card.Text className="display-4">{product.price}kr</Card.Text>
              <Button
                variant="danger"
                size="lg"
                onClick={() => handleRemoveFromCart(product.id)}
                className="mx-auto w-50"
                style={{ margin: '1vh' }}
              >
                Ta bort
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
      <Col className="text-center">
        <h2>Total: {total}kr</h2>
      </Col>
    </Row>
  );
};

export default Cart;




/* import { useContext } from 'react';
import { CartContext } from './CartContext';
import { Button, ListGroup } from 'react-bootstrap';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const totalSum = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <div>
            <h2>Varukorg</h2>
            {cart.length === 0 ? (
                <p>Varukorgen är tom.</p>
            ) : (
                <ListGroup>
                    {cart.map((product, index) => (
                        <ListGroup.Item key={index}>
                            <div>
                                <h5>{product.titel}</h5>
                                <p>{product.price}kr</p>
                                <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                                    Ta bort
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <h3>Total: {totalSum}kr</h3>
        </div>
    );
};

export default Cart; */



/* import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <Row xs={1} md={2} className="g-4 justify-content-center">
            {cart.map(product => (
                <Col key={product.id}>
                    <Card style={{ backgroundColor: product.hex }}>
                        <Card.Img variant="top" src={product.img} alt="en bild på en fruktkorg" />
                        <Card.Body>
                            <Card.Title>{product.titel}</Card.Title>
                            <Card.Text>{product.info}</Card.Text>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.price}kr</Card.Text>
                            <Button variant="danger" size="lg" onClick={() => removeFromCart(product.id)}>Ta bort</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Total Summa</Card.Title>
                        <Card.Text>{totalAmount}kr</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Cart; */



/* const Cart = () =>{
  return (
    <h1>Varukorg här</h1>
  )
}
export default Cart */
