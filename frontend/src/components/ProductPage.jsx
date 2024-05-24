import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  /* const [error, setError] = useState([]) */

  useEffect(() => {
    console.log(`Fetching product with id: ${id}`)

    fetch(`/productpage/${id}`)
      .then(response => response.json())
      .then((data) => setProduct(data))


        /* if (!response.ok) {
          throw new Error('Network response was not ok')
        } */
        /* return response.json()
      })
      .then(data => {
        setProduct(data)
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error)
        setError(error.message)
      }) */
  }, [id])

  /* if (error) return <div>Error: {error}</div> */
  /* if (!product) return <div>Loading...</div> */

  return (
    <Row xs={1} md={2} className="g-4">
        <Col key={product.id}>
          <Card>
            <Card.Img variant="top" src={product.img} alt="en bild på en fruktkorg" />
            <Card.Body>
              <Card.Title>{product.titel}</Card.Title>
              <Card.Text>{product.info}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              {/* <GoToProductButton id={frukt.id} /> */}
              <Button id={product.id}variant="success"size="lg"as={Link} to="/cart">Visa</Button>
            </Card.Body>
          </Card>
        </Col>
    </Row>
)
};

export default ProductPage





/* {product.map((frukt) => (

  <Card style={{ backgroundColor: product.hex }}>
    <Card.Img variant="top" src={product.img} alt="Produktbild" />
    <Card.Body>
      <Card.Title>{product.titel}</Card.Title>
      <Card.Text>{product.info}</Card.Text>
      <Card.Text>{product.description}</Card.Text>
      <Button variant="primary">Pris: {product.price}</Button>
    </Card.Body>
  </Card>
  ))} */



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
