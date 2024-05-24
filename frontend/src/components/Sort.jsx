import { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Fruktkorg = () => {
  const [fruktkorg, setFruktkorg] = useState([])

  useEffect(() => {
    fetch('/fruktkorg')
      .then((response) => response.json())
      .then((data) => setFruktkorg(data))
      .catch(error => {
        console.error('There was an error fetching the product list!', error)
      })
  }, [])

  return (
    <Row xs={1} md={2} className="g-4">
      {fruktkorg.map((frukt) => (
        <Col key={frukt.ID}>
          <Card>
            <Card.Img variant="top" src={frukt.img} alt="en bild på en fruktkorg" />
            <Card.Body>
              <Card.Title>{frukt.titel}</Card.Title>
              <Card.Text>{frukt.info}</Card.Text>
              <Button id={frukt.ID}variant="success"size="lg"as={Link} to={`/productpage/${frukt.ID}`}>Visa</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Fruktkorg
