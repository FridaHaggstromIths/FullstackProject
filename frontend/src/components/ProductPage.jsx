import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    console.log(`Fetching product with id: ${id}`); // Lägg till loggning för felsökning

    fetch(`/fruktkorg/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
        setError(error.message);
      });
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <Card style={{ backgroundColor: product.hex }}>
      <Card.Img variant="top" src={product.img} alt="Produktbild" />
      <Card.Body>
        <Card.Title>{product.titel}</Card.Title>
        <Card.Text>{product.info}</Card.Text>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary">Buy for {product.price} SEK</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductPage;









/* import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
      <p>Product ID: {id.titel}</p>
      <p>Product ID: {id.info}</p>
    </div>
  )
}

export default ProductPage
 */
