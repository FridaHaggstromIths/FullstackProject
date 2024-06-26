import { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeroStrip from './HeroStripImage'


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
    <>
    < HeroStrip />
    <Container>
    <Row xs={1} md={2} className="g-4">
      {fruktkorg.map((frukt) => (
        <Col key={frukt.ID}>
          <Card className="text-center" style={{border: 'none', margin:'2vh'}}>
            <Card.Img variant="top" src={frukt.img} alt="en bild på en fruktkorg" />
            <Card.Body>
              <Card.Title>{frukt.titel}</Card.Title>
              <Card.Text>{frukt.info}</Card.Text>
              <Button id={frukt.ID}
              variant="success"size="lg"
              as={Link} to={`/productpage/${frukt.ID}`}
              className="mx-auto w-50">Visa</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
    </>
  )
}

export default Fruktkorg
