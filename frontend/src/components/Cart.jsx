import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import HeroStrip from './HeroStripImage'

const Cart = () => {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetch(`/cart/${id}`)
      .then(response => response.json())
      .then(cartItems => {
        const productIds = cartItems.map(item => item.productId)
        if (productIds.length) {
          Promise.all(productIds.map(productId =>
            fetch(`/productpage/${productId}`)
              .then(response => response.json())
          ))
          .then(products => {
            const productsWithCartItemId = products.map((product, index) => ({
              ...product,
              cartItemId: cartItems[index].id
            }))
            setProducts(productsWithCartItemId)
          })
          .catch(error => console.error('Error fetching products:', error))
        }
      })
      .catch(error => console.error('Error fetching cart items:', error))
  }, [id])

  const handleRemoveFromCart = (cartItemId) => {
    fetch(`/cart/${cartItemId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(prevProducts => prevProducts.filter(product => product.cartItemId !== cartItemId))
    })
    .catch(error => console.error('Error removing item from cart:', error))
  };

  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
      <>
      <HeroStrip />
      <Card className="w-100 h-100 m-10" style={{ border: 'none', minHeight: '50vh' }}>
  <Card.Body className="d-flex flex-column justify-content-start align-items-center">
    {products.map(product => (
      <div key={product.id} className="d-flex align-items-start mb-3 border-bottom pt-3 w-100" style={{ minHeight: '200px' }}>
        <img src={product.img} alt="en bild på en fruktkorg" className="img-fluid" style={{ width: '150px', marginRight: '5vh' }} />
        <div className="d-flex flex-column" style={{ flex: '1', marginRight: '4vh' }}>
          <Card.Title>{product.titel}</Card.Title>
          <Card.Text>{product.price}kr</Card.Text>
          <Button
            variant="danger"
            onClick={() => handleRemoveFromCart(product.cartItemId)}
            className="mt-auto"
            style={{ width:'100px',marginTop: 'auto' }}
          >
            Ta bort
          </Button>
        </div>
      </div>
    ))}
    <div className="text-center mb-3 border-top pt-3 w-100 h-100 m-10">
      <h2>Total: {total} kr</h2>
      <Button
        variant='success'
        size='lg'
        className="mx-auto w-30 mt-3 mb-15"
        as={Link} to={`/ThankYou`}
      >
        Betala
      </Button>
    </div>
  </Card.Body>
</Card>


      </>
    )
  }
export default Cart


/* import { useEffect, useState } from 'react';
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



  const handleRemoveFromCart = (productId) => {
    fetch(`/cart/${productId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(prevProducts => prevProducts.filter(product => product.ID !== productId));
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
                onClick={() => handleRemoveFromCart(product.ID)}
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

export default Cart; */



/* const Cart = () =>{
  return (
    <h1>Varukorg här</h1>
  )
}
export default Cart */
