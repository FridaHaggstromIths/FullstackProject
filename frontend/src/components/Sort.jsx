import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useState } from 'react'

function Sort() {
  const [fruktkorg, setfruktkorg] = useState([])

  useEffect(() => {
    fetch('/fruktkorg')
      .then((response) => response.json())
      .then((data) => setfruktkorg (data))

  }, [])

  return (
    <Row xs={1} md={2} className="g-4">
    {fruktkorg.map((frukt) => (
      <Col key={frukt.id}>
        <Card>
          <Card.Img variant="top" src={frukt.img} alt="en bild på en fruktkorg"/>
          <Card.Body>
            <Card.Title>{frukt.titel}</Card.Title>
            <Card.Text>
              {frukt.info}
            </Card.Text>
            <Button variant="success"size="lg">Visa</Button>{' '}
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
)
}


export default Sort


{/* <div>
            <h1>Hej test fruktkorg h1 frontend Sort</h1>
            <ul>
                {fruktkorg.map((frukt) => (
                    <li key={frukt.id}>
                        {frukt.titel}
                        {frukt.info}
                        <img src={frukt.img} alt={frukt.title} />
                    </li>
                ))}
            </ul>

        </div> */}
