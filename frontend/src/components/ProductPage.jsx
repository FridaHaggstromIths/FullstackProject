import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroStrip from './HeroStripImage'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    console.log(`Fetching product with id: ${id}`)

    fetch(`/productpage/${id}`)
      .then(response => response.json())
      .then((data) => setProduct(data))
      .catch(error => {
        console.error('There was an error fetching the product!', error)
      })
  }, [id])


  return (
    <>
    < HeroStrip />
    <Row xs={1} md={2} className="g-4 justify-content-center">
    <Col key={product.id} className="text-center">
      <img src={product.img} alt="en bild på en fruktkorg" className="img-fluid" /> 
    </Col>
    <Col key={product.id} className="d-flex align-items-center justify-content-center"> 
      <div className="p-1 custom-margin"style={{ margin: '2vh'}}> 
        <Card style={{ backgroundColor: product.hex }} className="w-100 h-100 m-10">
          <Card.Body className="d-flex flex-column justify-content-center text-center"> 
            <Card.Title className="display-4">{product.titel}</Card.Title>
            <Card.Text className="fs-5">{product.info}</Card.Text>
            <Card.Text className="fs-5">{product.description}</Card.Text>
            <Card.Text className="display-4">{product.price}kr</Card.Text>
            <Button 
              id={product.id}
              variant="success"
              size="lg"
              as={Link} 
              to="/cart"
              className="mx-auto w-50"
              style={{margin:'1vh'}}>
              Lägg i varukorg
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Col>
</Row>
    
    </>
)
}

export default ProductPage
